import { NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/kah-api-auth'

export const dynamic = 'force-dynamic'

const RESEND_API = 'https://api.resend.com/emails'

// Pinned FROM addresses per project — callers cannot override to other domains
const PROJECT_SENDERS: Record<string, string> = {
  'w11-control-center': 'KAH Digital <contact@kah-digital.ch>',
  'vellio-shop':        'Vellio <contact@kah-digital.ch>',
  'assistant-pme':      'Assistant PME <contact@kah-digital.ch>',
  'kotizy':             'Kotizy <contact@kah-digital.ch>',
  'clutch':             'CLUTCH <contact@kah-digital.ch>',
}
const DEFAULT_SENDER = 'KAH Digital <contact@kah-digital.ch>'

// Per-project daily caps (best-effort per replica — note: serverless multi-instance = approximate)
const PROJECT_CAPS: Record<string, number> = {
  'w11-control-center': 500,
  'vellio-shop': 200,
  'assistant-pme': 300,
  'kotizy': 400,
  'clutch': 300,
  default: 100,
}
const MAX_RECIPIENTS_PER_REQUEST = 50

const dailyMap = new Map<string, { count: number; day: string }>()

function checkDailyCap(project: string, recipientCount: number): { ok: boolean; remaining: number } {
  const today = new Date().toISOString().slice(0, 10)
  const cap = PROJECT_CAPS[project] ?? PROJECT_CAPS.default
  const e = dailyMap.get(project)
  const current = (!e || e.day !== today) ? 0 : e.count

  if (current + recipientCount > cap) return { ok: false, remaining: Math.max(0, cap - current) }

  dailyMap.set(project, { count: current + recipientCount, day: today })
  return { ok: true, remaining: cap - current - recipientCount }
}

export async function POST(req: Request) {
  const auth = validateApiKey(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

  const body = await req.json() as {
    to: string | string[]
    subject: string
    html: string
    text?: string
    reply_to?: string
    tags?: { name: string; value: string }[]
  }

  const { to, subject, html, text, reply_to, tags } = body
  if (!to || !subject || !html)
    return NextResponse.json({ error: 'to, subject, html required' }, { status: 400 })

  const recipients = (Array.isArray(to) ? to : [to]).slice(0, MAX_RECIPIENTS_PER_REQUEST)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const invalid = recipients.filter(e => !emailRegex.test(e))
  if (invalid.length)
    return NextResponse.json({ error: `Invalid email(s): ${invalid.join(', ')}` }, { status: 400 })

  // Daily cap — checked BEFORE sending, incremented by actual recipient count
  const capCheck = checkDailyCap(auth.project, recipients.length)
  if (!capCheck.ok)
    return NextResponse.json({ error: 'Daily email cap reached for this project', remaining: 0 }, { status: 429 })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })

  // FROM is always pinned per project — caller cannot override
  const from = PROJECT_SENDERS[auth.project] ?? DEFAULT_SENDER

  const payload: Record<string, unknown> = { from, to: recipients, subject, html }
  if (text) payload.text = text
  if (reply_to) payload.reply_to = reply_to
  if (tags?.length) payload.tags = tags

  const r = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'kah-digital-gateway/1.0',
    },
    body: JSON.stringify(payload),
  })

  const result = await r.json() as { id?: string; error?: { message: string } }

  if (!r.ok) {
    console.error('[kah/email] resend error', result)
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 })
  }

  return NextResponse.json({
    id: result.id,
    project: auth.project,
    remaining_today: capCheck.remaining,
  })
}
