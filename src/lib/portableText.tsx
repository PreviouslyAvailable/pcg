import type { PortableTextMarkComponentProps } from '@portabletext/react';
import { isExternalHref, sanitizeHref } from '@/lib/urls';

type LinkMark = { _type?: string; href?: string };

export function PortableTextLink({
  value,
  children,
}: PortableTextMarkComponentProps) {
  const href = sanitizeHref((value as LinkMark | undefined)?.href);
  if (!href) return <span>{children}</span>;

  const external = isExternalHref(href);
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="underline underline-offset-2 hover:opacity-70 transition-opacity"
    >
      {children}
    </a>
  );
}
