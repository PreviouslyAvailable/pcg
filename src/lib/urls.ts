/**
 * Allowlist URL schemes for CMS / Portable Text hrefs.
 * Returns a safe href, or null if the value must not be rendered as a link.
 */
export function sanitizeHref(raw?: string | null): string | null {
  const href = raw?.trim();
  if (!href) return null;

  // Protocol-relative URLs — treat as https after stripping leading //
  if (href.startsWith('//')) {
    return sanitizeHref(`https:${href}`);
  }

  const lower = href.toLowerCase();

  // Block dangerous schemes explicitly (and anything with a scheme we don't allow)
  if (/^(javascript|data|vbscript|file|blob):/i.test(lower)) {
    return null;
  }

  // Relative site paths and in-page anchors
  if (href.startsWith('/') || href.startsWith('#')) {
    return sanitizeRelativePath(href);
  }

  // mailto: address only, or allowlisted subject/body query params
  if (lower.startsWith('mailto:')) {
    return sanitizeMailto(href);
  }

  // Absolute http(s) only
  if (lower.startsWith('https://') || lower.startsWith('http://')) {
    try {
      const url = new URL(href);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
      return url.toString();
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Safe same-origin relative paths only.
 * Rejects open-redirect tricks like `/\\evil.com`, `/\/evil.com`, and `\evil.com`.
 */
function sanitizeRelativePath(href: string): string | null {
  if (href.startsWith('#')) {
    // In-page anchors — no whitespace / control chars
    if (/[\s\\]/.test(href) || href.includes('://')) return null;
    return href;
  }

  // Must start with a single / (not //)
  if (!href.startsWith('/') || href.startsWith('//')) return null;

  // Reject backslashes (browser URL parsers may treat /\ as protocol-relative)
  if (href.includes('\\')) return null;

  // Reject encoded slashes / backslashes that could smuggle authority
  if (/%2f|%5c/i.test(href)) return null;

  // Disallow control characters and whitespace
  if (/[\u0000-\u001f\u007f\s]/.test(href)) return null;

  // Parse as path-only relative to a dummy origin
  try {
    const url = new URL(href, 'https://pcg.local');
    if (url.origin !== 'https://pcg.local') return null;
    if (url.username || url.password) return null;
    // Rebuild without unexpected host confusion
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function sanitizeMailto(href: string): string | null {
  const rest = href.slice('mailto:'.length);
  const qIndex = rest.indexOf('?');
  const address = (qIndex === -1 ? rest : rest.slice(0, qIndex)).trim();
  if (!address || /\s/.test(address) || !address.includes('@')) return null;

  if (qIndex === -1) {
    return `mailto:${address}`;
  }

  const params = new URLSearchParams(rest.slice(qIndex + 1));
  const allowed = new URLSearchParams();
  for (const key of ['subject', 'body'] as const) {
    const value = params.get(key);
    if (value != null && value.length > 0) {
      // Cap length and strip control chars (header injection)
      const cleaned = value.replace(/[\r\n\0]/g, '').slice(0, key === 'subject' ? 200 : 2000);
      if (cleaned) allowed.set(key, cleaned);
    }
  }

  const query = allowed.toString();
  return query ? `mailto:${address}?${query}` : `mailto:${address}`;
}

/** True when the href should open in a new tab (absolute http/https). */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Allow only Sanity CDN or same-origin absolute paths for CSS/background images. */
export function sanitizeImageSrc(raw?: string | null): string | null {
  const src = raw?.trim();
  if (!src) return null;

  if (src.startsWith('/') && !src.startsWith('//') && !src.includes('\\')) {
    return sanitizeRelativePath(src);
  }

  try {
    const url = new URL(src);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (url.hostname === 'cdn.sanity.io') return url.toString();
    return null;
  } catch {
    return null;
  }
}
