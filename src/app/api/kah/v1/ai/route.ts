import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { validateApiKey } from '@/lib/kah-api-auth'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const openai    = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// In-memory rate limit — best-effort per replica
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT    = 60
const RATE_WINDOW   = 60 * 60 * 1000
const MAX_MESSAGES  = 20
const MAX_TOTAL_CHARS = 80_000
const MAX_PER_MSG   = 8_000

function checkRate(key: string): boolean {
  const now = Date.now()
  const e   = rateMap.get(key)
  if (!e || now > e.resetAt) { rateMap.set(key, { count: 1, resetAt: now + RATE_WINDOW }); return true }
  if (e.count >= RATE_LIMIT) return false
  e.count++
  return true
}

async function callAnthropic(model: string, system: string | undefined, messages: {role:'user'|'assistant'; content:string}[], maxTokens: number) {
  const res = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    ...(system ? { system } : {}),
    messages,
  })
  const content = res.content[0]?.type === 'text' ? res.content[0].text : ''
  return { content, model: res.model, provider: 'anthropic', usage: res.usage }
}

async function callOpenAI(system: string | undefined, messages: {role:'user'|'assistant'; content:string}[], maxTokens: number) {
  const oaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    ...(system ? [{ role: 'system' as const, content: system }] : []),
    ...messages,
  ]
  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: oaiMessages,
    max_tokens: maxTokens,
    temperature: 0.2,
  })
  const content = res.choices[0]?.message?.content ?? ''
  return { content, model: res.model, provider: 'openai', usage: res.usage }
}

export async function POST(req: Request) {
  const auth = validateApiKey(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

  if (!checkRate(auth.project))
    return NextResponse.json({ error: 'Rate limit exceeded — 60 req/h per project' }, { status: 429 })

  const body = await req.json() as {
    messages: { role: 'user' | 'assistant'; content: string }[]
    system?: string
    model?: string
    max_tokens?: number
  }

  if (!body.messages?.length)
    return NextResponse.json({ error: 'messages required' }, { status: 400 })

  if (body.messages.length > MAX_MESSAGES)
    return NextResponse.json({ error: `Max ${MAX_MESSAGES} messages per request` }, { status: 400 })

  const messages = body.messages.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: String(m.content ?? '').slice(0, MAX_PER_MSG).replace(/[\x00-\x08\x0b\x0e-\x1f]/g, ''),
  }))

  const totalChars = messages.reduce((s, m) => s + m.content.length, 0)
  if (totalChars > MAX_TOTAL_CHARS)
    return NextResponse.json({ error: 'Prompt too large' }, { status: 400 })

  const requestedModel = body.model ?? 'claude-sonnet-4-6'
  const maxTokens      = Math.min(body.max_tokens ?? 1024, 4096)
  const system         = body.system
    ? String(body.system).slice(0, 4000).replace(/[\x00-\x08\x0b\x0e-\x1f]/g, '')
    : undefined

  const isClaude = requestedModel.startsWith('claude')

  try {
    if (isClaude) {
      const result = await callAnthropic(requestedModel, system, messages, maxTokens)
      return NextResponse.json({ ...result, project: auth.project })
    } else {
      const result = await callOpenAI(system, messages, maxTokens)
      return NextResponse.json({ ...result, project: auth.project })
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    const isBilling = msg.includes('credit balance') || msg.includes('insufficient_quota')

    if (isClaude && isBilling) {
      // Anthropic credit exhausted → fallback to OpenAI
      console.warn('[kah/ai] Anthropic credits exhausted, falling back to OpenAI')
      try {
        const result = await callOpenAI(system, messages, maxTokens)
        return NextResponse.json({ ...result, project: auth.project, fallback: true })
      } catch (fallbackErr) {
        console.error('[kah/ai] OpenAI fallback failed', fallbackErr)
        return NextResponse.json({ error: 'AI service unavailable' }, { status: 503 })
      }
    }

    console.error('[kah/ai] error', msg)
    return NextResponse.json({ error: 'AI service error' }, { status: 500 })
  }
}
