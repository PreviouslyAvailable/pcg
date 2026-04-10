import { groq } from 'next-sanity'

/** All posts, newest first */
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    mainImage { ..., "alt": alt },
    excerpt
  }
`

/** Posts filtered by category */
export const postsByCategoryQuery = groq`
  *[_type == "post" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    mainImage { ..., "alt": alt },
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
    mainImage { ..., "alt": alt },
    excerpt,
    body,
    author-> {
      name,
      role,
      image
    }
  }
`

/** Related posts (newest 3, excluding current slug) */
export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    mainImage { ..., "alt": alt },
    excerpt
  }
`

/** Slugs only — for generateStaticParams */
export const postSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`

// ─── Page Queries ────────────────────────────────────────────────────────────

const imageProjection = `{ ..., asset->{ _id, url, metadata { dimensions } } }`

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero {
      heading,
      subtext,
      backgroundImage ${imageProjection}
    },
    introSection {
      heading,
      subheading,
      featureCards[] { title, body }
    },
    caseStudy {
      label,
      heading,
      body,
      image ${imageProjection},
      ctaLabel,
      ctaHref
    },
    quoteBanner {
      quote,
      image ${imageProjection}
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
    ctaBannerBottom {
      heading,
      ctaLabel,
      ctaHref
    }
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
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

export const strategiesPageQuery = groq`
  *[_type == "strategiesPage"][0] {
    hero {
      heading,
      subtext,
      image ${imageProjection}
    },
    coreStrategyLabel,
    coreStrategyHeading,
    strategies[] { title, body },
    sectorFocus {
      heading,
      items[] { title, body },
      image ${imageProjection}
    },
    lendingCriteria {
      heading,
      subtext,
      rows[] { feature, criteria }
    },
    coreLendingAreas[] { title, body },
    riskFramework {
      heading,
      items[] { title, body },
      image ${imageProjection}
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
    hero { heading, subtext },
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

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    newsletterHeading,
    newsletterBody,
    footerTagline
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

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(_createdAt asc) {
    _id,
    name,
    role,
    image ${imageProjection},
    bio,
    linkedIn
  }
`
