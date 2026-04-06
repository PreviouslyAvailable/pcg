import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterBanner from '@/components/NewsletterBanner';

const recentInsights = [
  {
    title: 'Understanding Private Markets',
    category: 'MARKET UPDATE',
    image: '/images/insight-1.jpg',
    href: '/insights/understanding-private-markets',
  },
  {
    title: 'EV Infrastructure Investment',
    category: 'SECTOR ANALYSIS',
    image: '/images/insight-2.jpg',
    href: '/insights/ev-infrastructure',
  },
  {
    title: 'Interview: John Ferrara',
    category: 'INTERVIEW',
    image: '/images/insight-3.jpg',
    href: '/insights/john-ferrara',
  },
];

const educationalResources = [
  {
    title: 'Understanding Private Credit',
    body: 'Comprehensive guide to private debt investing, market participants, and how it fits in a diversified portfolio.',
    category: 'EDUCATION',
    bg: 'bg-[#2d1f3d]',
    headingColor: 'text-white',
    tagColor: 'text-white/40',
  },
  {
    title: 'Due Diligence Framework',
    body: 'Our approach to credit analysis, business evaluation, and risk assessment in private markets.',
    category: 'EDUCATION',
    bg: 'bg-[#c5dce8]',
    headingColor: 'text-ink',
    tagColor: 'text-ink/40',
  },
  {
    title: 'Regulatory Environment',
    body: 'Overview of New Zealand financial services regulation and its impact on private credit investing.',
    category: 'EDUCATION',
    bg: 'bg-cream-warm',
    headingColor: 'text-ink',
    tagColor: 'text-ink/40',
  },
];

const allInsights = [
  {
    title: 'Q4 2025 New Zealand Private Credit',
    category: 'MARKET UPDATE',
    image: '/images/how-1.jpg',
    href: '/insights/q4-2025-nz-private-credit',
  },
  {
    title: 'RBNZ Banking Reforms Impact',
    category: 'REGULATORY REVIEW',
    image: '/images/insight-2.jpg',
    href: '/insights/rbnz-banking-reforms',
  },
  {
    title: 'Navigating Economic Uncertainty',
    category: 'CASE STUDY',
    image: '/images/insight-3.jpg',
    href: '/insights/navigating-economic-uncertainty',
  },
  {
    title: 'Private Debt as an Asset Class',
    category: 'EDUCATION',
    image: '/images/how-2.jpg',
    href: '/insights/private-debt-asset-class',
  },
  {
    title: 'Infrastructure Investment Trends',
    category: 'MARKET UPDATE',
    image: '/images/how-3.jpg',
    href: '/insights/infrastructure-investment-trends',
  },
  {
    title: 'Wellington Growth Opportunities',
    category: 'SECTOR ANALYSIS',
    image: '/images/how-4.jpg',
    href: '/insights/wellington-growth-opportunities',
  },
];

export default function InsightsPage() {
  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      {/* Header */}
      <section className="pt-36 pb-10 lg:pt-40 lg:pb-12">
        <div className="pcg-inner">
        <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,92px)] leading-[1.0] tracking-[-0.015em]">
          Private Credit Market Intelligence
        </h1>
        </div>
      </section>

      {/* Recent Insights */}
      <section className="pb-16">
        <div className="pcg-inner">
        <h2 className="font-sans text-ink text-[22px] mb-6">Recent Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentInsights.map((insight) => (
            <Link key={insight.href} href={insight.href} className="group block">
              <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden bg-cream-warm mb-3">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.33px] text-ink/50 mb-1">{insight.category}</p>
              <p className="font-sans text-ink text-[16px] leading-[1.2]">{insight.title}</p>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* Newsletter banner */}
      <section className="pb-16">
        <div className="pcg-inner">
        <NewsletterBanner />
        </div>
      </section>

      {/* Educational Resources */}
      <section className="pb-16">
        <div className="pcg-inner">
        <h2 className="font-sans text-ink text-[22px] mb-6">Educational Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {educationalResources.map((resource) => (
            <div key={resource.title}>
              <div className={`${resource.bg} rounded-[12px] p-6 aspect-[4/3] flex flex-col justify-end mb-4`}>
                <p className={`font-mono text-[10px] uppercase tracking-[0.33px] ${resource.tagColor} mb-3`}>
                  {resource.category}
                </p>
                <h3 className={`font-sans ${resource.headingColor} text-[22px] leading-[1.15]`}>{resource.title}</h3>
              </div>
              <p className="font-sans text-ink text-[16px] mb-1">{resource.title}</p>
              <p className="font-nav text-ink/60 text-[14px] leading-[1.5]">{resource.body}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* All Insights */}
      <section className="pb-20 lg:pb-24">
        <div className="pcg-inner">
        <h2 className="font-sans text-ink text-[22px] mb-6">All Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {allInsights.map((insight) => (
            <Link key={insight.href} href={insight.href} className="group block">
              <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-cream-warm mb-3">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.33px] text-ink/50 mb-1">{insight.category}</p>
              <p className="font-sans text-ink text-[16px] leading-[1.2]">{insight.title}</p>
            </Link>
          ))}
        </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
