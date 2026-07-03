import type { Metadata } from 'next';
import type { SEO, SanityImage } from '@/sanity/types';
import { urlFor } from '@/sanity/image';
import { SITE_NAME, SITE_URL } from '@/lib/site';

interface BuildMetadataArgs {
  /** CMS-managed SEO overrides (Contact/Home/Post → "SEO & Social Sharing"). */
  seo?: SEO;
  /** Fallback title when no metaTitle is set (usually the page's pageTitle). */
  title?: string;
  /** Fallback description when no metaDescription is set (e.g. a post excerpt). */
  description?: string;
  /** Fallback social image when no ogImage is set (e.g. a post's main image). */
  image?: SanityImage;
  /** Route path for the canonical URL, e.g. '/about'. Use '' for the home page. */
  path?: string;
}

function ogImageUrl(image?: SanityImage): string | undefined {
  if (!image?.asset?.url) return undefined;
  return urlFor(image).width(1200).height(630).fit('crop').auto('format').url();
}

/**
 * Resolves CMS SEO fields into a Next.js Metadata object, falling back to
 * page-provided defaults. Sets title, description, canonical URL, robots
 * (when noIndex is on), and OpenGraph/Twitter tags including a social image.
 */
export function buildMetadata({ seo, title, description, image, path }: BuildMetadataArgs): Metadata {
  const resolvedTitle = seo?.metaTitle?.trim() || title?.trim() || undefined;
  const resolvedDescription = seo?.metaDescription?.trim() || description?.trim() || undefined;
  const resolvedImage = ogImageUrl(seo?.ogImage) ?? ogImageUrl(image);
  const canonical = path !== undefined ? `${SITE_URL}${path}` : undefined;

  const metadata: Metadata = {};

  if (resolvedTitle) metadata.title = resolvedTitle;
  if (resolvedDescription) metadata.description = resolvedDescription;
  if (canonical) metadata.alternates = { canonical };
  if (seo?.noIndex) metadata.robots = { index: false, follow: false };

  metadata.openGraph = {
    type: 'website',
    locale: 'en_NZ',
    siteName: SITE_NAME,
    ...(resolvedTitle ? { title: resolvedTitle } : {}),
    ...(resolvedDescription ? { description: resolvedDescription } : {}),
    ...(canonical ? { url: canonical } : {}),
    ...(resolvedImage ? { images: [{ url: resolvedImage, width: 1200, height: 630 }] } : {}),
  };

  metadata.twitter = {
    card: 'summary_large_image',
    ...(resolvedTitle ? { title: resolvedTitle } : {}),
    ...(resolvedDescription ? { description: resolvedDescription } : {}),
    ...(resolvedImage ? { images: [resolvedImage] } : {}),
  };

  return metadata;
}
