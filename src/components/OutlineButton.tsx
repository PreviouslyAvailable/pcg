import Link from 'next/link';

interface OutlineButtonProps {
  href: string;
  children: React.ReactNode;
  /** Extra classes for layout/size tweaks (e.g. `self-start`, `text-[16px]`). */
  className?: string;
}

const BASE_CLASS =
  'font-sans uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors';

/** Bordered, uppercase link button used across marketing pages. */
export default function OutlineButton({ href, children, className = 'inline-flex items-center text-[14px]' }: OutlineButtonProps) {
  return (
    <Link href={href} className={`${BASE_CLASS} ${className}`}>
      {children}
    </Link>
  );
}
