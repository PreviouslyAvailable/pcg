import Image from 'next/image';
import Link from 'next/link';

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
    <section className="grid grid-cols-2 min-h-[784px]">
      {/* Left — teal */}
      <div className="bg-teal px-[60px] py-20 flex flex-col justify-between">
        <div>
          <h2 className="font-serif font-light text-white text-[clamp(48px,4.3vw,62px)] leading-[0.9] tracking-[-0.02em] mb-12">
            For Investors
          </h2>
          <p className="font-nav text-white text-[18px] leading-[1.3] mb-4 max-w-[348px]">
            We combine a 20-year global track record with a primary focus on capital preservation and consistent monthly income
          </p>
          <ul className="space-y-1 mb-12">
            {features.map((f) => (
              <li key={f} className="font-nav text-white text-[18px] leading-[1.3] flex gap-2">
                <span className="mt-[6px] shrink-0 size-[5px] rounded-full bg-white/70" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/investors"
          className="self-start font-sans text-[16px] uppercase tracking-wide text-white border border-white rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
        >
          See Investment Options
        </Link>
      </div>

      {/* Right — image */}
      <div className="relative bg-cream-warm overflow-hidden">
        {imageSrc ? (
          <Image src={imageSrc} alt="For Investors" fill className="object-cover object-center" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cream-warm to-cream-warm/60" />
        )}
      </div>
    </section>
  );
}
