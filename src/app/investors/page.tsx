import type { Metadata } from 'next';
import Link from 'next/link';
import SiteChrome from '@/components/SiteChrome';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import QuoteBanner from '@/components/QuoteBanner';
import BodyText from '@/components/BodyText';
import { getInvestorsPage } from '@/sanity/loaders';
import { quoteBannerUrl } from '@/sanity/imageUrls';
import { urlFor } from '@/sanity/image';
import FadeUp from '@/components/FadeUp';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInvestorsPage();
  return { title: data?.pageTitle ?? 'Investors' };
}

const fallbackFundDetails = [
  { label: 'Fund Structure', value: 'PIE (Portfolio Investment Entity) - tax-efficient for New Zealand investors' },
  { label: 'Target Return', value: 'OCR + 4% (net of fees)' },
  { label: 'Distributions', value: 'Monthly income distributions' },
  { label: 'Management Fee', value: '0.75% per annum' },
  { label: 'Minimum Investment', value: '$250,000' },
  { label: 'Currency', value: 'New Zealand Dollars' },
  { label: 'Valuation', value: 'Weekly' },
  { label: 'Trustee', value: 'Public Trust' },
  { label: 'Administrator', value: 'Adminis' },
  { label: 'Auditor', value: 'EY' },
  { label: 'US Tax Compliance', value: 'PFIC Reporting Compliant. We provide PFIC Annual Information Statements (AIS) to support investors in making QEF elections for US tax reporting.' },
];

const fallbackInvestmentOpportunity = [
  { title: 'Defensive Yield with Inflation Protection', body: "Our funds targets a net return of OCR + 4% through a portfolio of 100% floating-rate assets. This structure provides a natural hedge against inflation and interest rate volatility, ensuring your yield adjusts in real-time to market conditions. Our team's 20-year global track record ensures this performance remains resilient through every phase of the economic cycle." },
  { title: 'Granular Exposure to the NZ Middle Market', body: 'Investors gain immediate access to a granular portfolio of high-quality New Zealand businesses across defensive sectors. This level of diversification—spanning multiple industries and deal structures—is unique in the New Zealand market and significantly reduces idiosyncratic risk compared to concentrated credit offerings.' },
  { title: 'Capital Preservation via Structural Protection', body: 'We prioritize capital preservation by focusing on senior secured (first lien) positions with conservative loan-to-value (LTV) ratios. Every investment undergoes rigorous diligence with each deal specifically structured to include multiple exit paths and robust covenant protections to safeguard investor capital in all scenarios.' },
];

const fallbackActiveInvestorPlus = [
  { title: 'NZTE Acceptable Managed Fund Status', body: 'Direct Pathway to Residency: The PCG Diversified NZ Private Debt Fund is a fully compliant NZTE Acceptable Managed Fund. This status provides offshore investors with a clear pre-vetted pathway to New Zealand residency while deploying capital into high quality, senior secured private credit.' },
  { title: 'Proven Track Record', body: 'The Programme Benchmark: We are proud to represent the longest-running credit fund on the AIP programme. Our established history provides the transparency and reporting rigour necessary to satisfy immigration requirements and deliver successful residency outcomes.' },
  { title: 'Global Tax Readiness', body: 'We recognise the complexities of cross-border investment for investors with US tax obligations. PCG provides the specific PFIC Annual Information Statements required to optimize your US tax position. We work alongside your global tax and legal advisors to ensure your investment remains compliant across multiple jurisdictions.' },
];

const fallbackSecondFundDetails = [
  { label: 'Fund Structure', value: 'PIE (Portfolio Investment Entity)' },
  { label: 'Focus', value: 'New Zealand economic resilience and infrastructure-aligned private debt' },
  { label: 'Currency', value: 'New Zealand Dollars' },
  { label: 'Minimum Investment', value: 'Contact us for details' },
];

