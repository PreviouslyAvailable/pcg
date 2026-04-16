import Navbar from '@/components/NavbarServer';
import Hero from '@/components/Hero';
import HomeIntro from '@/components/HomeIntro';
import CaseStudy from '@/components/CaseStudy';
import CtaBanner from '@/components/CtaBanner';
import InvestorsSection from '@/components/InvestorsSection';
import HowDifferent from '@/components/HowDifferent';
import InsightsSection from '@/components/InsightsSection';
import Footer from '@/components/Footer';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { homePageQuery, postsQuery, caseStudiesQuery } from '@/sanity/queries';
import type { HomePage, PostSummary, CaseStudy as CaseStudyType } from '@/sanity/types';

export const revalidate = 60;

const insightPostsFallback = [
  { title: 'PCG News: Welcome to new investor – Aurora KiwiSaver', href: '/news/aurora-kiwisaver', imageSrc: '/images/insight-1.jpg' },
  { title: 'PCG Insights: Relative Value in Private Debt', href: '/news/relative-value-private-debt', imageSrc: '/images/insight-2.jpg' },
  { title: 'PCG News: KangaNews NZ Private Debt Feature', href: '/news/kanganews-feature', imageSrc: '/images/insight-3.jpg' },
  { title: 'PCG Insights: Private Debt – What Do We Mean?', href: '/news/private-debt-what-do-we-mean', imageSrc: '/images/insight-4.jpg' },
];

export default async function Home() {
  const [data, posts, caseStudies] = await Promise.all([
    client.fetch<HomePage>(homePageQuery).catch(() => null),
    client.fetch<PostSummary[]>(postsQuery).catch(() => null),
    client.fetch<CaseStudyType[]>(caseStudiesQuery).catch(() => []),
  ]);

  const heroImageSrc = data?.hero?.backgroundImage?.asset?.url
    ? urlFor(data.hero.backgroundImage).width(1920).height(1080).url()
    : '/images/hero-bg.jpg';

  const caseStudyImageSrc = data?.caseStudy?.image?.asset?.url
    ? urlFor(data.caseStudy.image).width(774).height(374).url()
    : '/images/case-study.jpg';

  const quoteBannerImageSrc = data?.quoteBanner?.image?.asset?.url
    ? urlFor(data.quoteBanner.image).width(1920).height(800).url()
    : '/images/quote-bg.jpg';

  const howDifferentImages = data?.howDifferentSection?.items?.map((item) =>
    item.image?.asset?.url
      ? urlFor(item.image).width(662).height(367).url()
      : undefined
  ) ?? ['/images/how-1.jpg', '/images/how-2.jpg', '/images/how-3.jpg', '/images/how-4.jpg'];

  // Map Sanity posts to InsightsSection format, fall back to hardcoded
  const insightPosts =
    posts && posts.length > 0
      ? posts.slice(0, 4).map((p) => ({
          title: p.title,
          href: `/news/${p.slug}`,
          imageSrc: p.mainImage?.asset
            ? urlFor(p.mainImage).width(480).height(320).url()
            : '/images/insight-1.jpg',
        }))
      : insightPostsFallback;

  return (
    <main>
      <Navbar variant="dark" />
      <Hero
        imageSrc={heroImageSrc}
        headline={data?.hero?.heading ?? undefined}
        subtext={data?.hero?.subtext ?? undefined}
      />
      <HomeIntro
        eyebrow={data?.introSection?.eyebrow}
        borrowersHeading={data?.introSection?.borrowers?.heading}
        borrowersBody={data?.introSection?.borrowers?.body}
        borrowersCtaLabel={data?.introSection?.borrowers?.ctaLabel}
        borrowersCtaHref={data?.introSection?.borrowers?.ctaHref}
        borrowersImageSrc={
          data?.introSection?.borrowers?.image?.asset?.url
            ? data.introSection.borrowers.image.asset.url
            : '/images/borrowers.jpg'
        }
        investorsHeading={data?.introSection?.investors?.heading}
        investorsBody={data?.introSection?.investors?.body}
        investorsCtaLabel={data?.introSection?.investors?.ctaLabel}
        investorsCtaHref={data?.introSection?.investors?.ctaHref}
        investorsImageSrc={
          data?.introSection?.investors?.image?.asset?.url
            ? data.introSection.investors.image.asset.url
            : '/images/investors-right.jpg'
        }
        featureCards={data?.introSection?.featureCards}
      />
     {/* <CaseStudy
        slides={caseStudies ?? []}
        imageSrc={caseStudyImageSrc}
        label={data?.caseStudy?.label ?? undefined}
        quote={data?.caseStudy?.heading ?? undefined}
      /> */}
      <CtaBanner />
      <InvestorsSection
        imageSrc={
          data?.investorsSection?.image?.asset?.url
            ? data.investorsSection.image.asset.url
            : '/images/investors-right.jpg'
        }
        heading={data?.investorsSection?.heading}
        headingMobile={data?.investorsSection?.headingMobile}
        content={data?.investorsSection?.content}
        ctaLabel={data?.investorsSection?.ctaLabel}
        ctaLabelMobile={data?.investorsSection?.ctaLabelMobile}
        ctaHref={data?.investorsSection?.ctaHref}
      />
      <CtaBanner
        heading={
          data?.quoteBanner?.quote ??
          "Growth isn't found in cookie-cutter solutions. It's crafted through partnerships that understand your business reality."
        }
        ctaLabel="Get started"
        ctaHref="/contact"
        background="image"
        imageSrc={quoteBannerImageSrc}
      />
      <HowDifferent
        heading={data?.howDifferentSection?.heading}
        items={data?.howDifferentSection?.items?.map((item, i) => ({
          title: item.title,
          body: item.body,
          imageSrc: howDifferentImages[i],
          imageAlt: item.title,
        }))}
        images={howDifferentImages.filter(Boolean) as string[]}
      />
      <InsightsSection posts={insightPosts} />
      <CtaBanner
        heading={
          data?.ctaBannerBottom?.heading ??
          'Ready to access flexible funding that grows with your business?'
        }
        ctaLabel={data?.ctaBannerBottom?.ctaLabel ?? 'Get started'}
        ctaHref={data?.ctaBannerBottom?.ctaHref ?? '/contact'}
        background="cream"
      />
      <Footer />
    </main>
  );
}
