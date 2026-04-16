import Image from 'next/image';
import Link from 'next/link';
import FadeUp from './FadeUp';

interface InsightCard {
  title: string;
  href: string;
  imageSrc?: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
}

interface InsightsSectionProps {
  posts?: InsightCard[];
}

const placeholderPosts: InsightCard[] = [
  { title: 'Welcome to new investor – Aurora KiwiSaver', href: '/news/aurora-kiwisaver', category: 'news' },
  { title: 'Relative Value in Private Debt', href: '/news/relative-value-private-debt', category: 'insights' },
  { title: 'KangaNews NZ Private Debt Feature', href: '/news/kanganews-feature', category: 'news' },
  { title: 'Private Debt – What Do We Mean?', href: '/news/private-debt-what-do-we-mean', category: 'insights' },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NZ', {
    month: 'long',
    year: 'numeric',
  }).toUpperCase();
}

export default function InsightsSection({ posts = placeholderPosts }: InsightsSectionProps) {
  return (
    <section className="bg-cream-warm py-24">
      <div className="pcg-inner">
      <FadeUp className="flex items-end justify-between mb-12">
        <div>
          <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-4">Insights</p>
          <h2 className="font-sans text-ink text-[clamp(36px,3.5vw,50px)] leading-[1.05] tracking-[-0.02em] max-w-[797px]">
            Gain valuable insights and follow the latest from PCG.
          </h2>
        </div>
      </FadeUp>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {posts.map((post, i) => (
          <FadeUp key={post.href} delay={i * 80}>
            <Link href={post.href} className="group block">
              {/* Image */}
              <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-cream mb-4">
                {post.imageSrc && (
                  <Image
                    src={post.imageSrc}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                )}
              </div>
              {post.category && (
                <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-1">
                  {post.category.replace(/-/g, ' ')}
                </p>
              )}
              <p className="font-sans text-ink text-[20px] leading-[1.2] mt-2 mb-3">
                {post.title}
              </p>
              {post.publishedAt && (
                <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-2">
                  {formatDate(post.publishedAt)}
                </p>
              )}
              {post.excerpt && (
                <p className="font-nav text-ink/70 text-[15px] leading-[1.5]">{post.excerpt}</p>
              )}
            </Link>
          </FadeUp>
        ))}
      </div>
      </div>
    </section>
  );
}
