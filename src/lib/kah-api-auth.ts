import { createHmac, timingSafeEqual } from 'crypto'

/**
 * KAH Digital API Gateway — auth middleware
 * Timing-safe key comparison to prevent timing oracle attacks
 */
export function validateApiKey(req: Request): { ok: true; project: string } | { ok: false; status: number; error: string } {
  const auth = req.headers.get('authorization') ?? ''
  if (!auth.startsWith('Bearer ')) {
    return { ok: false, status: 401, error: 'Missing Bearer token' }
  }
  const token = auth.slice(7).trim()

  // KAH_API_KEYS = "kah_w11_xxx:w11-control-center,kah_vellio_yyy:vellio-shop"
  const rawKeys = process.env.KAH_API_KEYS ?? ''
  if (!rawKeys) return { ok: false, status: 503, error: 'Gateway not configured' }

  let matchedProject: string | null = null
  const tokenBuf = Buffer.from(token)

  // Iterate ALL entries unconditionally — no early return to prevent timing leaks
  for (const entry of rawKeys.split(',')) {
    const [key, project] = entry.trim().split(':')
    if (!key) continue
    const keyBuf = Buffer.from(key)
    // timingSafeEqual requires same length — use HMAC of both to normalize length
    const h = (s: Buffer) => createHmac('sha256', 'kah-gateway').update(s).digest()
    const match = timingSafeEqual(h(tokenBuf), h(keyBuf))
    if (match && matchedProject === null) {
      matchedProject = project ?? 'unknown'
    }
  }

  if (matchedProject !== null) {
    return { ok: true, project: matchedProject }
  }

  return { ok: false, status: 403, error: 'Invalid API key' }
}
