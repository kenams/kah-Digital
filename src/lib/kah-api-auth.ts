/**
 * KAH Digital API Gateway — auth middleware
 * Projects call with: Authorization: Bearer <KAH_API_KEY>
 * Keys stored in KAH_API_KEYS env var as comma-separated values
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

  for (const entry of rawKeys.split(',')) {
    const [key, project] = entry.trim().split(':')
    if (key && key === token) {
      return { ok: true, project: project ?? 'unknown' }
    }
  }

  return { ok: false, status: 403, error: 'Invalid API key' }
}
