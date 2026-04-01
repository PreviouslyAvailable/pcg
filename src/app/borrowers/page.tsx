import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

const lendingTypes = [
  {
    title: 'Senior Secured Lending',
    body: 'Provide your business with the lowest cost of private capital through first-lien positions and conservative security packages. Designed for established, cash generative businesses seeking stable, long-term funding for defensive operations.',
  },
  {
    title: 'Unitranche Financing',
    body: 'Provides borrowers with maximum speed and execution simplicity, eliminating the need to manage multiple lender relationships.',
  },
  {
    title: 'Junior & Hybrid Capital',
    body: 'Secured Lien Lending: Access additional capital for strong businesses where existing senior facilities have reached their limit.',
  },
  {
    title: 'Mezzanine & Hybrid Capital',
    body: 'Accelerate growth with "quasi-equity" investments that combine current pay with equity upside, allowing founders to fund expansion without significant equity dilution.',
  },
];

const sectors = [
  {
    title: 'Business Services & Technology',
    body: 'Recurring revenue models with defensive characteristics and growth potential.',
  },
  {
    title: 'Healthcare & Aged Care',
    body: 'Essential services with government funding underpinning stable cash flows.',
  },
  {
    title: 'Manufacturing & Industrial',
    body: 'Asset-rich businesses with strong regional market positions.',
  },
  {
    title: 'Consumer & Retail',
    body: 'Market leading businesses with strong brands and proven management teams.',
  },
];

const lendingCriteriaRows = [
  { feature: 'Transaction Size', criteria: '$5m – $50m/per transaction' },
  { feature: 'Business Type', criteria: 'Established companies with $2M+ EBITDA' },
  { feature: 'Security Position', criteria: 'Primary Secured (First Lien or Unitranche structures)' },
  { feature: 'Geography', criteria: 'New Zealand' },
];

const riskFramework = [
  {
    title: 'Portfolio Construction',
    body: 'Maximum 5% position sizing, sector diversification limits, and geographic spread across New Zealand.',
  },
  {
    title: 'Underwriting Standards',
    body: 'Minimum EBITDA requirements, debt service coverage ratios, and security coverage multiples maintained across all investments.',
  },
  {
    title: 'Ongoing Monitoring',
    body: 'Monthly borrower reporting, quarterly covenant testing, and annual business reviews with management teams.',
  },
  {
    title: 'Workout Experience',
    body: 'Proven capability to manage distressed situations and maximise recoveries when required.',
  },
];

