import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

const executiveTeam = [
  { name: 'Andrew Golding', role: 'Chair', image: null },
  { name: 'Paul Carman', role: 'Founder & Managing Partner', image: null },
  { name: 'John Ferrara', role: 'Co-Founder & Partner', image: null },
];

const boardMembers = [
  { name: 'Andrew Golding', role: 'Chair', image: null },
  { name: 'Paul Carman', role: 'Founder & Managing Partner', image: null },
  { name: 'John Ferrara', role: 'Co-Founder & Partner', image: null },
];

function LinkedInIcon() {
  return (
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="size-8 rounded-full bg-ink flex items-center justify-center hover:bg-ink/80 transition-colors shrink-0"
      aria-label="LinkedIn"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </a>
  );
}

function TeamCard({ name, role, image }: { name: string; role: string; image: string | null }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden bg-cream-warm">
        {image && <Image src={image} alt={name} fill className="object-cover object-top" />}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-sans text-ink text-[16px] leading-tight">{name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.33px] text-ink/50 mt-0.5">{role}</p>
        </div>
        <LinkedInIcon />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      <PageHero
        heading="New Zealand's Most Experienced Private Capital Lender"
        subtext="Drawing from proven global experience to deliver tailored capital solutions & a relationship-driven approach for New Zealand businesses."
        imageSrc="/images/how-3.jpg"
        imageAlt="PCG team"
      />

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-cream-warm">
          <Image src="/images/how-4.jpg" alt="Our story" fill className="object-cover object-top" />
        </div>
        <div>
          <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-6">
            Our Story
          </h2>
          <div className="space-y-4 font-nav text-ink text-[18px] leading-[1.4] mb-8">
            <p>
              Recognising that New Zealand's ambitious businesses were underserved by traditional banks, we established PCG to bring the flexibility of global private debt to the local market.
            </p>
            <p>
              We bring over 20 years of global private credit experience to address the funding gap left by banks. Founded in 2015 by Paul Carman and John Ferrara after successfully operating private debt funds in the UK under Maples Bank, PCG has grown from $5M to $500M assets under management by solving problems traditional lenders couldn't.
            </p>
            <p>
              As New Zealand's largest and most active private credit lender, we connect opportunities across Auckland and Queenstown while maintaining the relationship-driven approach that sets us apart from both banks and institutional finance.
            </p>
          </div>
          <Link
            href="/about#team"
            className="inline-flex items-center font-sans text-[16px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
          >
            Meet the Team
          </Link>
        </div>
        </div>
      </section>

      {/* Three feature cards */}
      <section className="pb-16 lg:pb-24">
        <div className="pcg-inner grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Stability through every cycle',
            body: "There's no substitute for having operated private debt funds through economic recessions, financial crises, and high growth periods. Each creates unique challenges, especially for the uninitiated. Our experience across multiple market cycles in global markets gives us the competence to navigate any environment.",
            cta: 'Explore Growth Capital',
            href: '/borrowers',
          },
          {
            title: 'Aligned Partnership',
            body: "Unlike competitors, we focus exclusively on fund management. No advisory, no mixed equity within the same fund. This ring-fencing ensures our interests are always aligned with yours.",
            cta: 'About our Funds',
            href: '/investors',
          },
          {
            title: 'Market-Leading Diversification',
            body: "PCG offers a level of diversification and risk management that is unique in the New Zealand market. This scale allows us to provide genuine downside protection for investors while offering borrowers the stability of an institutional-grade platform.",
            cta: 'About our Funds',
            href: '/investors',
          },
        ].map((card) => (
          <div key={card.title} className="bg-cream-warm rounded-[18px] p-8 flex flex-col gap-4">
            <h3 className="font-sans text-ink text-[26px] leading-[1.2]">{card.title}</h3>
            <p className="font-nav text-ink text-[18px] leading-[1.3] flex-1">{card.body}</p>
            <Link
              href={card.href}
              className="self-start font-sans text-[14px] uppercase tracking-wide text-ink border border-ink rounded-[8px] px-5 py-2.5 hover:bg-ink/5 transition-colors"
            >
              {card.cta}
            </Link>
          </div>
        ))}
        </div>
      </section>

      {/* Quote banner */}
      <CtaBanner
        heading="Infrastructure investment isn't about ticking boxes. It's about building the foundation for sustainable competitive advantage."
        ctaLabel="Get started"
        ctaHref="/contact"
        background="image"
        imageSrc="/images/how-2.jpg"
      />

      {/* Executive Team */}
      <section id="team" className="py-16 lg:py-24">
        <div className="pcg-inner">
        <h2 className="font-sans text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-10">Executive Team</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {executiveTeam.map((m) => <TeamCard key={m.name + m.role} {...m} />)}
        </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="pb-16 lg:pb-24">
        <div className="pcg-inner">
        <h2 className="font-sans text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-10">Board of Directors</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {boardMembers.map((m) => <TeamCard key={m.name + m.role + 'board'} {...m} />)}
        </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
