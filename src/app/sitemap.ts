import type { MetadataRoute } from 'next';
import { getPostSlugs } from '@/sanity/loaders';
import { SITE_URL } from '@/lib/site';

const staticRoutes = [
  '',
  '/about',
  '/borrowers',
  '/investors',
  '/strategies',
  '/contact',
  '/news',
  '/case-studies',
  '/privacy',
  '/terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostSlugs().catch(() => []);

  const staticEntries = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
