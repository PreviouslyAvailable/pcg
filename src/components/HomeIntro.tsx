import Image from 'next/image';
import Link from 'next/link';

interface HomeIntroProps {
  borrowersImageSrc?: string;
  investorsImageSrc?: string;
}

export default function HomeIntro({ borrowersImageSrc, investorsImageSrc }: HomeIntroProps) {
  return (
    <section className="bg-cream-warm">
      {/* Two-column intro */}
      <div className="px-[60px] pt-[72px] pb-[80px] grid grid-cols-2 gap-x-16">
        {/* Left — Borrowers */}
        <div>
          <p className="font-sans text-[16px] uppercase tracking-wide text-ink mb-6">
            What we do
          </p>
          <h2 className="font-serif font-light text-[clamp(42px,4.3vw,62px)] leading-[1.0] tracking-[-0.02em] text-ink mb-6 max-w-[580px]">
            Supporting New Zealand Business Growth
          </h2>
          <p className="font-nav text-[18px] leading-[1.4] text-ink mb-8 max-w-[480px]">
            We deliver what traditional lenders can't: flexible capital with the speed and certainty of execution that allows you grow with confidence. With $500M in committed capital and lending that ranges from $5–50M, we use our decades of experience to work with ambitious businesses, providing tailored solutions that enable growth.
          </p>
          <OutlineButton href="/borrowers">How it works</OutlineButton>
        </div>

        {/* Right — Investors */}
        <div>
          {/* Right-side image at top */}
          <div className="relative w-full aspect-[558/407] rounded-[17px] overflow-hidden mb-10">
            {investorsImageSrc ? (
              <Image src={investorsImageSrc} alt="Investors" fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-cream-warm border border-black/10" />
            )}
          </div>
          <h2 className="font-serif font-light text-[clamp(42px,4.3vw,62px)] leading-[1.0] tracking-[-0.02em] text-ink mb-6 max-w-[580px]">
            Creating Investment Opportunities
          </h2>
          <p className="font-nav text-[18px] leading-[1.4] text-ink mb-8 max-w-[480px]">
            For investors seeking consistent returns and portfolio diversification, we provide access to institutional-quality private debt investments in New Zealand dollars, managed by experienced professionals with a proven track record.
          </p>
          <OutlineButton href="/investors">Explore investments</OutlineButton>
        </div>
      </div>

      {/* Left-side image — below left column */}
      <div className="px-[60px] pb-[80px] grid grid-cols-2 gap-x-16">
        <div className="relative w-full aspect-[558/363] rounded-[17px] overflow-hidden">
          {borrowersImageSrc ? (
            <Image src={borrowersImageSrc} alt="Supporting NZ businesses" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-cream border border-black/10" />
          )}
        </div>
      </div>

      {/* Three feature cards */}
      <div className="px-[60px] pb-[80px] grid grid-cols-3 gap-6">
        {[
          {
            title: 'Stability through every cycle',
            body: "There's no substitute for having operated private debt funds through economic recessions, financial crises, and high growth periods. Each creates unique challenges, especially for the uninitiated. Our experience across multiple market cycles in global markets gives us the competence to navigate any environment.",
            cta: { label: 'Learn more', href: '/about' },
          },
          {
            title: 'Cash-on-hand, ready to invest.',
            body: "PCG has grown to $500M Assets Under Management. From $5M at inception to one of New Zealand's largest private credit funds today. This growth reflects the trust our investors and borrowers place in our expertise and execution.",
            cta: { label: 'About our Funds', href: '/investors' },
          },
          {
            title: 'Deep Sector Expertise',
            body: "Extensive expertise spanning multiple sectors and deal structures across New Zealand. We understand the nuances of local business, from seasonal cash flows to regulatory requirements, and use our real-world experience with real businesses to anticipate challenges and structure solutions that actually work for your specific situation.",
            cta: { label: 'Meet the team', href: '/about' },
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-[18px] p-9 flex flex-col">
            <h3 className="font-sans text-[28px] leading-[1.1] text-ink mb-6">
              {card.title}
            </h3>
            <p className="font-nav text-[18px] leading-[1.4] text-ink flex-1 mb-8">
              {card.body}
            </p>
            <OutlineButton href={card.cta.href}>{card.cta.label}</OutlineButton>
          </div>
        ))}
      </div>
    </section>
  );
}

function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center font-sans text-[16px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
    >
      {children}
    </Link>
  );
}
