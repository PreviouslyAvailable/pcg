import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterBanner from '@/components/NewsletterBanner';
import { client } from '@/sanity/client';
import { postsQuery } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import type { PostSummary } from '@/sanity/types';

export const metadata: Metadata = {
  title: 'Insights',
};

// Revalidate every 60 seconds
export const revalidate = 60;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    month: 'long',
    year: 'numeric',
  }).toUpperCase();
}

// Colour palette for Educational Resource cards (assigned by index)
const eduBg = ['bg-[#2d1f3d]', 'bg-[#c5dce8]', 'bg-cream-warm'];
const eduHeading = ['text-white', 'text-ink', 'text-ink'];
const eduTag = ['text-white/60', 'text-ink/60', 'text-ink/60'];

export default async function InsightsPage() {
  const allPosts: PostSummary[] = await client.fetch(postsQuery);

  const recentInsights = allPosts.filter((p) => p.category !== 'educational').slice(0, 3);
  const educationalResources = allPosts.filter((p) => p.category === 'educational');

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      {/* Header */}
      <section className="section-page-hero pb-[calc(var(--spacing)*10)]">
        <div className="pcg-inner">
          <div className="w-1/2">
            <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,80px)] leading-[1.0] tracking-[-0.015em]">
              Private Credit Market Intelligence
            </h1>
          </div>
        </div>
      </section>

      {/* Recent Insights */}
      {recentInsights.length > 0 && (
        <section className="section">
          <div className="pcg-inner">
            <h2 className="font-sans text-ink text-[26px] leading-[1.2] mb-8">Recent Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentInsights.map((post) => (
                <Link key={post._id} href={`/insights/${post.slug}`} className="group block">
                  <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-cream-warm mb-4">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(800).height(533).url()}
                        alt={post.mainImage.alt ?? post.title}
                        fill
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
                      {formatDate(post.publishedAt)}
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
            <h2 className="font-sans text-ink text-[26px] leading-[1.2] mb-8">Educational Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {educationalResources.map((post, i) => (
                <Link key={post._id} href={`/insights/${post.slug}`} className="group block">
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
      {allPosts.length > 0 && (
        <section className="section">
          <div className="pcg-inner">
            <h2 className="font-sans text-ink text-[26px] leading-[1.2] mb-8">All Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 gap-y-12">
              {allPosts.map((post) => (
                <Link key={post._id} href={`/insights/${post.slug}`} className="group block">
                  <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-cream-warm mb-4">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(800).height(533).url()}
                        alt={post.mainImage.alt ?? post.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
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
                      {formatDate(post.publishedAt)}
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

      <Footer />
    </main>
  );
}
