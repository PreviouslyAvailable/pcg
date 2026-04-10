import Image from 'next/image';
import Link from 'next/link';
import FadeUp from './FadeUp';

interface InvestorsSectionProps {
  imageSrc?: string;
}

const features = [
  'Target OCR + 4% net returns',
  'Monthly income distributions',
  '100% floating rate provides inflation protection',
  'Senior secured positions with capital preservation focus',
  'PIE structure for tax efficiency',
];

export default function InvestorsSection({ imageSrc }: InvestorsSectionProps) {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-2 min-h-[784px]">
      {/* Teal panel — top on mobile, left on desktop */}
      <div className="bg-teal py-16 lg:py-20 flex flex-col justify-between">
        <div className="max-w-[1680px] mx-auto w-full px-4 lg:px-[60px] flex flex-col justify-between h-full">
        <FadeUp>
          {/* Mobile heading differs from desktop */}
          <h2 className="font-serif font-light text-white text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-10 lg:mb-12">
            <span className="lg:hidden">What about investment?</span>
            <span className="hidden lg:block">For Investors</span>
          </h2>
          <p className="font-nav text-white text-[16px] leading-[1.3] mb-4 max-w-[348px]">
            We combine a 20-year global track record with a primary focus on capital preservation and consistent monthly income
          </p>
          <ul className="space-y-1 mb-10 lg:mb-12">
            {features.map((f) => (
              <li key={f} className="font-nav text-white text-[16px] leading-[1.3] flex gap-2">
                <span className="mt-[6px] shrink-0 size-[5px] rounded-full bg-white/70" />
                {f}
              </li>
            ))}
          </ul>
        </FadeUp>
        <FadeUp delay={200}>
        <Link
          href="/investors"
          className="self-start font-sans text-[16px] uppercase tracking-wide text-white border border-white rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
        >
          <span className="lg:hidden">Investments</span>
          <span className="hidden lg:block">See Investment Options</span>
        </Link>
        </FadeUp>
        </div>
      </div>

      {/* Image — below on mobile, right on desktop */}
      <div className="relative min-h-[420px] lg:min-h-0 bg-cream-warm overflow-hidden">
        {imageSrc ? (
          <Image src={imageSrc} alt="For Investors" fill className="object-cover object-center" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cream-warm to-cream-warm/60" />
        )}
      </div>
    </section>
  );
}