export default async function InvestorsPage() {
  const data = await getInvestorsPage();

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(800).url()
    : '/images/investors-right.jpg';

  const quoteBannerImageSrc = quoteBannerUrl(data?.quoteBanner?.image, '/images/how-4.jpg');

  const investmentItems = (data?.investmentOpportunity?.items && data.investmentOpportunity.items.length > 0)
    ? data.investmentOpportunity.items
    : fallbackInvestmentOpportunity;

  const fundDetails = (data?.fundDetails && data.fundDetails.length > 0)
    ? data.fundDetails
    : fallbackFundDetails;

  const secondFundDetails = (data?.secondFundDetails && data.secondFundDetails.length > 0)
    ? data.secondFundDetails
    : fallbackSecondFundDetails;

  const activeInvestorItems = (data?.activeInvestorPlus?.items && data.activeInvestorPlus.items.length > 0)
    ? data.activeInvestorPlus.items
    : fallbackActiveInvestorPlus;

  return (
    <SiteChrome>
      <main className="bg-cream">
      <PageHero
        heading={data?.hero?.heading ?? 'Resilient Yield in New Zealand Dollars'}
        subtext={data?.hero?.subtext ?? 'We combine a 20-year global track record with a primary focus on capital preservation and delivering consistent monthly income'}
        imageSrc={heroImageSrc}
        imageAlt={data?.hero?.image?.alt ?? 'New Zealand landscape'}
      />

      {/* Investment opportunity */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-12">
            {data?.investmentOpportunity?.heading ?? 'Investment opportunity'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 mb-10">
            {investmentItems.map((item) => (
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

      {/* Fund Options + Active Investor Plus */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-4">FUND OPTIONS</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Cream fund card */}
            <FadeUp delay={0} className="bg-cream-warm rounded-[16px] p-10 lg:p-18 flex flex-col hover-lift">
              <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-8">
                PCG Diversified New Zealand Private Debt Fund (NZPDF)
              </h3>
              <div className="flex-1 divide-y divide-black/10 mb-8">
                {fundDetails.map((row) => (
                  <div key={row.label} className="flex gap-6 py-3">
                    <p className="font-nav text-ink text-[16px] leading-[1.4] w-[140px] shrink-0 pt-0.5">{row.label}:</p>
                    <p className="font-nav text-ink text-[16px] leading-[1.4]">{row.value}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="self-start font-sans text-[14px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
              >
                Get in Touch
              </Link>
            </FadeUp>

            {/* Dark fund card */}
            <FadeUp delay={120} className="bg-dark rounded-[16px] p-10 lg:p-14 flex flex-col hover-lift">
              <h3 className="font-sans text-white text-[26px] leading-[1.2] mb-8">
                {data?.secondFundName ?? 'PCG New Zealand Economic Resilience Fund (NZER)'}
              </h3>
              <div className="flex-1 divide-y divide-white/10 mb-8">
                {secondFundDetails.map((row) => (
                  <div key={row.label} className="flex gap-6 py-3">
                    <p className="font-nav text-white text-[16px] leading-[1.4] w-[140px] shrink-0 pt-0.5">{row.label}:</p>
                    <p className="font-nav text-white text-[16px] leading-[1.4]">{row.value}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="self-start font-sans font-bold text-[16px] uppercase tracking-wide text-white border border-white/40 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </FadeUp>

            {/* Active Investor Plus — spans both columns */}
            <FadeUp delay={240} className="bg-teal rounded-[16px] p-10 lg:p-18 lg:col-span-2">
              <h2 className="font-sans text-white text-[26px] leading-[1.2] mb-8">
                Active Investor Plus Programme
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
                {activeInvestorItems.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-sans text-white text-[22px] leading-[1.2] mb-3">{item.title}</h3>
                    {item.body && Array.isArray(item.body) && item.body.length > 0 ? (
                      <BodyText value={item.body} scheme="dark" className="pr-10" />
                    ) : (
                      <p className="font-nav text-white/80 text-[16px] leading-[1.3] pr-10">{typeof item.body === 'string' ? item.body : ''}</p>
                    )}
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-block font-sans text-[16px] uppercase tracking-wide text-white border border-white/40 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </FadeUp>

          </div>
        </div>
      </section>

      <CtaBanner
        heading={data?.ctaBanner?.heading ?? 'Ready to explore private credit investment opportunities?'}
        ctaLabel={data?.ctaBanner?.ctaLabel ?? 'Get started'}
        ctaHref={data?.ctaBanner?.ctaHref ?? '/contact'}
        background="dark"
      />

      <QuoteBanner
        quote={data?.quoteBanner?.quote ?? 'Portfolio diversification is secured through direct investment in essential business infrastructure that generates consistent returns.'}
        imageSrc={quoteBannerImageSrc}
        overlayClassName="bg-dark/70"
        minHeightClassName="min-h-[500px]"
        quoteClassName="font-sans text-cream text-[clamp(34px,3.5vw,46px)] tracking-tight leading-[1.05] text-center max-w-[794px] px-8"
      />

      </main>
    </SiteChrome>
  );
}
