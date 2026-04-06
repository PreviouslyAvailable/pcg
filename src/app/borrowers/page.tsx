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
        heading="Capital Built for Speed and Flexibility"
        subtext="We provide financing solutions designed to help you scale, acquire, or refinance. Partner with a local team that has the authority and expertise to say yes."
        imageSrc="/images/borrowers.jpg"
        imageAlt="Capital solutions in action"
      />

      {/* Why choose PCG */}
      <section className="py-16 lg:py-24">
        <div className="pcg-inner">
        <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-12">
          Why choose PCG?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
          {lendingTypes.map((item) => (
            <div key={item.title}>
              <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-3">{item.title}</h3>
              <p className="font-nav text-ink text-[18px] leading-[1.3]">{item.body}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Our lending focus */}
      <section className="pb-16 lg:pb-24">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-10">
            Our lending focus
          </h2>
          <div className="space-y-8">
            {sectors.map((sector) => (
              <div key={sector.title}>
                <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-2">{sector.title}</h3>
                <p className="font-nav text-ink text-[18px] leading-[1.3]">{sector.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-cream-warm">
          <Image src="/images/how-3.jpg" alt="Sector focus" fill className="object-cover" />
        </div>
        </div>
      </section>

      {/* Lending Focus & Core Lending Areas */}
      <section className="pb-16 lg:pb-24">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lending Focus card */}
        <div className="bg-teal rounded-[18px] p-8 flex flex-col">
          <h3 className="font-sans text-white text-[26px] leading-[1.2] mb-2">Lending Focus &amp; Investment Criteria</h3>
          <p className="font-nav text-white/70 text-[18px] leading-[1.3] mb-8">
            Flexible Capital for New Zealand's Middle Market. We provide bespoke financing solutions for established businesses with strong management teams and clear growth trajectories.
          </p>
          {/* Table with headers */}
          <div className="mb-8 flex-1">
            <div className="flex gap-4 pb-2 mb-1">
              <p className="font-sans text-white/60 text-[13px] uppercase tracking-wide w-[140px] shrink-0">Feature</p>
              <p className="font-sans text-white/60 text-[13px] uppercase tracking-wide">Target Criteria</p>
            </div>
            <div className="divide-y divide-white/20">
              {lendingCriteriaRows.map((row) => (
                <div key={row.feature} className="flex gap-4 py-3">
                  <p className="font-nav text-white/70 text-[16px] leading-[1.4] w-[140px] shrink-0">{row.feature}:</p>
                  <p className="font-nav text-white text-[16px] leading-[1.4]">{row.criteria}</p>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            className="self-start font-sans text-[16px] uppercase tracking-wide text-white border border-white/40 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Core Lending Areas card */}
        <div className="bg-cream-warm rounded-[18px] p-8 flex flex-col">
          <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-6">Core Lending Areas</h3>
          <ul className="space-y-4 mb-6 flex-1">
            <li className="flex gap-3">
              <span className="text-ink mt-1.5 shrink-0">•</span>
              <p className="font-nav text-ink text-[18px] leading-[1.3]">
                <span className="font-sans font-semibold">Acquisition Finance &amp; MBOs:</span> Funding for strategic acquisitions, management buyouts, or private equity-backed transactions where speed and certainty are paramount.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-ink mt-1.5 shrink-0">•</span>
              <p className="font-nav text-ink text-[18px] leading-[1.3]">
                <span className="font-sans font-semibold">Expansion &amp; Growth Capital:</span> Providing the non-dilutive debt needed to fund new facilities, market entry or product development without giving up equity.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="text-ink mt-1.5 shrink-0">•</span>
              <p className="font-nav text-ink text-[18px] leading-[1.3]">
                <span className="font-sans font-semibold">Shareholder Transactions:</span> Facilitating partner buyouts, family successions, or special dividends to unlock shareholder value.
              </p>
            </li>
          </ul>
          <p className="font-nav text-ink text-[18px] leading-[1.3] mb-8">
            Refinancing &amp; Recapitalisation: Replacing restrictive bank facilities with flexible terms that match your operational cash flow and seasonal cycles.
          </p>
          <Link
            href="/contact"
            className="self-start font-sans text-[16px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
        </div>
      </section>

      {/* Risk Management Framework */}
      <section className="pb-16 lg:pb-24">
        <div className="pcg-inner">
        <div className="bg-dark rounded-[18px] p-8 lg:p-12">
          <h2 className="font-serif font-light text-white text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-12">
            Risk Management Framework
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="space-y-8">
              {riskFramework.map((item) => (
                <div key={item.title}>
                  <h3 className="font-serif font-light text-white text-[26px] leading-[1.2] mb-2">{item.title}</h3>
                  <p className="font-nav text-white/60 text-[18px] leading-[1.3]">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="relative aspect-[4/5] rounded-[12px] overflow-hidden bg-ink/40">
              <Image src="/images/how-2.jpg" alt="Risk management" fill className="object-cover" />
            </div>
          </div>
        </div>
        </div>
      </section>

      <CtaBanner
        heading="Ready to access flexible funding that grows with your business?"
        ctaLabel="Get started"
        ctaHref="/contact"
        background="teal"
      />

      {/* Quote banner */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/how-4.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark/60" />
        </div>
        <blockquote className="relative z-10 font-sans text-cream text-[clamp(28px,3.5vw,50px)] leading-[1.13] text-center max-w-[794px]">
          Success demands more than traditional lending. It requires partners who see beyond the balance sheet to your business potential.
        </blockquote>
      </section>

      <Footer />
    </main>
  );
}
