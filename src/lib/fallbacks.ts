/**
 * Placeholder marketing copy shown before the CMS is populated (or if a fetch fails).
 * Centralised here so content can be reviewed/edited in one place.
 */

// ─── Borrowers page ────────────────────────────────────────────────────────────

export const BORROWERS_WHY_PCG = [
  { title: 'Bespoke Capital Structures', body: "We tailor loans around your business, not a rigid credit policy. Whether it's interest-only periods to preserve cash flow or seasonal repayment schedules that match your revenue, we have the flexibility to design financing that actually fits your operational reality." },
  { title: 'Direct Access to Decision Makers', body: "We eliminate the bureaucracy of traditional lending. All credit decisions are made locally by the partners you meet face-to-face. This flat structure ensures rapid feedback and the certainty of execution required to close complex deals on tight timelines." },
  { title: 'Long-Term Growth Partnership', body: "We spend time face-to-face understanding your business, your strategy, and the challenges ahead. We build lasting partnerships that support you through every phase of your growth, not just a one-time facility." },
  { title: 'Proven Track Record', body: "With over $500M in committed capital and 20+ successful transactions, we represent one of the largest and most diversified private credit platforms in New Zealand. Our track record provides you with the confidence that we have the scale to support your business and the experience to navigate complex deal structures." },
];

export const BORROWERS_LENDING_FOCUS = [
  { title: 'Growth & Expansion', body: 'Funding new equipment, facilities, or new market entry without giving up equity to do it.' },
  { title: 'Strategic Acquisitions', body: 'Structured debt solutions that give you the speed and certainty to compete for, and close, the right deals.' },
  { title: 'Shareholder Liquidity', body: 'Facilitating partner buyouts or special dividends while maintaining company control.' },
  { title: 'Operational Flexibility', body: 'Replacing restrictive bank debt with terms structured around your actual cash flow cycles.' },
];

export const BORROWERS_HOW_WE_WORK = [
  { step: '1.', title: 'Deep Discovery & Rapid Feedback', body: "We start with a deep dive into your business operations, cash flows, strategy, and challenges. Our senior team engages directly from day one to provide rapid, detailed feedback on your funding requirements.", image: '/images/how-1.jpg', imageLeft: false, cta: undefined },
  { step: '2.', title: 'Structuring', body: "Hundreds of deals across global markets have sharpened our ability to design financing that fits your specific situation. We build terms and repayment profiles around your business, not the other way around, so you can stay focused on running it.", image: '/images/how-2.jpg', imageLeft: true, cta: undefined },
  { step: '3.', title: 'Partnership', body: "We remain active, engaged partners throughout the life of the loan, providing the follow-on capital and strategic support needed as your business scales. As one of New Zealand's largest private credit partners, we have the resources to support you through your entire business lifecycle.", image: '/images/how-4.jpg', imageLeft: false, cta: { label: 'Meet the Team', href: '/about#team' } },
];

// ─── Investors page ──────────────────────────────────────────────────────────

export const INVESTORS_FUND_DETAILS = [
  { label: 'Fund Structure', value: 'PIE (Portfolio Investment Entity) - tax-efficient for New Zealand investors' },
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

export const INVESTORS_INVESTMENT_OPPORTUNITY = [
  { title: 'Defensive Yield with Inflation Protection', body: "Our funds targets a net return of OCR + 4% through a portfolio of 100% floating-rate assets. This structure provides a natural hedge against inflation and interest rate volatility, ensuring your yield adjusts in real-time to market conditions. Our team's 20-year global track record ensures this performance remains resilient through every phase of the economic cycle." },
  { title: 'Granular Exposure to the NZ Middle Market', body: 'Investors gain immediate access to a granular portfolio of high-quality New Zealand businesses across defensive sectors. This level of diversification—spanning multiple industries and deal structures—is unique in the New Zealand market and significantly reduces idiosyncratic risk compared to concentrated credit offerings.' },
  { title: 'Capital Preservation via Structural Protection', body: 'We prioritize capital preservation by focusing on senior secured (first lien) positions with conservative loan-to-value (LTV) ratios. Every investment undergoes rigorous diligence with each deal specifically structured to include multiple exit paths and robust covenant protections to safeguard investor capital in all scenarios.' },
];

export const INVESTORS_ACTIVE_INVESTOR_PLUS = [
  { title: 'NZTE Acceptable Managed Fund Status', body: 'Direct Pathway to Residency: The PCG Diversified NZ Private Debt Fund is a fully compliant NZTE Acceptable Managed Fund. This status provides offshore investors with a clear pre-vetted pathway to New Zealand residency while deploying capital into high quality, senior secured private credit.' },
  { title: 'Proven Track Record', body: 'The Programme Benchmark: We are proud to represent the longest-running credit fund on the AIP programme. Our established history provides the transparency and reporting rigour necessary to satisfy immigration requirements and deliver successful residency outcomes.' },
  { title: 'Global Tax Readiness', body: 'We recognise the complexities of cross-border investment for investors with US tax obligations. PCG provides the specific PFIC Annual Information Statements required to optimize your US tax position. We work alongside your global tax and legal advisors to ensure your investment remains compliant across multiple jurisdictions.' },
];

export const INVESTORS_SECOND_FUND_DETAILS = [
  { label: 'Fund Structure', value: 'PIE (Portfolio Investment Entity)' },
  { label: 'Focus', value: 'New Zealand economic resilience and infrastructure-aligned private debt' },
  { label: 'Currency', value: 'New Zealand Dollars' },
  { label: 'Minimum Investment', value: 'Contact us for details' },
];

// ─── About page ────────────────────────────────────────────────────────────────

export const ABOUT_FALLBACK_EXECUTIVE_TEAM = [
  { _id: '1', name: 'Andrew Golding', role: 'Chair', image: undefined },
  { _id: '2', name: 'Paul Carman', role: 'Founder & Managing Partner', image: undefined },
  { _id: '3', name: 'John Ferrara', role: 'Co-Founder & Partner', image: undefined },
];

export const ABOUT_FALLBACK_FEATURE_CARDS = [
  { title: 'Stability through every cycle', body: "There's no substitute for having operated private debt funds through economic recessions, financial crises, and high growth periods. Each creates unique challenges, especially for the uninitiated. Our experience across multiple market cycles in global markets gives us the competence to navigate any environment.", ctaLabel: 'Explore Growth Capital', ctaHref: '/borrowers' },
  { title: 'Aligned Partnership', body: "Conflict-Free by Design — Many capital providers also run advisory businesses or mix equity alongside debt in the same fund. We don't. Our exclusive focus on funds management eliminates those conflicts, so every decision we make is driven by one thing: what's right for you.", ctaLabel: 'About our Funds', ctaHref: '/investors' },
  { title: 'Market-Leading Diversification', body: "PCG offers a level of diversification and risk management that is unique in the New Zealand market. This scale allows us to provide genuine downside protection for investors while offering borrowers the stability of an institutional-grade platform.", ctaLabel: 'About our Funds', ctaHref: '/investors' },
];
