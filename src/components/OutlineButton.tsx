import Link from 'next/link';
import { isExternalHref, sanitizeHref } from '@/lib/urls';

interface OutlineButtonProps {
  href: string;
  children: React.ReactNode;
  /** Extra classes for layout/size tweaks (e.g. `self-start`, `text-[16px]`). */
  className?: string;
  /** `dark` uses white border/text for dark backgrounds (e.g. fund cards). */
  scheme?: 'light' | 'dark';
}

const SCHEME_CLASS = {
  light: 'font-sans uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors',
  dark: 'font-sans uppercase tracking-wide text-white border border-white/40 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors',
} as const;

/** Bordered, uppercase link button used across marketing pages. */
export default function OutlineButton({
  href,
  children,
  className = 'inline-flex items-center text-[14px]',
  scheme = 'light',
}: OutlineButtonProps) {
  const safeHref = sanitizeHref(href) ?? '/';
  const classes = `${SCHEME_CLASS[scheme]} ${className}`;

  if (isExternalHref(safeHref)) {
    return (
      <a href={safeHref} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={safeHref} className={classes}>
      {children}
    </Link>
  );
}
