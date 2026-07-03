import type { Metadata } from 'next';
import Image from 'next/image';
import BodyText from '@/components/BodyText';
import CmsBody from '@/components/CmsBody';
import OutlineButton from '@/components/OutlineButton';
import SiteChrome from '@/components/SiteChrome';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import TeamCard from '@/components/TeamCard';
import { getAboutPage, getBoardMembers, getExecutiveTeam } from '@/sanity/loaders';
import { quoteBannerUrl } from '@/sanity/imageUrls';
import { urlFor } from '@/sanity/image';
import { teamCardImageUrl, teamModalImageUrl } from '@/lib/teamImages';
import type { TeamMember } from '@/sanity/types';
import { buildMetadata } from '@/lib/seo';
import { ABOUT_FALLBACK_EXECUTIVE_TEAM, ABOUT_FALLBACK_FEATURE_CARDS } from '@/lib/fallbacks';
import FadeUp from '@/components/FadeUp';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();
  return buildMetadata({
    seo: data?.seo,
    title: data?.pageTitle ?? 'About',
    image: data?.hero?.image,
    path: '/about',
  });
}

function TeamMemberGrid({ members, columns = 3 }: { members: TeamMember[]; columns?: 3 | 4 }) {
  const columnsClass = columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  return (
    <div className={`grid grid-cols-2 ${columnsClass} gap-6 lg:gap-8`}>
      {members.map((m) => (
        <TeamCard
          key={m._id}
          {...m}
          cardImgSrc={teamCardImageUrl(m.image)}
          modalImgSrc={teamModalImageUrl(m.image)}
        />
      ))}
    </div>
  );
}

export default async function AboutPage() {
  const [data, allExecutives, allBoardMembers] = await Promise.all([
    getAboutPage(),
    getExecutiveTeam(),
    getBoardMembers(),
  ]);

  const heroImageSrc = data?.hero?.image?.asset?.url
    ? urlFor(data.hero.image).width(1200).height(820).fit('crop').auto('format').url()
    : '/images/how-3.jpg';

  const storyImageSrc = data?.story?.image?.asset?.url
    ? urlFor(data.story.image).width(960).fit('max').auto('format').url()
    : '/images/how-4.jpg';

  const quoteBannerImageSrc = quoteBannerUrl(data?.quoteBanner?.image, '/images/how-2.jpg');

  const executiveTeam = (
    data?.executiveTeam && data.executiveTeam.length > 0
      ? data.executiveTeam
      : allExecutives && allExecutives.length > 0
        ? allExecutives
        : ABOUT_FALLBACK_EXECUTIVE_TEAM
  ).filter((m): m is TeamMember => Boolean(m && m._id));

  const boardMembers = (
    data?.boardOfDirectors && data.boardOfDirectors.length > 0
      ? data.boardOfDirectors
      : allBoardMembers && allBoardMembers.length > 0
        ? allBoardMembers
        : []
  ).filter((m): m is TeamMember => Boolean(m && m._id));

  const featureCards = (data?.featureCards && data.featureCards.length > 0)
    ? data.featureCards
    : ABOUT_FALLBACK_FEATURE_CARDS;

  return (
    <SiteChrome>
      <main className="bg-cream">
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
                <BodyText value={data.story.body} scheme="light" />
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
            <OutlineButton href={data?.story?.ctaHref ?? '/about#team'}>
              {data?.story?.ctaLabel ?? 'Meet the Team'}
            </OutlineButton>
          </div>
        </div>
      </section>

      {/* Three feature cards */}
      <section className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featureCards.map((card, i) => (
            <FadeUp key={card.title} delay={i * 120} className="gap-4 bg-white rounded-[16px] p-9 flex flex-col justify-start items-start hover-lift">
              <h3 className="font-sans text-ink text-[26px] leading-[1.2]">{card.title}</h3>
              <CmsBody
                value={card.body}
                className="flex-1"
                fallbackClassName="font-nav text-ink text-[16px] leading-[1.3] flex-1"
              />
              <OutlineButton href={card.ctaHref ?? '/borrowers'} className="self-start text-[14px]">
                {card.ctaLabel ?? 'Learn more'}
              </OutlineButton>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Quote banner */}
      <CtaBanner
        heading={data?.quoteBanner?.quote ?? "There's no substitute for experience across market cycles — and no substitute for a partner who puts your interests first."}
        ctaLabel="Get started"
        ctaHref="/contact"
        background="image"
        imageSrc={quoteBannerImageSrc}
      />

      {/* Executive Team */}
      <section id="team" className="py-[calc(var(--spacing)*18)]">
        <div className="pcg-inner">
          <h2 className="font-sans text-ink text-[26px] leading-[1.03] tracking-[-0.012em] mb-5">Private Capital Group Team</h2>
          <TeamMemberGrid members={executiveTeam} />
        </div>
      </section>

      {boardMembers.length > 0 ? (
        <section className="py-[calc(var(--spacing)*18)]">
          <div className="pcg-inner">
            <h2 className="font-sans text-ink text-[26px] leading-[1.03] tracking-[-0.012em] mb-5">Board of Directors</h2>
            <TeamMemberGrid members={boardMembers} columns={4} />
          </div>
        </section>
      ) : null}

      </main>
    </SiteChrome>
  );
}
