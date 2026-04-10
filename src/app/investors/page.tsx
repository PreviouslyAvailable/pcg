import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { investorsPageQuery } from '@/sanity/queries';
import type { InvestorsPage } from '@/sanity/types';
import FadeUp from '@/components/FadeUp';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Investors',
};

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
  { title: 'Defensive Yield with Inflation Protection', body: "Our fund targets a net return of OCR + 4% through a portfolio of 100% floating-rate assets. This structure provides a natural hedge against inflation and interest rate volatility, ensuring your yield adjusts in real-time to market conditions. Our team's 20-year global track record ensures this performance remains resilient through every phase of the economic cycle." },
  { title: 'Granular Exposure to the NZ Middle Market', body: 'Investors gain immediate access to a granular portfolio of 20+ high-quality New Zealand businesses across defensive sectors. This level of diversification—spanning multiple industries and deal structures—is unique in the New Zealand market and significantly reduces idiosyncratic risk compared to concentrated credit offerings.' },
  { title: 'Capital Preservation via Structural Protection', body: 'We prioritize capital preservation by focusing on senior secured (first lien) positions with conservative loan-to-value (LTV) ratios. Every investment undergoes rigorous diligence with each deal specifically structured to include multiple exit paths and robust covenant protections to safeguard investor capital in all scenarios.' },
];

const fallbackActiveInvestorPlus = [
  { title: 'NZTE Acceptable Managed Fund Status', body: 'Direct Pathway to Residency: The PCG Diversified NZ Private Debt Fund is a fully compliant NZTE Acceptable Managed Fund. This status provides offshore investors with a clear pre-vetted pathway to New Zealand residency while deploying capital into high quality, senior secured private credit.' },
  { title: 'Proven Track Record', body: 'The Programme Benchmark: We are proud to represent the longest-running credit fund on the AIP programme. Our established history provides the transparency and reporting rigour necessary to satisfy immigration requirements and deliver successful residency outcomes.' },
  { title: 'Global Tax Readiness', body: 'We recognise the complexities of cross-border investment for investors with US tax obligations. PCG provides the specific PFIC Annual Information Statements required to optimize your US tax position. We work alongside your global tax and legal advisors to ensure your investment remains compliant across multiple jurisdictions.' },
];

export default async function InvestorsPage() {
  const data = await client.fetch<InvestorsPage>(investorsPageQuery).catch(() => null);

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(800).url()
    : '/images/investors-right.jpg';

  const quoteBannerImageSrc = data?.quoteBanner?.image?.asset?.url
    ? urlFor(data.quoteBanner.image).width(1920).height(800).url()
    : '/images/how-4.jpg';

  const investmentItems = (data?.investmentOpportunity?.items && data.investmentOpportunity.items.length > 0)
    ? data.investmentOpportunity.items
    : fallbackInvestmentOpportunity;

  const fundDetails = (data?.fundDetails && data.fundDetails.length > 0)
    ? data.fundDetails
    : fallbackFundDetails;

  const secondFundDetails = (data?.secondFundDetails && data.secondFundDetails.length > 0)
    ? data.secondFundDetails
    : fallbackFundDetails;

  const activeInvestorItems = (data?.activeInvestorPlus?.items && data.activeInvestorPlus.items.length > 0)
    ? data.activeInvestorPlus.items
    : fallbackActiveInvestorPlus;

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      <PageHero
        heading={data?.hero?.heading ?? 'Resilient Yield in New Zealand Dollars'}
        subtext={data?.hero?.subtext ?? 'We combine a 20-year global track record with a primary focus on capital preservation and consistent monthly income'}
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
                <p className="font-nav text-ink/80 text-[16px] leading-[1.3] pr-5">{item.body}</p>
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
                {data?.secondFundName ?? 'Another fund'}
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
                    <p className="font-nav text-white/80 text-[16px] leading-[1.3] pr-10">{item.body}</p>
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
          {data?.quoteBanner?.quote ?? 'Portfolio diversification is secured through direct investment in essential business infrastructure that generates consistent returns.'}
        </blockquote>
      </section>

      <Footer />
    </main>
  );
}
