import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/NavbarServer';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import BodyText from '@/components/BodyText';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { strategiesPageQuery } from '@/sanity/queries';
import type { StrategiesPage } from '@/sanity/types';
import FadeUp from '@/components/FadeUp';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<StrategiesPage>(strategiesPageQuery).catch(() => null);
  return { title: data?.pageTitle ?? 'Strategies' };
}

const fallbackStrategies = [
  { title: 'Senior Secured Lending', body: 'Provide your business with the lowest cost of private capital through first-lien positions and conservative security packages. Designed for established, cash generative businesses seeking stable, long-term funding for defensive operations.' },
  { title: 'Unitranche Financing', body: 'Provides borrowers with maximum speed and execution simplicity, eliminating the need to manage multiple lender relationships.' },
  { title: 'Junior & Hybrid Capital', body: 'Access additional capital for strong businesses where existing senior facilities have reached their limit.' },
  { title: 'Mezzanine & Hybrid Capital', body: 'Accelerate growth with "quasi-equity" investments that combine current pay with equity upside, allowing founders to fund expansion without significant equity dilution.' },
];

const fallbackSectors = [
  { title: 'Business Services & Technology', body: 'Recurring revenue models with defensive characteristics and growth potential.' },
  { title: 'Healthcare & Aged Care', body: 'Essential services with government funding underpinning stable cash flows.' },
  { title: 'Manufacturing & Industrial', body: 'Asset-rich businesses with strong regional market positions.' },
  { title: 'Consumer & Retail', body: 'Market leading businesses with strong brands and proven management teams.' },
];

const fallbackLendingCriteriaRows = [
  { feature: 'Transaction Size', criteria: '$5m – $50m/per transaction' },
  { feature: 'Business Type', criteria: 'Established companies with $2M+ EBITDA' },
  { feature: 'Security Position', criteria: 'Primary Secured (First Lien or Unitranche structures)' },
  { feature: 'Geography', criteria: 'New Zealand' },
];

const fallbackRiskFramework = [
  { title: 'Portfolio Construction', body: 'Maximum 5% position sizing, sector diversification limits, and geographic spread across New Zealand.' },
  { title: 'Underwriting Standards', body: 'Minimum EBITDA requirements, debt service coverage ratios, and security coverage multiples maintained across all investments.' },
  { title: 'Ongoing Monitoring', body: 'Monthly borrower reporting, quarterly covenant testing, and annual business reviews with management teams.' },
  { title: 'Workout Experience', body: 'Proven capability to manage distressed situations and maximise recoveries when required.' },
];

