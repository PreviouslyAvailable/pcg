import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterBanner from '@/components/NewsletterBanner';

const relatedInsights = [
  {
    title: 'Q4 2025 New Zealand Private Credit',
    category: 'MARKET UPDATE',
    date: 'DECEMBER 2025',
    body: 'Analysis of current market conditions, deal flow trends, and outlook for 2026. Rising interest rates environment creating opportunities for floating rate lenders.',
    image: '/images/how-1.jpg',
    href: '/insights/q4-2025-nz-private-credit',
  },
  {
    title: 'RBNZ Banking Reforms Impact',
    category: 'REGULATORY REVIEW',
    date: 'OCTOBER 2025',
    body: 'How increasing regulatory requirements for banks are creating expanded opportunities for private credit providers in the New Zealand market.',
    image: '/images/insight-2.jpg',
    href: '/insights/rbnz-banking-reforms',
  },
  {
    title: 'Navigating Economic Uncertainty',
    category: 'CASE STUDY',
    date: 'NOVEMBER 2025',
    body: 'How increasing regulatory requirements for banks are creating expanded opportunities for private credit providers in the New Zealand market.',
    image: '/images/insight-3.jpg',
    href: '/insights/navigating-economic-uncertainty',
  },
];

const tableRows = [
  { year: '2010', hy: '15%', ll: '10%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2011', hy: '-5%', ll: '-1%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2012', hy: '15%', ll: '12%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2013', hy: '7%', ll: '5%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2014', hy: '2%', ll: '1%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2015', hy: '-5%', ll: '-1%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2016', hy: '17%', ll: '10%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2017', hy: '7%', ll: '4%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2018', hy: '-2%', ll: '-1%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2019', hy: '14%', ll: '8%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2020', hy: '7%', ll: '3%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2021', hy: '5%', ll: '5%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2022', hy: '-11%', ll: '-3%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
  { year: '2023', hy: '13%', ll: '13%', bdc: '—', dl: '—', pd: '—', pdOff: '—' },
];

export default async function InsightPost({ params }: { params: Promise<{ slug: string }> }) {
  await params;

  return (
    <main className="bg-cream">
      <Navbar variant="light" />

      {/* Article header */}
      <section className="px-4 lg:px-[60px] pt-36 pb-10 lg:pt-40 lg:pb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.33px] text-ink/40 mb-8">PCG INSIGHTS</p>
        <div className="max-w-[720px]">
          <h1 className="font-serif font-light text-ink text-[clamp(36px,4vw,60px)] leading-[1.0] tracking-[-0.02em] mb-4">
            Relative Value in Private Debt
          </h1>
          <p className="font-nav text-ink/70 text-[17px] leading-[1.5]">
            Expert analysis and insights on private credit markets, regulatory developments, and investment opportunities
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="px-4 lg:px-[60px] pb-16">
        <div className="max-w-[720px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.33px] text-ink/40 mb-10">08.11.2025</p>

          <h2 className="font-sans text-ink text-[22px] mb-4">Heading One</h2>
          <p className="font-nav text-ink/70 text-[16px] leading-[1.6] mb-6">
            Expert analysis and insights on private credit markets, regulatory developments, and investment opportunities
          </p>

          <p className="font-nav text-ink text-[17px] leading-[1.7] mb-5">
            Market performance data can help demystify the wider asset class and shine a light on where relative value might best be found both in the context of the domestic versus offshore market and more specifically within the domestic market.
          </p>
          <p className="font-nav text-ink text-[17px] leading-[1.7] mb-5">
            The New Zealand Private Debt market has emerged over the past 18 months as a viable capital market funding source for NZ businesses. Whilst the domestic ecosystem remains small, new and unfamiliar to many domestic investors, there is a wealth of information and context available from offshore jurisdictions which can help borrowers and investors to navigate the path ahead in NZ.
          </p>
          <p className="font-nav text-ink text-[17px] leading-[1.7] mb-5">
            Private debt is still considered to be a somewhat homogeneous asset class in the eyes of most NZ investors.
          </p>
          <p className="font-nav text-ink text-[17px] leading-[1.7] mb-10">
            Global, regional or domestic private debt markets, and the differences in risk and reward between each, are only now beginning to come into some degree of focus for domestic NZ investors, many of whom are looking to access the asset class for the first time.
          </p>

          {/* Data table */}
          <div className="bg-cream-warm rounded-[12px] p-4 lg:p-6 mb-10 overflow-x-auto">
            <table className="w-full font-mono text-[11px] text-ink/70 min-w-[560px]">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left py-2 pr-4 font-normal text-ink/50">Year</th>
                  <th className="text-left py-2 pr-4 font-normal text-ink/50">HY Bonds</th>
                  <th className="text-left py-2 pr-4 font-normal text-ink/50">Leveraged Loans</th>
                  <th className="text-left py-2 pr-4 font-normal text-ink/50">Public BDC</th>
                  <th className="text-left py-2 pr-4 font-normal text-ink/50">Direct Lending</th>
                  <th className="text-left py-2 pr-4 font-normal text-ink/50">Private Debt</th>
                  <th className="text-left py-2 font-normal text-ink/50">PD Offshore</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.year} className="border-b border-black/5">
                    <td className="py-1.5 pr-4">{row.year}</td>
                    <td className="py-1.5 pr-4">{row.hy}</td>
                    <td className="py-1.5 pr-4">{row.ll}</td>
                    <td className="py-1.5 pr-4">{row.bdc}</td>
                    <td className="py-1.5 pr-4">{row.dl}</td>
                    <td className="py-1.5 pr-4">{row.pd}</td>
                    <td className="py-1.5">{row.pdOff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-mono text-[10px] text-ink/30 mt-3">Source: Bloomberg, Cliffwater, Morningstar LCD, Prequin, Goldman Sachs Global Investment Research.</p>
          </div>
        </div>
      </section>

      {/* Newsletter banner */}
      <section className="px-4 lg:px-[60px] pb-16">
        <NewsletterBanner />
      </section>

      {/* Continued article */}
      <section className="px-4 lg:px-[60px] pb-16">
        <div className="max-w-[720px]">
          <h2 className="font-sans text-ink text-[22px] mb-6">Domestic v offshore markets</h2>
          <div className="space-y-5 font-nav text-ink text-[17px] leading-[1.7]">
            <p>
              Commentators and fund managers seem to be fixated on defining private debt's positive relative returns or perhaps more appropriately the benchmark risk adjusted returns it generates. Globally, and as referenced by the scale of today's private credit market (which totals some US$3.5t), private debt's place as a yield oriented complement to fixed income and cash is now universally accepted.
            </p>
            <p>
              What is therefore more interesting for investors to understand is how the risk reward of investing in private debt might best be measured between various jurisdictions.
            </p>
            <p>
              A recent report by Frontier Advisors (an investment consultant) suggests that regardless of the size of a given investment or underlying business, the level of credit spread generated is broadly comparable (Chart 1, below). Moreover, the measure of risk reward, that is the credit spread per unit of leverage, is also broadly uniform and tends to move within a relatively narrow range over the cycle, even though this is not always at an upward trend at present (Chart 2, below).
            </p>
          </div>
        </div>
      </section>

      {/* Related Insights */}
      <section className="px-4 lg:px-[60px] pb-20 lg:pb-24">
        <h2 className="font-sans text-ink text-[28px] mb-8">Related Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {relatedInsights.map((insight) => (
            <Link key={insight.href} href={insight.href} className="group block">
              <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-cream-warm mb-4">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.33px] text-ink/50 mb-1">{insight.category}</p>
              <p className="font-sans text-ink text-[18px] leading-[1.2] mb-1">{insight.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.33px] text-ink/40 mb-2">{insight.date}</p>
              <p className="font-nav text-ink/70 text-[14px] leading-[1.4]">{insight.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
