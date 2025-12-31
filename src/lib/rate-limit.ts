type RateLimitConfig = {
  windowMs: number;
  max: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfter: number;
};

declare global {
  var __rateLimitBuckets: Map<string, RateLimitBucket> | undefined;
  var __rateLimitLastCleanup: number | undefined;
}

const buckets = globalThis.__rateLimitBuckets ?? new Map<string, RateLimitBucket>();
if (!globalThis.__rateLimitBuckets) {
  globalThis.__rateLimitBuckets = buckets;
}

const getLastCleanup = () => globalThis.__rateLimitLastCleanup ?? 0;
const setLastCleanup = (value: number) => {
  globalThis.__rateLimitLastCleanup = value;
};

function cleanupBuckets(now: number, windowMs: number) {
  if (now - getLastCleanup() < windowMs) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
  setLastCleanup(now);
}

export function rateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  cleanupBuckets(now, config.windowMs);

  const existing = buckets.get(key);
  const resetAt = existing && existing.resetAt > now ? existing.resetAt : now + config.windowMs;
  const next: RateLimitBucket = existing && existing.resetAt > now ? existing : { count: 0, resetAt };
  next.count += 1;
  buckets.set(key, next);

  const allowed = next.count <= config.max;
  const remaining = Math.max(0, config.max - next.count);
  const retryAfter = allowed ? 0 : Math.ceil((next.resetAt - now) / 1000);

  return {
    allowed,
    remaining,
    resetAt: next.resetAt,
    retryAfter,
  };
}

export function getRequestIp(request: Request) {
  const cfConnecting = request.headers.get("cf-connecting-ip");
  if (cfConnecting) return cfConnecting.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const requestIp = (request as Request & { ip?: string }).ip;
  return requestIp ?? "unknown";
}
