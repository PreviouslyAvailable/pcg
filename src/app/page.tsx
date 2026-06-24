import SiteChrome from '@/components/SiteChrome';
import Hero from '@/components/Hero';
import HomeIntro from '@/components/HomeIntro';
import CtaBanner from '@/components/CtaBanner';
import InvestorsSection from '@/components/InvestorsSection';
import HowDifferent from '@/components/HowDifferent';
import InsightsSection from '@/components/InsightsSection';
import { getHomePage, getPosts } from '@/sanity/loaders';
import { quoteBannerUrl } from '@/sanity/imageUrls';
import { urlFor } from '@/sanity/image';

export const revalidate = 60;

const howDifferentFallbackImages = ['/images/how-1.jpg', '/images/how-2.jpg', '/images/how-3.jpg', '/images/how-4.jpg'];

export default async function Home() {
  const [data, posts] = await Promise.all([getHomePage(), getPosts()]);

  const heroImageSrc = data?.hero?.backgroundImage?.asset?.url
    ? urlFor(data.hero.backgroundImage).width(1920).height(1080).fit('crop').auto('format').url()
    : '/images/hero-bg.jpg';

  const heroImages: string[] = [heroImageSrc];
  if (data?.hero?.backgroundImage2?.asset?.url) {
    heroImages.push(urlFor(data.hero.backgroundImage2).width(1920).height(1080).fit('crop').auto('format').url());
  }
  if (data?.hero?.backgroundImage3?.asset?.url) {
    heroImages.push(urlFor(data.hero.backgroundImage3).width(1920).height(1080).fit('crop').auto('format').url());
  }

  const quoteBannerImageSrc = quoteBannerUrl(data?.quoteBanner?.image);

  const howDifferentItems = data?.howDifferentSection?.items?.map((item, i) => ({
    title: item.title,
    body: item.body,
    imageSrc: item.image?.asset?.url
      ? urlFor(item.image).width(662).height(367).url()
      : howDifferentFallbackImages[i],
    imageAlt: item.title,
  }));

  const insightPosts =
    posts && posts.length > 0
      ? posts.slice(0, 4).map((post) => ({
          title: post.title,
          href: `/news/${post.slug}`,
          category: post.category,
          publishedAt: post.publishedAt,
          excerpt: post.excerpt,
          imageSrc: post.mainImage?.asset
            ? urlFor(post.mainImage).width(480).height(320).url()
            : undefined,
        }))
      : undefined;

  return (
    <SiteChrome variant="dark">
      <main>
        <Hero
          images={heroImages}
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
              ? urlFor(data.introSection.borrowers.image).width(960).height(640).url()
              : '/images/borrowers.jpg'
          }
          investorsHeading={data?.introSection?.investors?.heading}
          investorsBody={data?.introSection?.investors?.body}
          investorsCtaLabel={data?.introSection?.investors?.ctaLabel}
          investorsCtaHref={data?.introSection?.investors?.ctaHref}
          investorsImageSrc={
            data?.introSection?.investors?.image?.asset?.url
              ? urlFor(data.introSection.investors.image).width(960).height(640).url()
              : '/images/investors-right.jpg'
          }
          featureCards={data?.introSection?.featureCards}
        />
        <InvestorsSection
          imageSrc={
            data?.investorsSection?.image?.asset?.url
              ? urlFor(data.investorsSection.image).width(960).height(640).url()
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
        <HowDifferent heading={data?.howDifferentSection?.heading} items={howDifferentItems} />
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
      </main>
    </SiteChrome>
  );
}