export default async function StrategiesPage() {
  const data = await client.fetch<StrategiesPage>(strategiesPageQuery).catch(() => null);

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(800).url()
    : '/images/borrowers.jpg';

  const sectorFocusImageSrc = data?.sectorFocus?.image?.asset?.url
    ? urlFor(data.sectorFocus.image).width(800).height(600).url()
    : '/images/how-3.jpg';

  const riskFrameworkImageSrc = data?.riskFramework?.image?.asset?.url
    ? urlFor(data.riskFramework.image).width(800).height(533).url()
    : '/images/how-2.jpg';

  const quoteBannerImageSrc = data?.quoteBanner?.image?.asset?.url
    ? urlFor(data.quoteBanner.image).width(1920).height(800).url()
    : '/images/how-4.jpg';

  const strategies = (data?.strategies && data.strategies.length > 0) ? data.strategies : fallbackStrategies;
  const sectors = (data?.sectorFocus?.items && data.sectorFocus.items.length > 0) ? data.sectorFocus.items : fallbackSectors;
  const lendingCriteriaRows = (data?.lendingCriteria?.rows && data.lendingCriteria.rows.length > 0) ? data.lendingCriteria.rows : fallbackLendingCriteriaRows;
  const riskFramework = (data?.riskFramework?.items && data.riskFramework.items.length > 0) ? data.riskFramework.items : fallbackRiskFramework;

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      <PageHero
        heading={data?.hero?.heading ?? 'Capital Solutions for the Entire Business Lifecycle'}
        subtext={data?.hero?.subtext ?? 'We provide the structural creativity and scale to meet your most complex financing needs, from senior secured debt to non-dilutive hybrid capital.'}
        imageSrc={heroImageSrc}
        imageAlt={data?.hero?.image?.alt ?? 'Capital solutions'}
      />

      {/* Core Strategy */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-4">
            {data?.coreStrategyLabel ?? 'CORE STRATEGY'}
          </p>
          <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-12">
            {data?.coreStrategyHeading ?? 'Diversified Private Credit'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
            {strategies.map((item) => (
              <div key={item.title}>
                <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-5">{item.title}</h3>
                {item.body && Array.isArray(item.body) && item.body.length > 0 ? (
                  <BodyText value={item.body} scheme="light" className="pr-5" />
                ) : (
                  <p className="font-nav text-ink/80 text-[16px] leading-[1.3] pr-5">{typeof item.body === 'string' ? item.body : ''}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Focus */}
      <section className="py-[calc(var(--spacing)*18)] bg-white">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-10">
              {data?.sectorFocus?.heading ?? 'Sector Focus'}
            </h2>
            <div className="space-y-5">
              {sectors.map((sector) => (
                <div key={sector.title}>
                  <h3 className="font-sans text-ink text-[26px] leading-[1.3] mb-1">{sector.title}</h3>
                  {sector.body && Array.isArray(sector.body) && sector.body.length > 0 ? (
                    <BodyText value={sector.body} scheme="light" />
                  ) : (
                    <p className="font-nav text-ink/70 text-[16px] leading-[1.4]">{typeof sector.body === 'string' ? sector.body : ''}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-cream-warm">
            <Image src={sectorFocusImageSrc} alt="Sector focus" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Lending Focus & Core Lending Areas */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lending Focus card */}
          <FadeUp delay={0} className="bg-teal rounded-[16px] p-10 lg:p-18 flex flex-col hover-lift">
            <h3 className="font-sans text-white text-[26px] leading-[1.2] mb-4">Lending Focus &amp; Investment Criteria</h3>
            <p className="font-nav text-white/80 text-[26px] leading-[1.3] mb-8">
              {data?.lendingCriteria?.subtext ?? 'Flexible Capital for New Zealand\'s Middle Market. We provide bespoke financing solutions for established businesses with strong management teams and clear growth trajectories.'}
            </p>
            <div className="mb-8 flex-1">
              <div className="flex gap-6 border-b border-white/30 pb-3 mb-1">
                <p className="font-sans text-white text-[16px] w-[160px] shrink-0">Feature</p>
                <p className="font-sans text-white text-[16px]">Target Criteria</p>
              </div>
              <div className="divide-y divide-white/20">
                {lendingCriteriaRows.map((row) => (
                  <div key={row.feature} className="flex gap-6 py-3">
                    <p className="font-nav text-white/80 text-[16px] leading-[1.4] w-[160px] shrink-0">{row.feature}:</p>
                    <p className="font-nav text-white text-[16px] leading-[1.4]">{row.criteria}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="self-start font-sans font-bold text-[16px] uppercase tracking-wide text-white border border-white/60 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </Link>
          </FadeUp>

          {/* Core Lending Areas card */}
          <FadeUp delay={120} className="bg-cream-warm rounded-[16px] p-10 lg:p-18 flex flex-col hover-lift">
            <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-6">Core Lending Areas</h3>
            <ul className="space-y-4 mb-6 flex-1">
              {data?.coreLendingAreas && data.coreLendingAreas.length > 0 ? (
                data.coreLendingAreas.map((area) => (
                  <li key={area.title} className="flex gap-3">
                    <span className="text-ink mt-[5px] shrink-0 text-[10px]">▪</span>
                    <div className="font-nav text-ink text-[16px] leading-[1.3]">
                      <span className="font-sans font-bold">{area.title}</span>
                      {area.body && Array.isArray(area.body) && area.body.length > 0 ? (
                        <BodyText value={area.body} scheme="light" />
                      ) : (
                        typeof area.body === 'string' && area.body ? `: ${area.body}` : ''
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex gap-3">
                    <span className="text-ink mt-[5px] shrink-0 text-[10px]">▪</span>
                    <p className="font-nav text-ink text-[16px] leading-[1.3]">
                      <span className="font-sans font-bold">Acquisition Finance &amp; MBOs:</span> Funding for strategic acquisitions, management buyouts, or private equity-backed transactions where speed and certainty are paramount.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-ink mt-[5px] shrink-0 text-[10px]">▪</span>
                    <p className="font-nav text-ink text-[16px] leading-[1.3]">
                      <span className="font-sans font-bold">Expansion &amp; Growth Capital:</span> Providing the non-dilutive capital needed to fund new facilities, market entry or product development without giving up equity.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-ink mt-[5px] shrink-0 text-[10px]">▪</span>
                    <p className="font-nav text-ink text-[16px] leading-[1.3]">
                      <span className="font-sans font-bold">Shareholder Transactions:</span> Facilitating partner buyouts, family successions, or special dividends to unlock shareholder value.
                    </p>
                  </li>
                </>
              )}
            </ul>
            {!data?.coreLendingAreas?.length && (
              <p className="font-nav text-ink text-[16px] leading-[1.3] mb-8">
                Refinancing &amp; Recapitalisation: Replacing restrictive bank facilities with flexible terms that match your operational cash flow and seasonal cycles.
              </p>
            )}
            <Link
              href="/contact"
              className="self-start font-sans font-bold uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
            >
              Get in Touch
            </Link>
          </FadeUp>

          <FadeUp delay={240} className="bg-dark rounded-[16px] p-8 lg:p-18 lg:col-span-2">
            <h2 className="font-serif font-light text-white text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-12">
              {data?.riskFramework?.heading ?? 'Risk Management Framework'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-8">
                {riskFramework.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-sans text-white text-[22px] leading-[1.2] mb-2">{item.title}</h3>
                    {item.body && Array.isArray(item.body) && item.body.length > 0 ? (
                      <BodyText value={item.body} scheme="dark" />
                    ) : (
                      <p className="font-nav text-white/80 text-[16px] leading-[1.3]">{typeof item.body === 'string' ? item.body : ''}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="relative aspect-[3/2] rounded-[12px] overflow-hidden bg-ink/40">
                <Image src={riskFrameworkImageSrc} alt="Risk management" fill className="object-cover" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <CtaBanner
        heading={data?.ctaBanner?.heading ?? 'Ready to access flexible funding that grows with your business?'}
        ctaLabel={data?.ctaBanner?.ctaLabel ?? 'Get started'}
        ctaHref={data?.ctaBanner?.ctaHref ?? '/contact'}
        background="dark"
      />

      {/* Quote banner */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={quoteBannerImageSrc} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark/70" />
        </div>
        <blockquote className="relative z-10 font-sans text-cream text-[clamp(34px,3.5vw,46px)] tracking-tight leading-[1.05] text-center max-w-[794px] px-8">
          {data?.quoteBanner?.quote ?? "Growth isn't found in cookie-cutter solutions. It's crafted through partnerships that understand your business reality."}
        </blockquote>
      </section>

      <Footer />
    </main>
  );
}
