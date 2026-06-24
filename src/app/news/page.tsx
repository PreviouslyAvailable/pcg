import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteChrome from '@/components/SiteChrome';
import NewsletterBanner from '@/components/NewsletterBanner';
import { getPosts, getInsightsPage } from '@/sanity/loaders';
import { urlFor } from '@/sanity/image';
import { formatDateMonthYear } from '@/lib/dates';
import { IMAGE_SIZES } from '@/lib/imageSizes';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInsightsPage();
  return { title: data?.pageTitle ?? 'News' };
}

export const revalidate = 60;

// Colour palette for Educational Resource cards (assigned by index)
const eduBg = ['bg-[#2d1f3d]', 'bg-[#c5dce8]', 'bg-cream-warm'];
const eduHeading = ['text-white', 'text-ink', 'text-ink'];
const eduTag = ['text-white/60', 'text-ink/60', 'text-ink/60'];

export default async function InsightsPage() {
  const [allPosts, pageData] = await Promise.all([getPosts(), getInsightsPage()]);

  const recentInsights = allPosts.filter((p) => p.category !== 'educational').slice(0, 3);
  const educationalResources = allPosts.filter((p) => p.category === 'educational');

  const recentInsightIds = new Set(recentInsights.map((post) => post._id));
  const remainingPosts = allPosts.filter((post) => !recentInsightIds.has(post._id));

  return (
    <SiteChrome>
      <main className="bg-cream">

      {/* Header */}
      <section className="section-page-hero pb-[calc(var(--spacing)*10)]">
        <div className="pcg-inner">
          <div className="w-full lg:w-1/2">
            <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,80px)] leading-[1.0] tracking-[-0.015em]">
              {pageData?.heading ?? 'PCG News'}
            </h1>
          </div>
        </div>
      </section>

      {/* Recent Insights */}
      {recentInsights.length > 0 && (
        <section className="section">
          <div className="pcg-inner">
            <h2 className="font-sans text-ink text-[26px] leading-[1.2] mb-8">{pageData?.recentInsightsHeading ?? 'Recent Insights'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentInsights.map((post) => (
                <Link key={post._id} href={`/news/${post.slug}`} className="group block">
                  <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-cream-warm mb-4">
                    {post.mainImage?.asset ? (
                      <Image
                        src={urlFor(post.mainImage).width(800).height(533).url()}
                        alt={post.mainImage.alt ?? post.title}
                        fill
                        sizes={IMAGE_SIZES.postCard}
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-cream-warm" />
                    )}
                  </div>
                  {post.category && (
                    <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-1">
                      {post.category.replace(/-/g, ' ')}
                    </p>
                  )}
                  <p className="font-sans text-ink text-[26px] leading-[1.2] mt-3 mb-5">{post.title}</p>
                  {post.publishedAt && (
                    <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-2">
                      {formatDateMonthYear(post.publishedAt)}
                    </p>
                  )}
                  {post.excerpt && (
                    <p className="font-nav text-ink/70 text-[16px] leading-[1.5]">{post.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter banner */}
      <section className="section">
        <div className="pcg-inner">
          <NewsletterBanner />
        </div>
      </section>

      {/* Educational Resources */}
      {educationalResources.length > 0 && (
        <section className="section">
          <div className="pcg-inner">
            <h2 className="font-sans text-ink text-[26px] leading-[1.2] mb-8">{pageData?.educationalResourcesHeading ?? 'Educational Resources'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {educationalResources.map((post, i) => (
                <Link key={post._id} href={`/news/${post.slug}`} className="group block">
                  <div className={`${eduBg[i % eduBg.length]} rounded-[12px] p-8 aspect-[4/3] flex flex-col justify-between mb-4`}>
                    <p className={`font-sans text-[14px] uppercase tracking-[1px] ${eduTag[i % eduTag.length]} mb-3`}>
                      {post.category?.replace(/-/g, ' ')}
                    </p>
                    <h3 className={`font-serif ${eduHeading[i % eduHeading.length]} text-[48px] leading-[1]`}>
                      {post.title}
                    </h3>
                  </div>
                  <p className="font-sans text-ink text-[26px] leading-[1.2] mt-2 mb-3">{post.title}</p>
                  {post.excerpt && (
                    <p className="font-nav text-ink/70 text-[16px] leading-[1.5]">{post.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Insights */}
      {remainingPosts.length > 0 && (
        <section className="section">
          <div className="pcg-inner">
            <h2 className="font-sans text-ink text-[26px] leading-[1.2] mb-8">{pageData?.allInsightsHeading ?? 'All Insights'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 gap-y-12">
              {remainingPosts.map((post) => (
                <Link key={post._id} href={`/news/${post.slug}`} className="group block">
                  <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-cream-warm mb-4">
                    {post.mainImage?.asset ? (
                      <Image
                        src={urlFor(post.mainImage).width(800).height(533).url()}
                        alt={post.mainImage.alt ?? post.title}
                        fill
                        sizes={IMAGE_SIZES.postCard}
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-cream-warm" />
                    )}
                  </div>
                  {post.category && (
                    <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-1">
                      {post.category.replace(/-/g, ' ')}
                    </p>
                  )}
                  <p className="font-sans text-ink text-[26px] leading-[1.2] mt-3 mb-5">{post.title}</p>
                  {post.publishedAt && (
                    <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-2">
                      {formatDateMonthYear(post.publishedAt)}
                    </p>
                  )}
                  {post.excerpt && (
                    <p className="font-nav text-ink/70 text-[16px] leading-[1.5]">{post.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {allPosts.length === 0 && (
        <section className="section">
          <div className="pcg-inner">
            <p className="font-nav text-ink/50 text-[16px]">No insights published yet.</p>
          </div>
        </section>
      )}

      </main>
    </SiteChrome>
  );
}
