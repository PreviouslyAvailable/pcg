import { groq } from 'next-sanity'

/** Shared SEO projection (metaTitle, metaDescription, noIndex, ogImage) */
const seoProjection = `seo {
  metaTitle,
  metaDescription,
  noIndex,
  ogImage { ..., asset->{ _id, url, metadata { dimensions } } }
}`

/** All posts, newest first */
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    mainImage { ..., asset->, "alt": alt },
    excerpt
  }
`

/** Full post by slug */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    mainImage { ..., asset->, "alt": alt },
    excerpt,
    body,
    author-> {
      name,
      role,
      image
    },
    ${seoProjection}
  }
`

/** Related posts (newest 3, excluding current slug) */
export const relatedPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && slug.current != $slug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    mainImage { ..., asset->, "alt": alt },
    excerpt
  }
`

/** Slugs only — for generateStaticParams */
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`

// ─── Page Queries ────────────────────────────────────────────────────────────

const imageProjection = `{ ..., asset->{ _id, url, metadata { dimensions } } }`

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    pageTitle,
    ${seoProjection},
    hero {
      heading,
      subtext,
      backgroundImage ${imageProjection},
      backgroundImage2 ${imageProjection},
      backgroundImage3 ${imageProjection}
    },
    introSection {
      eyebrow,
      borrowers {
        heading,
        body,
        ctaLabel,
        ctaHref,
        image ${imageProjection}
      },
      investors {
        heading,
        body,
        ctaLabel,
        ctaHref,
        image ${imageProjection}
      },
      featureCards[] { title, body, ctaLabel, ctaHref }
    },
    statsSection {
      heading,
      stats[] { value, label, description }
    },
    howDifferentSection {
      heading,
      items[] {
        step,
        title,
        body,
        image ${imageProjection}
      }
    },
    investorsSection {
      heading,
      headingMobile,
      content,
      ctaLabel,
      ctaLabelMobile,
      ctaHref,
      image ${imageProjection}
    },
    quoteBanner {
      quote,
      image ${imageProjection}
    },
    ctaBannerBottom {
      heading,
      ctaLabel,
      ctaHref
    }
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    pageTitle,
    ${seoProjection},
    hero {
      heading,
      subtext,
      image ${imageProjection},
      imageAlt
    },
    story {
      heading,
      body,
      image ${imageProjection},
      ctaLabel,
      ctaHref
    },
    featureCards[] { title, body, ctaLabel, ctaHref },
    quoteBanner {
      quote,
      image ${imageProjection}
    },
    executiveTeam[]-> {
      _id,
      name,
      role,
      image ${imageProjection},
      bio,
      linkedIn
    },
    boardOfDirectors[]-> {
      _id,
      name,
      role,
      image ${imageProjection},
      bio,
      linkedIn
    }
  }
`

export const borrowersPageQuery = groq`
  *[_type == "borrowersPage"][0] {
    pageTitle,
    ${seoProjection},
    hero {
      heading,
      subtext,
      image ${imageProjection}
    },
    whyPCG[] { title, body },
    quoteBanner {
      quote,
      image ${imageProjection}
    },
    lendingFocus {
      heading,
      items[] { title, body },
      image ${imageProjection}
    },
    howWeWork[] {
      step,
      title,
      body,
      image ${imageProjection},
      imageLeft,
      cta { label, href }
    },
    ctaBanner { heading, ctaLabel, ctaHref }
  }
`

export const investorsPageQuery = groq`
  *[_type == "investorsPage"][0] {
    pageTitle,
    ${seoProjection},
    hero {
      heading,
      subtext,
      image ${imageProjection}
    },
    investmentOpportunity {
      heading,
      items[] { title, body }
    },
    fundDetails[] { label, value },
    secondFundName,
    secondFundDetails[] { label, value },
    activeInvestorPlus {
      items[] { title, body }
    },
    quoteBanner {
      quote,
      image ${imageProjection}
    },
    ctaBanner { heading, ctaLabel, ctaHref }
  }
`

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    pageTitle,
    ${seoProjection},
    hero { heading, subtext },
    formRecipients { borrower, investor, advisor, fallback },
    offices[] {
      name,
      addressLines,
      image ${imageProjection}
    },
    quoteBanner {
      quote,
      image ${imageProjection}
    }
  }
`

export const contactRecipientsQuery = groq`
  *[_type == "contactPage"][0].formRecipients { borrower, investor, advisor, fallback }
`

export const insightsPageQuery = groq`
  *[_type == "insightsPage"][0] {
    pageTitle,
    ${seoProjection},
    slug,
    heading,
    recentInsightsHeading,
    educationalResourcesHeading,
    allInsightsHeading
  }
`

export const navLabelsQuery = groq`
  {
    "about":      { "label": *[_type == "aboutPage"][0].navLabel,      "slug": *[_type == "aboutPage"][0].slug },
    "borrowers":  { "label": *[_type == "borrowersPage"][0].navLabel,  "slug": *[_type == "borrowersPage"][0].slug },
    "investors":  { "label": *[_type == "investorsPage"][0].navLabel,  "slug": *[_type == "investorsPage"][0].slug },
    "insights":   { "label": *[_type == "insightsPage"][0].navLabel,   "slug": *[_type == "insightsPage"][0].slug },
    "contact":    { "label": *[_type == "contactPage"][0].navLabel,    "slug": *[_type == "contactPage"][0].slug },
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    newsletterHeading,
    newsletterBody,
    footerTagline,
    navLinks[] { label, href }
  }
`

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc, _createdAt asc) {
    _id,
    company,
    industry,
    quote,
    attribution,
    image ${imageProjection}
  }
`

export const executiveTeamQuery = groq`
  *[_type == "teamMember" && "executive" in memberType] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    image ${imageProjection},
    bio,
    linkedIn
  }
`

export const boardMembersQuery = groq`
  *[_type == "teamMember" && "board" in memberType] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    image ${imageProjection},
    bio,
    linkedIn
  }
`
