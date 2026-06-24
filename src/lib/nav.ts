import type { NavLabels } from '@/sanity/loaders';
import type { SiteSettings } from '@/sanity/types';

export type NavLink = { label: string; href: string };

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Borrowers', href: '/borrowers' },
  { label: 'Investors', href: '/investors' },
  { label: 'News', href: '/news' },
];

/** Fallback insight cards when Sanity posts are unavailable. */
export const INSIGHT_POST_FALLBACKS = [
  {
    title: 'PCG News: Welcome to new investor – Aurora KiwiSaver',
    href: '/news/pcg-news-welcome-to-new-investor-aurora-kiwisaver',
    imageSrc: '/images/insight-1.jpg',
    category: 'news',
  },
  {
    title: 'PCG Insights: Relative Value in Private Debt',
    href: '/news/pcg-insights-relative-value-in-private-debt',
    imageSrc: '/images/insight-2.jpg',
    category: 'insights',
  },
  {
    title: 'PCG News: KangaNews NZ Private Debt Feature',
    href: '/news/kanganews_nz_privatedebt_feature',
    imageSrc: '/images/insight-3.jpg',
    category: 'news',
  },
  {
    title: 'PCG Insights: Private Debt – What Do We Mean?',
    href: '/news/private-debt-what-do-we-mean',
    imageSrc: '/images/insight-4.jpg',
    category: 'insights',
  },
] as const;

export function buildNavLinks(
  labels: NavLabels | null | undefined,
  siteSettings: SiteSettings | null | undefined,
): NavLink[] {
  const fromSettings = siteSettings?.navLinks
    ?.filter((link): link is NavLink => Boolean(link?.label && link?.href))
    .filter((link) => !link.href.startsWith('/strategies'));

  if (fromSettings && fromSettings.length > 0) {
    return fromSettings;
  }

  if (!labels) return DEFAULT_NAV_LINKS;

  return [
    { label: labels.about?.label || 'About', href: labels.about?.slug || '/about' },
    { label: labels.borrowers?.label || 'Borrowers', href: labels.borrowers?.slug || '/borrowers' },
    { label: labels.investors?.label || 'Investors', href: labels.investors?.slug || '/investors' },
    { label: labels.insights?.label || 'News', href: labels.insights?.slug || '/news' },
  ];
}
