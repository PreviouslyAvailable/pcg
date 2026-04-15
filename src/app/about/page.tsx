import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import BodyText from '@/components/BodyText';
import Navbar from '@/components/NavbarServer';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { aboutPageQuery } from '@/sanity/queries';
import type { AboutPage, TeamMember } from '@/sanity/types';
import FadeUp from '@/components/FadeUp';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About',
};

const fallbackExecutiveTeam = [
  { _id: '1', name: 'Andrew Golding', role: 'Chair', image: undefined },
  { _id: '2', name: 'Paul Carman', role: 'Founder & Managing Partner', image: undefined },
  { _id: '3', name: 'John Ferrara', role: 'Co-Founder & Partner', image: undefined },
];

const fallbackBoardMembers = [
  { _id: '4', name: 'Andrew Golding', role: 'Chair', image: undefined },
  { _id: '5', name: 'Paul Carman', role: 'Founder & Managing Partner', image: undefined },
  { _id: '6', name: 'John Ferrara', role: 'Co-Founder & Partner', image: undefined },
];

function LinkedInIcon({ href }: { href?: string }) {
  return (
    <a
      href={href ?? 'https://linkedin.com'}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-ink flex items-center justify-center hover:bg-ink/80 transition-colors"
      aria-label="Follow us on LinkedIn"
    >
      <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_66_24)">
          <path d="M28.2073 26.7297H28.2111V21.2148C28.2111 18.5173 27.6303 16.4395 24.4767 16.4395C22.9609 16.4395 21.9434 17.2714 21.5282 18.0601H21.4841V16.6911H18.4941V26.7297H21.6069V21.7587C21.6069 20.4499 21.8547 19.1845 23.4754 19.1845C25.0723 19.1845 25.0961 20.6781 25.0961 21.8427V26.7297H28.2073Z" fill="white" />
          <path d="M13.6128 16.6914H16.7299V26.7291H13.6128V16.6914Z" fill="white" />
          <path d="M15.1701 11.6943C14.6914 11.6945 14.2322 11.8848 13.8937 12.2233C13.5552 12.5618 13.3649 13.0209 13.3647 13.4997C13.3647 14.4964 14.1735 15.3221 15.1701 15.3221C16.1668 15.3221 16.9767 14.4964 16.9767 13.4997C16.9762 13.0208 16.7857 12.5617 16.447 12.2232C16.1082 11.8847 15.649 11.6945 15.1701 11.6943Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_66_24">
            <rect width="15.0351" height="15.0351" fill="white" transform="translate(13.3647 11.6943)" />
          </clipPath>
        </defs>
      </svg>
    </a>
  );
}

function TeamCard({ name, role, image, linkedIn }: TeamMember & { image?: TeamMember['image'] | null }) {
  const imgSrc = image?.asset?.url
    ? urlFor(image).width(480).height(640).url()
    : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden bg-cream-warm">
        {imgSrc && <Image src={imgSrc} alt={image?.alt ?? name} fill className="object-cover object-top" />}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-sans text-ink text-[22px] leading-tight mb-0.5">{name}</p>
          <p className="font-sans text-[14px] uppercase tracking-[0.33px] text-ink/80 mt-0.5">{role}</p>
        </div>
        <LinkedInIcon href={linkedIn} />
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const data = await client.fetch<AboutPage>(aboutPageQuery).catch(() => null);

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(800).url()
    : '/images/how-3.jpg';

  const storyImageSrc = data?.story?.image?.asset?.url
    ? urlFor(data.story.image).width(800).height(600).url()
    : '/images/how-4.jpg';

  const quoteBannerImageSrc = data?.quoteBanner?.image?.asset?.url
    ? urlFor(data.quoteBanner.image).width(1920).height(800).url()
    : '/images/how-2.jpg';

  const executiveTeam = (data?.executiveTeam && data.executiveTeam.length > 0)
    ? data.executiveTeam
    : fallbackExecutiveTeam;

  const boardMembers = (data?.boardOfDirectors && data.boardOfDirectors.length > 0)
    ? data.boardOfDirectors
    : fallbackBoardMembers;

  const featureCards = (data?.featureCards && data.featureCards.length > 0)
    ? data.featureCards
    : [
        { title: 'Stability through every cycle', body: "There's no substitute for having operated private debt funds through economic recessions, financial crises, and high growth periods. Each creates unique challenges, especially for the uninitiated. Our experience across multiple market cycles in global markets gives us the competence to navigate any environment.", ctaLabel: 'Explore Growth Capital', ctaHref: '/borrowers' },
        { title: 'Aligned Partnership', body: "Unlike competitors, we focus exclusively on fund management. No advisory, no mixed equity within the same fund. This ring-fencing ensures our interests are always aligned with yours.", ctaLabel: 'About our Funds', ctaHref: '/investors' },
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
          <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-cream-warm">
            <Image src={storyImageSrc} alt={data?.story?.image?.alt ?? 'Our story'} fill className="object-cover object-top" />
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
                    We bring over 20 years of global private credit experience to address the funding gap left by banks. Founded in 2015 by Paul Carman and John Ferrara after successfully operating private debt funds in the UK under Maples Bank, PCG has grown from $5M to $500M assets under management by solving problems traditional lenders couldn&apos;t.
                  </p>
                  <p>
                    As New Zealand&apos;s largest and most active private credit lender, we connect opportunities across Auckland and Queenstown while maintaining the relationship-driven approach that sets us apart from both banks and institutional finance.
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
        heading={data?.quoteBanner?.quote ?? "Infrastructure investment isn't about ticking boxes. It's about building the foundation for sustainable competitive advantage."}
        ctaLabel="Get started"
        ctaHref="/contact"
        background="image"
        imageSrc={quoteBannerImageSrc}
      />

      {/* Executive Team */}
      <section id="team" className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <h2 className="font-sans text-ink text-[26px] leading-[1.03] tracking-[-0.012em] mb-5">Executive Team</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {executiveTeam.map((m) => (
              <TeamCard key={m._id} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <h2 className="font-sans text-ink text-[26px] leading-[1.03] tracking-[-0.012em] mb-5">Board of Directors</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {boardMembers.map((m) => (
              <TeamCard key={m._id} {...m} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
