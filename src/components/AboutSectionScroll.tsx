'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/** Scrolls to #team when redirected via /about?section=team (hash often dropped on 308). */
export default function AboutSectionScroll() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('section') !== 'team') return;

    const el = document.getElementById('team');
    if (!el) return;

    // Defer until layout settles
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [searchParams]);

  return null;
}
