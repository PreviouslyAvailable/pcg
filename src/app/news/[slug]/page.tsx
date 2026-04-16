import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import Navbar from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import NewsletterBanner from '@/components/NewsletterBanner';
import { client } from '@/sanity/client';
import { postBySlugQuery, relatedPostsQuery, postSlugsQuery } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import type { PostFull, PostSummary } from '@/sanity/types';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(postSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: PostFull | null = await client.fetch(postBySlugQuery, { slug });
  return { title: post?.title ?? 'Insights' };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatDateLong(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    month: 'long',
    year: 'numeric',
  }).toUpperCase();
}

// PortableText component overrides — applies site typography
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-nav text-ink text-[16px] leading-[1.6] mb-5">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,56px)] leading-[1.05] tracking-[-0.012em] mt-14 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif font-light text-ink text-[clamp(28px,3vw,38px)] leading-[1.1] tracking-[-0.01em] mt-12 mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans text-ink text-[24px] leading-[1.25] mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-ink text-[20px] leading-[1.3] mt-8 mb-3">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="font-sans text-ink text-[17px] leading-[1.3] tracking-wide uppercase mt-6 mb-2">{children}</h5>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-ink/20 pl-6 my-8 font-serif text-ink/70 text-[20px] leading-[1.4] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 mb-5 space-y-2 font-nav text-ink text-[16px] leading-[1.6]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 mb-5 space-y-2 font-nav text-ink text-[16px] leading-[1.6]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="underline underline-offset-2 hover:text-ink/60 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt ?? ''}
            width={1200}
            height={0}
            style={{ width: '100%', height: 'auto' }}
            className="rounded-[12px]"
          />
          {value.caption && (
            <figcaption className="font-sans text-[13px] text-ink/50 mt-5 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function InsightPost({ params }: Props) {
  const { slug } = await params;

  const [post, related]: [PostFull | null, PostSummary[]] = await Promise.all([
    client.fetch(postBySlugQuery, { slug }),
    client.fetch(relatedPostsQuery, { slug }),
  ]);

  if (!post) notFound();

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

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
      {post.mainImage && (
        <section className="pb-10">
          <div className="pcg-inner">
            <div className="relative w-full aspect-[16/7] rounded-[16px] overflow-hidden bg-cream-warm">
              <Image
                src={urlFor(post.mainImage).width(1680).height(735).url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
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
                  {formatDate(post.publishedAt)}
                </p>
              )}
              {post.author && (
                <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80">
                  {post.author.name}{post.author.role ? ` — ${post.author.role}` : ''}
                </p>
              )}
            </div>

            {/* Body */}
            {post.body && <PortableText value={post.body} components={components} />}
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
                    {item.mainImage ? (
                      <Image
                        src={urlFor(item.mainImage).width(600).height(450).url()}
                        alt={item.mainImage.alt ?? item.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 33vw"
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
                      {formatDateLong(item.publishedAt)}
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

      <Footer />
    </main>
  );
}
