import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import BodyText from '@/components/BodyText';
import Navbar from '@/components/NavbarServer';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/FooterServer';
import TeamCard from '@/components/TeamCard';
import { getAboutPage, getExecutiveTeam } from '@/sanity/loaders';
import { urlFor } from '@/sanity/image';
import FadeUp from '@/components/FadeUp';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();
  return { title: data?.pageTitle ?? 'About' };
}

const fallbackExecutiveTeam = [
  { _id: '1', name: 'Andrew Golding', role: 'Chair', image: undefined },
  { _id: '2', name: 'Paul Carman', role: 'Founder & Managing Partner', image: undefined },
  { _id: '3', name: 'John Ferrara', role: 'Co-Founder & Partner', image: undefined },
];

export default async function AboutPage() {
  const [data, allExecutives] = await Promise.all([
    getAboutPage(),
    getExecutiveTeam(),
  ]);

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(820).fit('crop').auto('format').url()
    : '/images/how-3.jpg';

  const storyImageSrc = data?.story?.image?.asset?.url
    ? urlFor(data.story.image).width(960).fit('max').auto('format').url()
    : '/images/how-4.jpg';

  const quoteBannerImageSrc = data?.quoteBanner?.image?.asset?.url
    ? urlFor(data.quoteBanner.image).width(1920).height(800).url()
    : '/images/how-2.jpg';

  const executiveTeam =
    data?.executiveTeam && data.executiveTeam.length > 0
      ? data.executiveTeam
      : allExecutives && allExecutives.length > 0
        ? allExecutives
        : fallbackExecutiveTeam;

  const featureCards = (data?.featureCards && data.featureCards.length > 0)
    ? data.featureCards
    : [
        { title: 'Stability through every cycle', body: "There's no substitute for having operated private debt funds through economic recessions, financial crises, and high growth periods. Each creates unique challenges, especially for the uninitiated. Our experience across multiple market cycles in global markets gives us the competence to navigate any environment.", ctaLabel: 'Explore Growth Capital', ctaHref: '/borrowers' },
        { title: 'Aligned Partnership', body: "Conflict-Free by Design Many capital providers also run advisory businesses or mix equity alongside debt in the same fund. We don't. Our exclusive focus on funds management eliminates those conflicts, so every decision we make is driven by one thing: what's right for you.", ctaLabel: 'About our Funds', ctaHref: '/investors' },
        { title: 'Market-Leading Diversification', body: "PCG offers a level of diversification and risk management that is unique in the New Zealand market. This scale allows us to provide genuine downside protection for investors while offering borrowers the stability of an institutional-grade platform.", ctaLabel: 'About our Funds', ctaHref: '/investors' },
      ];

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      <PageHero
        heading={data?.hero?.heading ?? "New Zealand's Most Experienced Private Debt Lender"}
        subtext={data?.hero?.subtext ?? 'Drawing from proven global experience to deliver tailored capital solutions & a relationship-driven approach for New Zealand businesses.'}
        imageSrc={heroImageSrc}
        imageAlt={data?.hero?.image?.alt ?? data?.hero?.imageAlt ?? 'PCG team'}
      />

      {/* Our Story */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="rounded-[16px] overflow-hidden">
            <Image
              src={storyImageSrc}
              alt={data?.story?.image?.alt ?? 'Our story'}
              width={960}
              height={640}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
          <div className="pt-[40px]">
            <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,50px)] leading-[1.03] tracking-[-0.012em] mb-6">
              {data?.story?.heading ?? 'Our Story'}
            </h2>
            <div className="space-y-4 font-nav text-ink text-[16px] leading-[1.4] mb-8">
              {data?.story?.body && data.story.body.length > 0 ? (
                <PortableText value={data.story.body} />
              ) : (
                <>
                  <p>
                    Recognising that New Zealand&apos;s ambitious businesses were underserved by traditional banks, we established PCG to bring the flexibility of global private debt to the local market.
                  </p>
                  <p>
                    We bring over 20 years of global private credit experience to address the funding gap left by banks. Founded in 2015 by Paul Carman and John Ferrara after successfully operating private debt funds in the UK under Mizuho Bank, PCG has grown from $5M to $500M assets under management by solving problems traditional lenders couldn&apos;t.
                  </p>
                  <p>
                    As New Zealand’s most active private credit lender, we originate opportunities across New Zealand from our Auckland and Queenstown offices. Maintaining a relationship-driven approach with our borrower and investor bases.
                  </p>
                </>
              )}
            </div>
            <Link
              href={data?.story?.ctaHref ?? '/about#team'}
              className="inline-flex items-center font-sans text-[14px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
            >
              {data?.story?.ctaLabel ?? 'Meet the Team'}
            </Link>
          </div>
        </div>
      </section>

      {/* Three feature cards */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featureCards.map((card, i) => (
            <FadeUp key={card.title} delay={i * 120} className="gap-4 bg-white rounded-[16px] p-9 flex flex-col justify-start items-start hover-lift">
              <h3 className="font-sans text-ink text-[26px] leading-[1.2]">{card.title}</h3>
              {card.body && Array.isArray(card.body) && card.body.length > 0 ? (
                <BodyText value={card.body} scheme="light" className="flex-1" />
              ) : (
                <p className="font-nav text-ink text-[16px] leading-[1.3] flex-1">{typeof card.body === 'string' ? card.body : ''}</p>
              )}
              <Link
                href={card.ctaHref ?? '/borrowers'}
                className="self-start font-sans text-[14px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
              >
                {card.ctaLabel ?? 'Learn more'}
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Quote banner */}
      <CtaBanner
        heading={data?.quoteBanner?.quote ?? "Infrastructure investment is about enabling businesses to build the foundations necessary to facilitate deeper New Zealand economic resilience."}
        ctaLabel="Get started"
        ctaHref="/contact"
        background="image"
        imageSrc={quoteBannerImageSrc}
      />

      {/* Executive Team */}
      <section id="team" className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <h2 className="font-sans text-ink text-[26px] leading-[1.03] tracking-[-0.012em] mb-5">Private Capital Group Team</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {executiveTeam.map((m) => {
              const cardImgSrc = m.image?.asset?.url
                ? urlFor(m.image).width(480).height(640).url()
                : null;
              const modalImgSrc = m.image?.asset?.url
                ? urlFor(m.image).width(800).height(1067).url()
                : null;

              return (
                <TeamCard
                  key={m._id}
                  {...m}
                  cardImgSrc={cardImgSrc}
                  modalImgSrc={modalImgSrc}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Board of Directors 
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <h2 className="font-sans text-ink text-[26px] leading-[1.03] tracking-[-0.012em] mb-5">Board of Directors</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {boardMembers.map((m) => (
              <TeamCard key={m._id} {...m} />
            ))}
          </div>
        </div>
      </section>*/}

      <Footer />
    </main>
  );
}
