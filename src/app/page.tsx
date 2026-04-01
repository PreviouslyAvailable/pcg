import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeIntro from '@/components/HomeIntro';
import CaseStudy from '@/components/CaseStudy';
import CtaBanner from '@/components/CtaBanner';
import InvestorsSection from '@/components/InvestorsSection';
import HowDifferent from '@/components/HowDifferent';
import InsightsSection from '@/components/InsightsSection';
import Footer from '@/components/Footer';

const insightPosts = [
  { title: 'PCG News: Welcome to new investor – Aurora KiwiSaver', href: '/insights/aurora-kiwisaver', imageSrc: '/images/insight-1.jpg' },
  { title: 'PCG Insights: Relative Value in Private Debt', href: '/insights/relative-value-private-debt', imageSrc: '/images/insight-2.jpg' },
  { title: 'PCG News: KangaNews NZ Private Debt Feature', href: '/insights/kanganews-feature', imageSrc: '/images/insight-3.jpg' },
  { title: 'PCG Insights: Private Debt – What Do We Mean?', href: '/insights/private-debt-what-do-we-mean', imageSrc: '/images/insight-4.jpg' },
];

export default function Home() {
  return (
    <main>
      <Navbar variant="dark" />
      <Hero imageSrc="/images/hero-bg.jpg" />
      <HomeIntro
        borrowersImageSrc="/images/borrowers.jpg"
        investorsImageSrc="/images/investors-right.jpg"
      />
      <CaseStudy imageSrc="/images/case-study.jpg" />
      <CtaBanner />
      <InvestorsSection imageSrc="/images/investors-right.jpg" />
      <CtaBanner
        heading="Growth isn't found in cookie-cutter solutions. It's crafted through partnerships that understand your business reality."
        ctaLabel="Get started"
        ctaHref="/contact"
        background="image"
        imageSrc="/images/quote-bg.jpg"
      />
      <HowDifferent images={['/images/how-1.jpg', '/images/how-2.jpg', '/images/how-3.jpg', '/images/how-4.jpg']} />
      <InsightsSection posts={insightPosts} />
      <CtaBanner
        heading="Ready to access flexible funding that grows with your business?"
        ctaLabel="Get started"
        ctaHref="/contact"
        background="cream"
      />
      <Footer />
    </main>
  );
}
