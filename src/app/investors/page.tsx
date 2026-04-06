import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

const fundDetails = [
  { label: 'Fund Structure', value: 'PIE (Portfolio Investment Entity) — tax-efficient for NZ investors' },
  { label: 'Target Return', value: 'OCR + 4% (net of fees)' },
  { label: 'Distributions', value: 'Monthly income distributions' },
  { label: 'Management Fee', value: '0.75% per annum' },
  { label: 'Minimum Investment', value: '$250,000' },
  { label: 'Currency', value: 'New Zealand Dollars' },
  { label: 'Valuation', value: 'Weekly' },
  { label: 'Trustee', value: 'Public Trust' },
  { label: 'Administrator', value: 'Adminis' },
  { label: 'Auditor', value: 'EY' },
  { label: 'US Tax Compliance', value: 'PFIC Reporting Compliant. We provide PFIC Annual Information Statements (AIS) to support investors in making QEF elections for US tax reporting.' },
];

export default function InvestorsPage() {
  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      <PageHero
        heading="Resilient Yield in New Zealand Dollars"
        subtext="We combine a 20-year global track record with a primary focus on capital preservation and consistent monthly income"
        imageSrc="/images/investors-right.jpg"
        imageAlt="New Zealand landscape"
      />

      {/* Investment opportunity */}
      <section className="py-16 lg:py-24">
        <div className="pcg-inner">
        <h2 className="font-serif font-light text-ink text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-12">
          Investment opportunity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 mb-10">
          <div>
            <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-3">Defensive Yield with Inflation Protection</h3>
            <p className="font-nav text-ink text-[18px] leading-[1.3]">
              Our fund targets a net return of OCR + 4% through a portfolio of 100% floating-rate assets. This structure provides a natural hedge against inflation and interest rate volatility, ensuring your yield adjusts in real-time to market conditions. Our team's 20-year global track record ensures this performance remains resilient through every phase of the economic cycle.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-3">Granular Exposure to the NZ Middle Market</h3>
            <p className="font-nav text-ink text-[18px] leading-[1.3]">
              Investors gain immediate access to a granular portfolio of 20+ high-quality New Zealand businesses across defensive sectors. This level of diversification—spanning multiple industries and deal structures—is unique in the New Zealand market and significantly reduces idiosyncratic risk compared to concentrated credit offerings.
            </p>
          </div>
        </div>
        <div className="border-t border-black/10 pt-10">
          <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-3">Capital Preservation via Structural Protection</h3>
          <p className="font-nav text-ink text-[18px] leading-[1.3] max-w-[680px]">
            We prioritize capital preservation by focusing on senior secured (first lien) positions with conservative loan-to-value (LTV) ratios. Every investment undergoes rigorous diligence with each deal specifically structured to include multiple exit paths and robust covenant protections to safeguard investor capital in all scenarios.
          </p>
        </div>
        </div>
      </section>

      {/* Fund Options */}
      <section className="pb-16 lg:pb-24">
        <div className="pcg-inner">
        <p className="font-mono text-[11px] uppercase tracking-[0.33px] text-ink/50 mb-8">FUND OPTIONS</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light fund card */}
          <div className="bg-cream-warm rounded-[18px] p-8 flex flex-col">
            <h3 className="font-sans text-ink text-[26px] leading-[1.2] mb-6">
              PCG Diversified New Zealand Private Debt Fund (NZPDF)
            </h3>
            <div className="flex-1 divide-y divide-black/10 mb-8">
              {fundDetails.map((row) => (
                <div key={row.label} className="flex gap-4 py-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2px] text-ink/50 w-[140px] shrink-0 pt-0.5">{row.label}</p>
                  <p className="font-nav text-ink text-[16px] leading-[1.3]">{row.value}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="self-start font-sans text-[16px] uppercase tracking-wide text-ink border border-ink rounded-[10px] px-6 py-3 hover:bg-ink/5 transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          {/* Dark fund card */}
          <div className="bg-dark rounded-[18px] p-8 flex flex-col">
            <h3 className="font-sans text-white text-[26px] leading-[1.2] mb-6">
              Another Fund
            </h3>
            <div className="flex-1 divide-y divide-white/10 mb-8">
              {fundDetails.map((row) => (
                <div key={row.label} className="flex gap-4 py-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2px] text-white/40 w-[140px] shrink-0 pt-0.5">{row.label}</p>
                  <p className="font-nav text-white/80 text-[16px] leading-[1.3]">{row.value}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="self-start font-sans text-[16px] uppercase tracking-wide text-white border border-white/40 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* Active Investor Plus Programme */}
      <section className="pb-16 lg:pb-24">
        <div className="pcg-inner">
        <div className="bg-teal rounded-[18px] p-8 lg:p-12">
          <h2 className="font-sans text-white text-[clamp(40px,4.2vw,64px)] leading-[1.03] tracking-[-0.012em] mb-10">
            Active Investor Plus Programme
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
            <div>
              <h3 className="font-sans text-white text-[26px] leading-[1.2] mb-3">NZTE Acceptable Managed Fund Status</h3>
              <p className="font-nav text-white/80 text-[18px] leading-[1.3]">
                Direct Pathway to Residency: The PCG Diversified NZ Private Debt Fund is a fully compliant NZTE Acceptable Managed Fund. This status provides offshore investors with a clear pre-vetted pathway to New Zealand residency while deploying capital into high quality, senior secured private credit.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-white text-[26px] leading-[1.2] mb-3">Proven Track Record</h3>
              <p className="font-nav text-white/80 text-[18px] leading-[1.3]">
                The Programme Benchmark: We are proud to represent the longest-running credit fund on the AIP programme. Our established history provides the transparency and reporting rigour necessary to satisfy immigration requirements and deliver successful residency outcomes.
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 mb-10">
            <h3 className="font-sans text-white text-[26px] leading-[1.2] mb-3">Global Tax Readiness</h3>
            <p className="font-nav text-white/80 text-[18px] leading-[1.3] max-w-[680px]">
              We recognise the complexities of cross-border investment for investors with US tax obligations. PCG provides the specific PFIC Annual Information Statements required to optimize your US tax position. We work alongside your global tax and legal advisors to ensure your investment remains compliant across multiple jurisdictions.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-block font-sans text-[16px] uppercase tracking-wide text-white border border-white/40 rounded-[10px] px-6 py-3 hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
        </div>
      </section>

      <CtaBanner
        heading="Ready to access flexible funding that grows with your business?"
        ctaLabel="Get started"
        ctaHref="/contact"
        background="teal"
      />

      {/* Quote banner */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-dark/90" />
        <blockquote className="relative z-10 font-sans text-cream text-[clamp(28px,3.5vw,50px)] leading-[1.13] text-center max-w-[794px]">
          Portfolio diversification is secured through direct investment in essential business infrastructure that generates consistent returns.
        </blockquote>
      </section>

      <Footer />
    </main>
  );
}
