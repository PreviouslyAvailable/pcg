import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import SiteChrome from '@/components/SiteChrome';
import NewsletterBanner from '@/components/NewsletterBanner';
import { getPostBySlug, getRelatedPosts, getPostSlugs } from '@/sanity/loaders';
import { urlFor } from '@/sanity/image';
import { articlePortableTextComponents } from '@/lib/portableTextComponents';
import { formatDateMonthYear, formatDateShort } from '@/lib/dates';
import type { PostSummary } from '@/sanity/types';
import { IMAGE_SIZES } from '@/lib/imageSizes';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs
    .filter(({ slug }) => typeof slug === 'string' && slug.length > 0)
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return { title: post?.title ?? 'News' };
}

export default async function InsightPost({ params }: Props) {
  const { slug } = await params;

  const [post, related]: [Awaited<ReturnType<typeof getPostBySlug>>, PostSummary[]] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug),
  ]);

  if (!post) notFound();

  return (
    <SiteChrome>
      <main className="bg-cream">

      {/* Article header */}
      <section className="pt-36 pb-10 lg:pt-40 lg:pb-12">
        <div className="pcg-inner flex flex-col items-center text-center">
          {post.category && (
            <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-4">
              {post.category.replace(/-/g, ' ')}
            </p>
          )}
          <div className="max-w-[720px] flex flex-col items-center text-center">
            <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,80px)] leading-[1.0] tracking-[-0.015em] mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-nav text-ink/70 text-[16px] leading-[1.3]">{post.excerpt}</p>
            )}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {post.mainImage?.asset && (
        <section className="pb-10">
          <div className="pcg-inner">
            <div className="relative w-full aspect-[16/7] rounded-[16px] overflow-hidden bg-cream-warm">
              <Image
                src={urlFor(post.mainImage).width(1680).height(735).url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                sizes={IMAGE_SIZES.postHero}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article body */}
      <section className="pb-16">
        <div className="pcg-inner flex flex-col items-center">
          <div className="w-full max-w-[760px] no-measure">
            {/* Meta row */}
            <div className="flex gap-6 mb-10">
              {post.publishedAt && (
                <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80">
                  {formatDateShort(post.publishedAt)}
                </p>
              )}
              {post.author && (
                <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80">
                  {post.author.name}{post.author.role ? ` — ${post.author.role}` : ''}
                </p>
              )}
            </div>

            {/* Body */}
            {post.body && <PortableText value={post.body} components={articlePortableTextComponents} />}
          </div>
        </div>
      </section>

      {/* Newsletter banner */}
      <section className="pb-16">
        <div className="pcg-inner">
          <NewsletterBanner />
        </div>
      </section>

      {/* Related Insights */}
      {related.length > 0 && (
        <section className="pb-20 lg:pb-24">
          <div className="pcg-inner">
            <h2 className="font-sans text-ink text-[28px] mb-8">Related Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((item) => (
                <Link key={item._id} href={`/news/${item.slug}`} className="group block">
                  <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-cream-warm mb-4">
                    {item.mainImage?.asset ? (
                      <Image
                        src={urlFor(item.mainImage).width(600).height(450).url()}
                        alt={item.mainImage.alt ?? item.title}
                        fill
                        sizes={IMAGE_SIZES.gridThird}
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-cream-warm" />
                    )}
                  </div>
                  {item.category && (
                    <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-1">
                      {item.category.replace(/-/g, ' ')}
                    </p>
                  )}
                  <p className="font-sans text-ink text-[16px] leading-[1.2] mb-1">{item.title}</p>
                  {item.publishedAt && (
                    <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-2">
                      {formatDateMonthYear(item.publishedAt)}
                    </p>
                  )}
                  {item.excerpt && (
                    <p className="font-nav text-ink/70 text-[14px] leading-[1.4]">{item.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      </main>
    </SiteChrome>
  );
}
