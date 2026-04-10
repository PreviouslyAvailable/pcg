// ─── Base ────────────────────────────────────────────────────────────────────

export interface SanityImageAsset {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; width: number; height: number }
  alt?: string
}

export interface SanityImage {
  asset?: {
    _id: string
    url: string
    metadata?: { dimensions?: { width: number; height: number } }
  }
  hotspot?: { x: number; y: number; width: number; height: number }
  alt?: string
  caption?: string
}

// ─── Author / Post ───────────────────────────────────────────────────────────

export interface Author {
  name: string
  role?: string
  image?: SanityImageAsset
}

export interface PostSummary {
  _id: string
  title: string
  slug: string
  category?: string
  publishedAt: string
  mainImage?: SanityImageAsset
  excerpt?: string
}

export interface PostFull extends PostSummary {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
  author?: Author
}

// ─── Team & Settings ─────────────────────────────────────────────────────────

export interface CaseStudy {
  _id: string
  company: string
  industry?: string
  quote: string
  attribution?: string
  image?: SanityImage
}

export interface TeamMember {
  _id: string
  name: string
  role?: string
  image?: SanityImage
  bio?: string
  linkedIn?: string
}

export interface SiteSettings {
  newsletterHeading?: string
  newsletterBody?: string
  footerTagline?: string
}

// ─── Page Types ──────────────────────────────────────────────────────────────

export interface HomePage {
  hero?: {
    heading?: string
    subtext?: string
    backgroundImage?: SanityImage
  }
  introSection?: {
    heading?: string
    subheading?: string
    featureCards?: Array<{ title?: string; body?: string }>
  }
  investorsSection?: {
    heading?: string
    headingMobile?: string
    body?: string
    bulletPoints?: string[]
    ctaLabel?: string
    ctaLabelMobile?: string
    ctaHref?: string
    image?: SanityImage
  }
  caseStudy?: {
    label?: string
    heading?: string
    body?: string
    image?: SanityImage
    ctaLabel?: string
    ctaHref?: string
  }
  quoteBanner?: {
    quote?: string
    image?: SanityImage
  }
  howDifferentSection?: {
    heading?: string
    items?: Array<{
      step?: string
      title?: string
      body?: string
      image?: SanityImage
    }>
  }
  ctaBannerBottom?: {
    heading?: string
    ctaLabel?: string
    ctaHref?: string
  }
}

export interface AboutPage {
  hero?: {
    heading?: string
    subtext?: string
    image?: SanityImage
    imageAlt?: string
  }
  story?: {
    heading?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any[]
    image?: SanityImage
    ctaLabel?: string
    ctaHref?: string
  }
  featureCards?: Array<{
    title?: string
    body?: string
    ctaLabel?: string
    ctaHref?: string
  }>
  quoteBanner?: {
    quote?: string
    image?: SanityImage
  }
  executiveTeam?: TeamMember[]
  boardOfDirectors?: TeamMember[]
}

export interface BorrowersPage {
  hero?: {
    heading?: string
    subtext?: string
    image?: SanityImage
  }
  whyPCG?: Array<{ title?: string; body?: string }>
  quoteBanner?: {
    quote?: string
    image?: SanityImage
  }
  lendingFocus?: {
    heading?: string
    items?: Array<{ title?: string; body?: string }>
    image?: SanityImage
  }
  howWeWork?: Array<{
    step?: string
    title?: string
    body?: string
    image?: SanityImage
    imageLeft?: boolean
    cta?: { label?: string; href?: string }
  }>
  ctaBanner?: {
    heading?: string
    ctaLabel?: string
    ctaHref?: string
  }
}

export interface InvestorsPage {
  hero?: {
    heading?: string
    subtext?: string
    image?: SanityImage
  }
  investmentOpportunity?: {
    heading?: string
    items?: Array<{ title?: string; body?: string }>
  }
  fundDetails?: Array<{ label?: string; value?: string }>
  secondFundName?: string
  secondFundDetails?: Array<{ label?: string; value?: string }>
  activeInvestorPlus?: {
    items?: Array<{ title?: string; body?: string }>
  }
  quoteBanner?: {
    quote?: string
    image?: SanityImage
  }
  ctaBanner?: {
    heading?: string
    ctaLabel?: string
    ctaHref?: string
  }
}

export interface StrategiesPage {
  hero?: {
    heading?: string
    subtext?: string
    image?: SanityImage
  }
  coreStrategyLabel?: string
  coreStrategyHeading?: string
  strategies?: Array<{ title?: string; body?: string }>
  sectorFocus?: {
    heading?: string
    items?: Array<{ title?: string; body?: string }>
    image?: SanityImage
  }
  lendingCriteria?: {
    heading?: string
    subtext?: string
    rows?: Array<{ feature?: string; criteria?: string }>
  }
  coreLendingAreas?: Array<{ title?: string; body?: string }>
  riskFramework?: {
    heading?: string
    items?: Array<{ title?: string; body?: string }>
    image?: SanityImage
  }
  quoteBanner?: {
    quote?: string
    image?: SanityImage
  }
  ctaBanner?: {
    heading?: string
    ctaLabel?: string
    ctaHref?: string
  }
}

export interface ContactPage {
  hero?: {
    heading?: string
    subtext?: string
  }
  offices?: Array<{
    name?: string
    addressLines?: string[]
    image?: SanityImage
  }>
  quoteBanner?: {
    quote?: string
    image?: SanityImage
  }
}
