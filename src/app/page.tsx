import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeIntro from '@/components/HomeIntro';
import CaseStudy from '@/components/CaseStudy';
import CtaBanner from '@/components/CtaBanner';
import InvestorsSection from '@/components/InvestorsSection';
import HowDifferent from '@/components/HowDifferent';
import InsightsSection from '@/components/InsightsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar variant="dark" />
      <Hero />
      <HomeIntro />
      <CaseStudy />
      <CtaBanner />
      <InvestorsSection />
      <CtaBanner
        heading="Growth isn't found in cookie-cutter solutions. It's crafted through partnerships that understand your business reality."
        ctaLabel="Get started"
        ctaHref="/contact"
        background="image"
      />
      <HowDifferent />
      <InsightsSection />
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
