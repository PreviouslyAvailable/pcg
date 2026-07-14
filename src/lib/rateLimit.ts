/**
 * Lightweight in-memory rate limiter for serverless route handlers.
 * Best-effort per isolate — not a global guarantee. Pair with Vercel Firewall for production hardening.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  {
    limit = 8,
    windowMs = 60_000,
  }: { limit?: number; windowMs?: number } = {},
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  }

  existing.count += 1;
  return { ok: true };
}

/** Best-effort client IP from standard proxy headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