export default function BorrowersPage() {
  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      <PageHero
        heading="Capital Solutions for the Entire Business Lifecycle"
        subtext="We provide the structural creativity and scale to meet your most complex financing needs, from senior secured debt to non-dilutive hybrid capital."
        imageSrc="/images/borrowers.jpg"
        imageAlt="Capital solutions in action"
      />

      {/* Core Strategy */}
      <section className="px-4 lg:px-[60px] py-16 lg:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.33px] text-ink/50 mb-6">CORE STRATEGY</p>
        <h2 className="font-serif font-light text-ink text-[clamp(32px,3.5vw,52px)] leading-[1.0] tracking-[-0.02em] mb-12">
          Diversified Private Credit
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
          {lendingTypes.map((item) => (
            <div key={item.title} className="border-t border-black/10 pt-6">
              <h3 className="font-sans text-ink text-[20px] leading-[1.2] mb-2">{item.title}</h3>
              <p className="font-nav text-ink/70 text-[16px] leading-[1.5]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sector Focus */}
      <section className="px-4 lg:px-[60px] pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="font-serif font-light text-ink text-[clamp(32px,3.5vw,52px)] leading-[1.0] tracking-[-0.02em] mb-10">
            Sector Focus
          </h2>
          <div className="space-y-6">
            {sectors.map((sector) => (
              <div key={sector.title} className="border-t border-black/10 pt-5">
                <h3 className="font-sans text-ink text-[18px] leading-[1.2] mb-1">{sector.title}</h3>
                <p className="font-nav text-ink/60 text-[15px] leading-[1.5]">{sector.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-cream-warm">
          <Image src="/images/how-3.jpg" alt="Sector focus" fill className="object-cover" />
        </div>
      </section>

      {/* Lending Focus & Core Lending Areas */}
      <section className="px-4 lg:px-[60px] pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lending Focus card */}
        <div className="bg-teal rounded-[18px] p-8">
          <h3 className="font-sans text-white text-[22px] leading-[1.2] mb-2">Lending Focus &amp; Investment Criteria</h3>
          <p className="font-nav text-white/70 text-[14px] leading-[1.4] mb-8">
            Flexible Capital for New Zealand's Middle Market. We provide bespoke financing solutions for established businesses with strong management teams and clear growth trajectories.
          </p>
          <div className="divide-y divide-white/20 mb-8">
            {lendingCriteriaRows.map((row) => (
              <div key={row.feature} className="flex gap-4 py-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2px] text-white/50 w-[120px] shrink-0 pt-0.5">{row.feature}</p>
                <p className="font-nav text-white text-[14px] leading-[1.4]">{row.criteria}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-block font-sans text-[14px] uppercase tracking-wide text-white border border-white/40 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Core Lending Areas card */}
        <div className="bg-cream-warm rounded-[18px] p-8">
          <h3 className="font-sans text-ink text-[22px] leading-[1.2] mb-6">Core Lending Areas</h3>
          <ul className="space-y-4 mb-8">
            <li>
              <p className="font-nav text-ink text-[15px] leading-[1.5]">
                <span className="font-sans text-[14px]">Acquisition Finance &amp; MBOs:</span> Funding for strategic acquisitions, management buyouts, or private equity-backed transactions where speed and certainty are paramount.
              </p>
            </li>
            <li>
              <p className="font-nav text-ink text-[15px] leading-[1.5]">
                <span className="font-sans text-[14px]">Expansion &amp; Growth Capital:</span> Providing the non-dilutive debt needed to fund new facilities, market entry or product development without giving up equity.
              </p>
            </li>
            <li>
              <p className="font-nav text-ink text-[15px] leading-[1.5]">
                <span className="font-sans text-[14px]">Shareholder Transactions:</span> Facilitating partner buyouts, family successions, or special dividends to unlock shareholder value.
              </p>
            </li>
            <li>
              <p className="font-nav text-ink text-[15px] leading-[1.5]">
                <span className="font-sans text-[14px]">Refinancing &amp; Recapitalisation:</span> Replacing restrictive bank facilities with flexible terms that match your operational cash flow and seasonal cycles.
              </p>
            </li>
          </ul>
          <Link
            href="/contact"
            className="inline-block font-sans text-[14px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Risk Management Framework */}
      <section className="px-4 lg:px-[60px] pb-16 lg:pb-24">
        <div className="bg-dark rounded-[18px] p-8 lg:p-12">
          <h2 className="font-sans text-white text-[clamp(22px,2.5vw,36px)] leading-[1.2] mb-10">
            Risk Management Framework
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {riskFramework.map((item) => (
              <div key={item.title} className="border-t border-white/15 pt-6">
                <h3 className="font-sans text-white text-[18px] leading-[1.2] mb-2">{item.title}</h3>
                <p className="font-nav text-white/60 text-[15px] leading-[1.5]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Ready to access flexible funding that grows with your business?"
        ctaLabel="Get started"
        ctaHref="/contact"
        background="image"
        imageSrc="/images/hero-bg.jpg"
      />

      {/* Quote banner */}
      <section className="relative min-h-[380px] flex items-center justify-center px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/how-4.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark/60" />
        </div>
        <blockquote className="relative z-10 font-sans text-gold text-[clamp(22px,2.8vw,40px)] leading-[1.2] text-center max-w-[720px]">
          Growth isn't found in cookie-cutter solutions. It's crafted through partnerships that understand your business reality.
        </blockquote>
      </section>

      <Footer />
    </main>
  );
}
