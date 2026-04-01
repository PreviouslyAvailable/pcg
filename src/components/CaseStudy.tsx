import Image from 'next/image';

interface CaseStudyProps {
  imageSrc?: string;
  quote?: string;
  label?: string;
}

export default function CaseStudy({
  imageSrc,
  quote = '"We were able to double our capacity with the infrastructure that PCG helped us purchase. This tripled our revenue."',
  label = 'Case Study',
}: CaseStudyProps) {
  return (
    <section className="bg-dark py-24 px-10 flex flex-col items-center">
      <p className="font-sans text-[16px] uppercase tracking-widest text-gold/60 mb-10">
        {label}
      </p>

      <blockquote className="font-sans text-gold text-[30px] lg:text-[clamp(28px,3.5vw,50px)] leading-[1.15] tracking-[-0.02em] text-center max-w-[800px] mb-14">
        {quote}
      </blockquote>

      {/* Image card */}
      <div className="relative w-full max-w-[774px] aspect-[774/374] rounded-[20px] lg:rounded-[23px] overflow-hidden bg-cream-warm">
        {imageSrc && (
          <Image src={imageSrc} alt="Case study" fill className="object-cover" />
        )}
      </div>

      {/* Dot pagination */}
      <div className="flex gap-3 mt-8">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`block size-[9px] rounded-full ${i === 0 ? 'bg-gold' : 'bg-gold/30'}`}
          />
        ))}
      </div>
    </section>
  );
}
