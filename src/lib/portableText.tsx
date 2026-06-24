import type { PortableTextMarkComponentProps } from '@portabletext/react';

type LinkMark = { _type?: string; href?: string };

export function PortableTextLink({
  value,
  children,
}: PortableTextMarkComponentProps) {
  const href = (value as LinkMark | undefined)?.href?.trim();
  if (!href) return <span>{children}</span>;

  const external = href.startsWith('http');
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
