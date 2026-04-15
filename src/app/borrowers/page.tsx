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
import { borrowersPageQuery } from '@/sanity/queries';
import type { BorrowersPage } from '@/sanity/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Borrowers',
};

const fallbackWhyPCG = [
  { title: 'Bespoke Capital Structures', body: "We tailor loans around your business, not a rigid credit policy. Whether it's interest-only periods to preserve cash flow or seasonal repayment schedules that match your revenue, we have the flexibility to design financing that actually fits your operational reality." },
  { title: 'Direct Access to Decision Makers', body: "We eliminate the bureaucracy of traditional lending. All credit decisions are made locally by the partners you meet face-to-face. This flat structure ensures rapid feedback and the certainty of execution required to close complex deals on tight timelines." },
  { title: 'Long-Term Growth Partnership', body: "We spend time face-to-face understanding your business. We're building partnerships that support you through different phases of your business lifecycle, not transactional lending." },
  { title: 'Proven Track Record', body: "With $500M in committed capital and over 70 successful transactions, we represent one of the largest and most diversified private credit platforms in New Zealand. Our track record provides you with the confidence that we have the scale to support your business and the experience to navigate complex deal structures." },
];

const fallbackLendingFocus = [
  { title: 'Growth & Expansion', body: 'Funding new equipment, facilities, or market entry without equity dilution.' },
  { title: 'Strategic Acquisitions', body: 'Enabling you to move fast to complete acquisitions with debt-funded structures.' },
  { title: 'Shareholder Liquidity', body: 'Facilitating partner buyouts or special dividends while maintaining company control.' },
  { title: 'Operational Flexibility', body: 'Refinancing restrictive bank debt with terms that match your actual cash flow cycles.' },
];

const fallbackHowWeWork = [
  { step: '1.', title: 'Deep Discovery & Rapid Feedback', body: "We start with a deep dive into your business operations, cash flows, growth plans, and challenges. Our senior team engages directly from day one to provide rapid, detailed feedback on your funding requirements.", image: '/images/how-1.jpg', imageLeft: false, cta: undefined },
  { step: '2.', title: 'Structuring', body: "Using our experience across hundreds of deals globally, we design financing that fits your specific needs. We look beyond generic templates to create flexible terms and repayment schedules that allow you to focus on business execution.", image: '/images/how-2.jpg', imageLeft: true, cta: undefined },
  { step: '3.', title: 'Partnership', body: "We remain active, engaged partners throughout the life of the loan, providing the follow-on capital and strategic support needed as your business scales. As one of New Zealand's largest private credit partners, we have the resources to support you through your entire business lifecycle.", image: '/images/how-4.jpg', imageLeft: false, cta: { label: 'Meet the Team', href: '/about#team' } },
];

export default async function BorrowersPage() {
  const data = await client.fetch<BorrowersPage>(borrowersPageQuery).catch(() => null);

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(800).url()
    : '/images/borrowers.jpg';

  const quoteBannerImageSrc = data?.quoteBanner?.image?.asset?.url
    ? urlFor(data.quoteBanner.image).width(1920).height(800).url()
    : '/images/how-3.jpg';

  const lendingFocusImageSrc = data?.lendingFocus?.image?.asset?.url
    ? urlFor(data.lendingFocus.image).width(800).height(600).url()
    : '/images/how-2.jpg';

  const whyPCG = (data?.whyPCG && data.whyPCG.length > 0) ? data.whyPCG : fallbackWhyPCG;
  const lendingFocus = (data?.lendingFocus?.items && data.lendingFocus.items.length > 0)
    ? data.lendingFocus.items
    : fallbackLendingFocus;

  const howWeWork = (data?.howWeWork && data.howWeWork.length > 0)
    ? data.howWeWork.map((item, i) => ({
        step: item.step ?? fallbackHowWeWork[i]?.step ?? `${i + 1}.`,
        title: item.title ?? fallbackHowWeWork[i]?.title ?? '',
        body: item.body ?? fallbackHowWeWork[i]?.body ?? '',
        image: item.image?.asset?.url
          ? urlFor(item.image).width(960).height(720).url()
          : (fallbackHowWeWork[i]?.image ?? '/images/how-1.jpg'),
        imageLeft: item.imageLeft ?? fallbackHowWeWork[i]?.imageLeft ?? false,
        cta: item.cta?.label ? { label: item.cta.label, href: item.cta.href ?? '/contact' } : fallbackHowWeWork[i]?.cta,
      }))
    : fallbackHowWeWork;

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      <PageHero
        heading={data?.hero?.heading ?? 'Capital Built for Speed and Flexibility'}
        subtext={data?.hero?.subtext ?? 'We provide financing solutions designed to help you scale, acquire, or refinance. Partner with a local team that has the authority and expertise to say yes.'}
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
                {item.body && Array.isArray(item.body) && item.body.length > 0 ? (
                  <BodyText value={item.body} scheme="light" className="pr-10" />
                ) : (
                  <p className="font-nav text-ink/80 text-[16px] leading-[1.5] pr-10">{typeof item.body === 'string' ? item.body : ''}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading={data?.ctaBanner?.heading ?? 'Ready to access flexible funding that grows with your business?'}
        ctaLabel={data?.ctaBanner?.ctaLabel ?? 'Get started'}
        ctaHref={data?.ctaBanner?.ctaHref ?? '/contact'}
        background="teal"
      />

      {/* Quote banner */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={quoteBannerImageSrc} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-dark/60" />
        </div>
        <blockquote className="relative z-10 max-w-[794px] px-4 font-serif font-light text-[clamp(36px,3.75vw,54px)] leading-[1.05] tracking-[-0.012em] text-center text-cream">
          {data?.quoteBanner?.quote ?? 'Success demands more than traditional lending. It requires partners who see beyond the balance sheet to your business potential.'}
        </blockquote>
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
                  {item.body && Array.isArray(item.body) && item.body.length > 0 ? (
                    <BodyText value={item.body} scheme="light" />
                  ) : (
                    <p className="font-nav text-ink/70 text-[16px] leading-[1.4]">{typeof item.body === 'string' ? item.body : ''}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-cream-warm">
            <Image src={lendingFocusImageSrc} alt="Lending focus" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* How we work */}
      <section>
        <div className="flex flex-col">
          {howWeWork.map((item, i) => (
            <div key={item.step} className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-cream-warm ${item.imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>

              {/* Text */}
              <div className={`flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-16 ${item.imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                {i === 0 && (
                  <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-6">
                    How we work
                  </h2>
                )}
                <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-4">{item.step} {item.title}</h3>
                {item.body && Array.isArray(item.body) && item.body.length > 0 ? (
                  <BodyText value={item.body} scheme="light" className="max-w-[480px]" />
                ) : (
                  <p className="font-nav text-ink/70 text-[16px] leading-[1.5] max-w-[480px]">{typeof item.body === 'string' ? item.body : ''}</p>
                )}
                {item.cta && (
                  <Link
                    href={item.cta.href}
                    className="self-start mt-8 font-sans font-bold text-[16px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
                  >
                    {item.cta.label}
                  </Link>
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

      <Footer />
    </main>
  );
}
