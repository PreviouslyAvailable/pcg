import type { Metadata } from 'next';
import Image from 'next/image';
import SiteChrome from '@/components/SiteChrome';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import QuoteBanner from '@/components/QuoteBanner';
import CmsBody from '@/components/CmsBody';
import OutlineButton from '@/components/OutlineButton';
import { getBorrowersPage } from '@/sanity/loaders';
import { quoteBannerUrl } from '@/sanity/imageUrls';
import { urlFor } from '@/sanity/image';
import { IMAGE_SIZES } from '@/lib/imageSizes';
import { buildMetadata } from '@/lib/seo';
import {
  BORROWERS_WHY_PCG,
  BORROWERS_LENDING_FOCUS,
  BORROWERS_HOW_WE_WORK,
} from '@/lib/fallbacks';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getBorrowersPage();
  return buildMetadata({
    seo: data?.seo,
    title: data?.pageTitle ?? 'Borrowers',
    image: data?.hero?.image,
    path: '/borrowers',
  });
}

export default async function BorrowersPage() {
  const data = await getBorrowersPage();

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(800).url()
    : '/images/borrowers.jpg';

  const quoteBannerImageSrc = quoteBannerUrl(data?.quoteBanner?.image, '/images/how-3.jpg');

  const lendingFocusImageSrc = data?.lendingFocus?.image?.asset?.url
    ? urlFor(data.lendingFocus.image).width(800).height(600).url()
    : '/images/how-2.jpg';

  const whyPCG = (data?.whyPCG && data.whyPCG.length > 0) ? data.whyPCG : BORROWERS_WHY_PCG;
  const lendingFocus = (data?.lendingFocus?.items && data.lendingFocus.items.length > 0)
    ? data.lendingFocus.items
    : BORROWERS_LENDING_FOCUS;

  const howWeWork = (data?.howWeWork && data.howWeWork.length > 0)
    ? data.howWeWork.map((item, i) => ({
        step: item.step ?? BORROWERS_HOW_WE_WORK[i]?.step ?? `${i + 1}.`,
        title: item.title ?? BORROWERS_HOW_WE_WORK[i]?.title ?? '',
        body: item.body ?? BORROWERS_HOW_WE_WORK[i]?.body ?? '',
        image: item.image?.asset?.url
          ? urlFor(item.image).width(960).height(720).url()
          : (BORROWERS_HOW_WE_WORK[i]?.image ?? '/images/how-1.jpg'),
        imageLeft: item.imageLeft ?? BORROWERS_HOW_WE_WORK[i]?.imageLeft ?? false,
        cta: item.cta?.label ? { label: item.cta.label, href: item.cta.href ?? '/contact' } : BORROWERS_HOW_WE_WORK[i]?.cta,
      }))
    : BORROWERS_HOW_WE_WORK;

  return (
    <SiteChrome>
      <main className="bg-cream">
      <PageHero
        heading={data?.hero?.heading ?? 'Capital Built for Speed and Flexibility'}
        subtext={data?.hero?.subtext ?? 'We provide financing solutions designed to help you scale, acquire, or recapitalise. Partner with a local team that has the authority and expertise to say yes.'}
        imageSrc={heroImageSrc}
        imageAlt={data?.hero?.image?.alt ?? 'Capital solutions in action'}
        imageCaption={data?.hero?.image?.caption ?? 'Rainbow Quarry'}
      />

      {/* Why choose PCG */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-12">
            Why choose PCG?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
            {whyPCG.map((item) => (
              <div key={item.title}>
                <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-4">{item.title}</h3>
                <CmsBody
                  value={item.body}
                  className="pr-10"
                  fallbackClassName="font-nav text-ink/80 text-[16px] leading-[1.5] pr-10"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our lending focus */}
      <section className="py-[calc(var(--spacing)*18)] bg-white">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-10">
              {data?.lendingFocus?.heading ?? 'Our lending focus'}
            </h2>
            <div className="space-y-5">
              {lendingFocus.map((item) => (
                <div key={item.title}>
                  <h3 className="font-sans text-ink text-[26px] leading-[1.3] mb-1">{item.title}</h3>
                  <CmsBody
                    value={item.body}
                    fallbackClassName="font-nav text-ink/70 text-[16px] leading-[1.4]"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-cream-warm">
            <Image src={lendingFocusImageSrc} alt="Lending focus" fill sizes={IMAGE_SIZES.halfViewport} className="object-cover" />
          </div>
        </div>
      </section>

      <QuoteBanner
        quote={data?.quoteBanner?.quote ?? 'Success demands more than traditional lending. It requires partners who see beyond the balance sheet to your business potential.'}
        imageSrc={quoteBannerImageSrc}
        quoteClassName="max-w-[794px] px-4 font-serif font-light text-[clamp(36px,3.75vw,54px)] leading-[1.05] tracking-[-0.012em] text-center text-cream"
      />

      {/* How we work */}
      <section>
        <div className="flex flex-col">
          {howWeWork.map((item, i) => (
            <div key={item.step} className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-cream-warm ${item.imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                <Image src={item.image} alt={item.title} fill sizes={IMAGE_SIZES.halfViewport} className="object-cover" />
              </div>

              {/* Text */}
              <div className={`flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-16 ${item.imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                {i === 0 && (
                  <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-6">
                    How we work
                  </h2>
                )}
                <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-4">{item.step} {item.title}</h3>
                <CmsBody
                  value={item.body}
                  className="max-w-[480px]"
                  fallbackClassName="font-nav text-ink/70 text-[16px] leading-[1.5] max-w-[480px]"
                />
                {item.cta && (
                  <OutlineButton href={item.cta.href ?? '/contact'} className="self-start mt-8 font-bold text-[16px]">
                    {item.cta.label}
                  </OutlineButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        heading={data?.ctaBanner?.heading ?? 'Ready to access flexible funding that grows with your business?'}
        ctaLabel={data?.ctaBanner?.ctaLabel ?? 'Get started'}
        ctaHref={data?.ctaBanner?.ctaHref ?? '/contact'}
        background="teal"
      />

      </main>
    </SiteChrome>
  );
}
