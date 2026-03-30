import Image from 'next/image';
import Link from 'next/link';

interface InsightCard {
  title: string;
  href: string;
  imageSrc?: string;
  category?: string;
}

interface InsightsSectionProps {
  posts?: InsightCard[];
}

const placeholderPosts: InsightCard[] = [
  { title: 'PCG News: Welcome to new investor – Aurora KiwiSaver', href: '/insights/aurora-kiwisaver' },
  { title: 'PCG Insights: Relative Value in Private Debt', href: '/insights/relative-value-private-debt' },
  { title: 'PCG News: KangaNews NZ Private Debt Feature', href: '/insights/kanganews-feature' },
  { title: 'PCG Insights: Private Debt – What Do We Mean?', href: '/insights/private-debt-what-do-we-mean' },
];

export default function InsightsSection({ posts = placeholderPosts }: InsightsSectionProps) {
  return (
    <section className="bg-cream-warm py-24 px-[60px]">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-sans text-[16px] uppercase tracking-widest text-ink mb-4">Insights</p>
          <h2 className="font-sans text-ink text-[clamp(36px,3.3vw,48px)] leading-[1.15] tracking-[-0.02em] max-w-[797px]">
            Gain valuable insights and follow the latest from PCG.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post.href} className="flex flex-col">
            {/* Image */}
            <div className="relative aspect-[308/389] rounded-[20px] overflow-hidden bg-cream mb-5">
              {post.imageSrc && (
                <Image src={post.imageSrc} alt={post.title} fill className="object-cover" />
              )}
            </div>
            <p className="font-sans text-ink text-[20px] leading-[1.3] mb-5 flex-1">
              {post.title}
            </p>
            <Link
              href={post.href}
              className="self-start inline-flex items-center gap-3 font-sans text-[16px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
            >
              Learn More
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
