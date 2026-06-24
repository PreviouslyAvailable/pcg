import type { SanityImage } from './types';
import { urlFor } from './image';

export function quoteBannerUrl(image?: SanityImage, fallback = '/images/quote-bg.jpg') {
  return image?.asset?.url
    ? urlFor(image).width(1920).height(800).url()
    : fallback;
}
