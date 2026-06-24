import Image from 'next/image';
import Navbar from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import { IMAGE_SIZES } from '@/lib/imageSizes';

const caseStudies = [
  {
    company: 'Carbn',
    image: '/images/how-3.jpg',
    body: 'Supporting growth capital for a New Zealand technology business scaling its product and team.',
  },
  {
    company: 'T4 Group',
    image: '/images/how-2.jpg',
    body: 'Flexible funding to help a specialist services group invest in operations and expand nationally.',
  },
  {
    company: 'Titanium',
    image: '/images/insight-2.jpg',
    body: 'Structured debt to back working capital and strategic initiatives across the Titanium portfolio.',
  },
  {
    company: 'Helisupport',
    image: '/images/how-1.jpg',
    body: 'Capital partnership enabling aviation services growth with terms aligned to cash flow.',
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CaseStudiesPage() {
  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      {/* Header */}
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

      {/* Featured video case study */}
      <section className="pb-16 lg:pb-20">
        <div className="pcg-inner">
        <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-dark group cursor-pointer">
          <Image src="/images/how-3.jpg" alt="United Machinist case study" fill sizes={IMAGE_SIZES.viewport} className="object-cover opacity-80 group-hover:opacity-70 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-16 rounded-full bg-white/90 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 4l12 6-12 6V4z" fill="#0f0e0b" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-sans text-ink text-[20px]">United Machinist</p>
              <ArrowIcon />
            </div>
            <p className="font-nav text-ink/60 text-[16px]">Sarah Ramsay</p>
          </div>
          <p className="font-nav text-ink text-[16px] leading-[1.4]">
            With 20+ deals across our portfolio we provide genuine diversification and risk management that only comes with scale and experience.
          </p>
        </div>
        </div>
      </section>

      {/* Case study grid */}
      <section className="pb-20 lg:pb-24">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {caseStudies.map((cs) => (
          <article key={cs.company} className="group">
            <div className="relative w-full aspect-[558/380] rounded-[16px] overflow-hidden bg-cream-warm mb-4">
              <Image src={cs.image} alt={cs.company} fill sizes={IMAGE_SIZES.pageHero} className="object-cover group-hover:scale-[1.02] transition-transform duration-500" />
            </div>
            <p className="font-sans text-ink text-[22px] mb-3">{cs.company}</p>
            <p className="font-nav text-ink text-[16px] leading-[1.4]">{cs.body}</p>
          </article>
        ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
