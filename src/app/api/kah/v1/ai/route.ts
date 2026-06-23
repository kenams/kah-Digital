import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { validateApiKey } from '@/lib/kah-api-auth'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// In-memory rate limit: max 60 req/hour per API key
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 60
const RATE_WINDOW = 60 * 60 * 1000

function checkRate(key: string): boolean {
  const now = Date.now()
  const e = rateMap.get(key)
  if (!e || now > e.resetAt) { rateMap.set(key, { count: 1, resetAt: now + RATE_WINDOW }); return true }
  if (e.count >= RATE_LIMIT) return false
  e.count++
  return true
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
    temperature?: number
  }

  if (!body.messages?.length)
    return NextResponse.json({ error: 'messages required' }, { status: 400 })

  const model = body.model ?? 'claude-sonnet-4-6'
  const maxTokens = Math.min(body.max_tokens ?? 1024, 4096)

  // Sanitize: strip control chars from all messages
  const messages = body.messages.map(m => ({
    role: m.role,
    content: String(m.content ?? '').slice(0, 8000).replace(/[\x00-\x08\x0b\x0e-\x1f]/g, ''),
  }))

  const systemPrompt = body.system
    ? String(body.system).slice(0, 4000).replace(/[\x00-\x08\x0b\x0e-\x1f]/g, '')
    : undefined

  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    ...(systemPrompt ? { system: systemPrompt } : {}),
    messages,
  })

  const content = response.content[0]?.type === 'text' ? response.content[0].text : ''

  return NextResponse.json({
    content,
    model: response.model,
    usage: response.usage,
    project: auth.project,
  })
}
