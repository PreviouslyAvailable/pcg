import type { Metadata } from 'next';
import Link from 'next/link';
import SiteChrome from '@/components/SiteChrome';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import QuoteBanner from '@/components/QuoteBanner';
import CmsBody from '@/components/CmsBody';
import OutlineButton from '@/components/OutlineButton';
import { getInvestorsPage } from '@/sanity/loaders';
import { quoteBannerUrl } from '@/sanity/imageUrls';
import { urlFor } from '@/sanity/image';
import { buildMetadata } from '@/lib/seo';
import {
  INVESTORS_FUND_DETAILS,
  INVESTORS_INVESTMENT_OPPORTUNITY,
  INVESTORS_ACTIVE_INVESTOR_PLUS,
  INVESTORS_SECOND_FUND_DETAILS,
} from '@/lib/fallbacks';
import FadeUp from '@/components/FadeUp';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInvestorsPage();
  return buildMetadata({
    seo: data?.seo,
    title: data?.pageTitle ?? 'Investors',
    image: data?.hero?.image,
    path: '/investors',
  });
}

export default async function InvestorsPage() {
  const data = await getInvestorsPage();

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(800).auto('format').url()
    : '/images/investors-right.jpg';

  const quoteBannerImageSrc = quoteBannerUrl(data?.quoteBanner?.image, '/images/how-4.jpg');

  const investmentItems = (data?.investmentOpportunity?.items && data.investmentOpportunity.items.length > 0)
    ? data.investmentOpportunity.items
    : INVESTORS_INVESTMENT_OPPORTUNITY;

  const fundDetails = (data?.fundDetails && data.fundDetails.length > 0)
    ? data.fundDetails
    : INVESTORS_FUND_DETAILS;

  const secondFundDetails = (data?.secondFundDetails && data.secondFundDetails.length > 0)
    ? data.secondFundDetails
    : INVESTORS_SECOND_FUND_DETAILS;

  const activeInvestorItems = (data?.activeInvestorPlus?.items && data.activeInvestorPlus.items.length > 0)
    ? data.activeInvestorPlus.items
    : INVESTORS_ACTIVE_INVESTOR_PLUS;

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
                <CmsBody
                  value={item.body}
                  className="pr-5"
                  fallbackClassName="font-nav text-ink/80 text-[16px] leading-[1.3] pr-5"
                />
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
                {data?.firstFundName ?? 'PCG Diversified New Zealand Private Debt Fund (NZPDF)'}
              </h3>
              <div className="flex-1 divide-y divide-black/10 mb-8">
                {fundDetails.map((row) => (
                  <div key={row.label} className="flex gap-6 py-3">
                    <p className="font-nav text-ink text-[16px] leading-[1.4] w-[140px] shrink-0 pt-0.5">{row.label}:</p>
                    <p className="font-nav text-ink text-[16px] leading-[1.4]">{row.value}</p>
                  </div>
                ))}
              </div>
              <OutlineButton href="/contact" className="self-start text-[14px]">
                Get in Touch
              </OutlineButton>
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
                className="self-start font-sans text-[14px] uppercase tracking-wide text-white border border-white/40 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
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
                    <CmsBody
                      value={item.body}
                      scheme="dark"
                      className="pr-10"
                      fallbackClassName="font-nav text-white/80 text-[16px] leading-[1.3] pr-10"
                    />
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
