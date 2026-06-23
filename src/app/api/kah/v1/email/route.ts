import { NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/kah-api-auth'

export const dynamic = 'force-dynamic'

const RESEND_API = 'https://api.resend.com/emails'
const FROM_DEFAULT = 'KAH Digital <contact@kah-digital.ch>'

// Per-project daily send caps
const PROJECT_CAPS: Record<string, number> = {
  'w11-control-center': 500,
  'vellio-shop': 200,
  'assistant-pme': 300,
  'kotizy': 400,
  default: 100,
}

// In-memory daily counter per project (resets at midnight UTC)
const dailyMap = new Map<string, { count: number; day: string }>()

function checkDailyCap(project: string): { ok: boolean; remaining: number } {
  const today = new Date().toISOString().slice(0, 10)
  const cap = PROJECT_CAPS[project] ?? PROJECT_CAPS.default
  const e = dailyMap.get(project)
  if (!e || e.day !== today) {
    dailyMap.set(project, { count: 1, day: today })
    return { ok: true, remaining: cap - 1 }
  }
  if (e.count >= cap) return { ok: false, remaining: 0 }
  e.count++
  return { ok: true, remaining: cap - e.count }
}

export async function POST(req: Request) {
  const auth = validateApiKey(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

  const body = await req.json() as {
    to: string | string[]
    from?: string
    subject: string
    html: string
    text?: string
    reply_to?: string
    tags?: { name: string; value: string }[]
  }

  const { to, subject, html, text, reply_to, tags } = body
  if (!to || !subject || !html)
    return NextResponse.json({ error: 'to, subject, html required' }, { status: 400 })

  // Validate email format
  const recipients = Array.isArray(to) ? to : [to]
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const invalidEmails = recipients.filter(e => !emailRegex.test(e))
  if (invalidEmails.length)
    return NextResponse.json({ error: `Invalid email(s): ${invalidEmails.join(', ')}` }, { status: 400 })

  // Daily cap check
  const capCheck = checkDailyCap(auth.project)
  if (!capCheck.ok)
    return NextResponse.json({ error: 'Daily email cap reached for this project' }, { status: 429 })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })

  const fromAddr = body.from ?? FROM_DEFAULT
  const payload: Record<string, unknown> = { from: fromAddr, to: recipients, subject, html }
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
