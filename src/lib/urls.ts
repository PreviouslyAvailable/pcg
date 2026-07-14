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
    return href;
  }

  // mailto: with a simple address check
  if (lower.startsWith('mailto:')) {
    const address = href.slice('mailto:'.length).split('?')[0] ?? '';
    if (!address || /\s/.test(address) || !address.includes('@')) return null;
    return href;
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

/** True when the href should open in a new tab (absolute http/https). */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
