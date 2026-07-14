import type { NavLabels } from '@/sanity/loaders';
import type { SiteSettings } from '@/sanity/types';
import { sanitizeHref } from '@/lib/urls';

export type NavLink = { label: string; href: string };

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Borrowers', href: '/borrowers' },
  { label: 'Investors', href: '/investors' },
  { label: 'News', href: '/news' },
];

function safeNavLink(label: string | undefined, href: string | undefined, fallbackLabel: string, fallbackHref: string): NavLink {
  const safeHref = sanitizeHref(href) ?? fallbackHref;
  // Nav should stay on-site relative paths
  const hrefFinal = safeHref.startsWith('/') ? safeHref : fallbackHref;
  return { label: (label && label.trim()) || fallbackLabel, href: hrefFinal };
}

export function buildNavLinks(
  labels: NavLabels | null | undefined,
  siteSettings: SiteSettings | null | undefined,
): NavLink[] {
  const fromSettings = siteSettings?.navLinks
    ?.map((link) => {
      if (!link?.label || !link?.href) return null;
      const safeHref = sanitizeHref(link.href);
      if (!safeHref || !safeHref.startsWith('/')) return null;
      return { label: link.label, href: safeHref } satisfies NavLink;
    })
    .filter((link): link is NavLink => Boolean(link));

  if (fromSettings && fromSettings.length > 0) {
    return fromSettings;
  }

  if (!labels) return DEFAULT_NAV_LINKS;

  return [
    safeNavLink(labels.about?.label, labels.about?.slug, 'About', '/about'),
    safeNavLink(labels.borrowers?.label, labels.borrowers?.slug, 'Borrowers', '/borrowers'),
    safeNavLink(labels.investors?.label, labels.investors?.slug, 'Investors', '/investors'),
    safeNavLink(labels.insights?.label, labels.insights?.slug, 'News', '/news'),
  ];
}
