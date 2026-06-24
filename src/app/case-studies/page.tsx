import Image from 'next/image';
import Navbar from '@/components/NavbarServer';
import Footer from '@/components/FooterServer';
import { getCaseStudies } from '@/sanity/loaders';
import { urlFor } from '@/sanity/image';
import { IMAGE_SIZES } from '@/lib/imageSizes';

import type { CaseStudy } from '@/sanity/types';

export const revalidate = 60;

const fallbackCaseStudies: CaseStudy[] = [
  {
    _id: 'carbn',
    company: 'Carbn',
    quote: 'Supporting growth capital for a New Zealand technology business scaling its product and team.',
    attribution: undefined,
    industry: undefined,
    image: undefined,
  },
  {
    _id: 't4',
    company: 'T4 Group',
    quote: 'Flexible funding to help a specialist services group invest in operations and expand nationally.',
    attribution: undefined,
    industry: undefined,
    image: undefined,
  },
  {
    _id: 'titanium',
    company: 'Titanium',
    quote: 'Structured debt to back working capital and strategic initiatives across the Titanium portfolio.',
    attribution: undefined,
    industry: undefined,
    image: undefined,
  },
  {
    _id: 'helisupport',
    company: 'Helisupport',
    quote: 'Capital partnership enabling aviation services growth with terms aligned to cash flow.',
    attribution: undefined,
    industry: undefined,
    image: undefined,
  },
];

const fallbackFeatured = {
  company: 'United Machinist',
  quote: 'With 20+ deals across our portfolio we provide genuine diversification and risk management that only comes with scale and experience.',
  attribution: 'Sarah Ramsay',
  imageSrc: '/images/how-3.jpg',
};

export default async function CaseStudiesPage() {
  const cmsStudies = await getCaseStudies();
  const caseStudies = cmsStudies.length > 0 ? cmsStudies : fallbackCaseStudies;
  const featured = caseStudies[0];

  const featuredImageSrc = featured?.image?.asset?.url
    ? urlFor(featured.image).width(1600).height(900).fit('crop').auto('format').url()
    : fallbackFeatured.imageSrc;

  const gridStudies = caseStudies.slice(featured ? 1 : 0);

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      <section className="pt-36 pb-10 lg:pt-40 lg:pb-12">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
        <h1 className="font-serif font-light text-ink text-[clamp(60px,6.4vw,80px)] leading-[1.0] tracking-[-0.015em]">
          Real Businesses, Real Results
        </h1>
        <p className="font-nav text-ink text-[16px] leading-[1.4] max-w-[380px]">
          See how we&apos;ve partnered with New Zealand companies to unlock growth through tailored capital solutions
        </p>
        </div>
      </section>

      {featured ? (
        <section className="pb-16 lg:pb-20">
          <div className="pcg-inner">
          <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-dark">
            <Image
              src={featuredImageSrc}
              alt={featured.image?.alt ?? featured.company}
              fill
              sizes={IMAGE_SIZES.viewport}
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div>
              <p className="font-sans text-ink text-[20px]">{featured.company}</p>
              {featured.attribution ? (
                <p className="font-nav text-ink/60 text-[16px] mt-1">{featured.attribution}</p>
              ) : null}
              {featured.industry ? (
                <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mt-2">{featured.industry}</p>
              ) : null}
            </div>
            <p className="font-nav text-ink text-[16px] leading-[1.4]">{featured.quote}</p>
          </div>
          </div>
        </section>
      ) : null}

      <section className="pb-20 lg:pb-24">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {gridStudies.map((cs, index) => {
          const imageSrc = cs.image?.asset?.url
            ? urlFor(cs.image).width(960).height(640).fit('crop').auto('format').url()
            : `/images/how-${(index % 4) + 1}.jpg`;

          return (
            <article key={cs._id} className="group">
              <div className="relative w-full aspect-[558/380] rounded-[16px] overflow-hidden bg-cream-warm mb-4">
                <Image
                  src={imageSrc}
                  alt={cs.image?.alt ?? cs.company}
                  fill
                  sizes={IMAGE_SIZES.pageHero}
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="font-sans text-ink text-[22px] mb-1">{cs.company}</p>
              {cs.attribution ? (
                <p className="font-sans text-[14px] uppercase tracking-[1px] text-ink/80 mb-3">{cs.attribution}</p>
              ) : null}
              <p className="font-nav text-ink text-[16px] leading-[1.4]">{cs.quote}</p>
            </article>
          );
        })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
