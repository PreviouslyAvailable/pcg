import { urlFor } from '@/sanity/image';
import type { TeamMember } from '@/sanity/types';

type TeamImage = TeamMember['image'];

/** Preserve full portrait — avoid width+height crop from Sanity CDN. */
export function teamCardImageUrl(image?: TeamImage | null, width = 600) {
  if (!image?.asset?.url) return null;
  return urlFor(image).width(width).fit('max').auto('format').url();
}

export function teamModalImageUrl(image?: TeamImage | null, width = 900) {
  if (!image?.asset?.url) return null;
  return urlFor(image).width(width).fit('max').auto('format').url();
}
