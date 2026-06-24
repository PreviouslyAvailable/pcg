import { cache } from 'react'
import { client } from './client'
import {
  homePageQuery,
  postsQuery,
  aboutPageQuery,
  executiveTeamQuery,
  boardMembersQuery,
  borrowersPageQuery,
  investorsPageQuery,
  contactPageQuery,
  insightsPageQuery,
  postBySlugQuery,
  relatedPostsQuery,
  postSlugsQuery,
  navLabelsQuery,
  siteSettingsQuery,
  caseStudiesQuery,
} from './queries'
import type {
  HomePage,
  PostSummary,
  AboutPage,
  TeamMember,
  BorrowersPage,
  InvestorsPage,
  ContactPage,
  InsightsPage,
  PostFull,
  SiteSettings,
  CaseStudy,
} from './types'

export const getHomePage = cache(() =>
  client.fetch<HomePage>(homePageQuery).catch(() => null),
)

export const getPosts = cache(() =>
  client.fetch<PostSummary[]>(postsQuery).catch(() => [] as PostSummary[]),
)

export const getAboutPage = cache(() =>
  client.fetch<AboutPage>(aboutPageQuery).catch(() => null),
)

export const getExecutiveTeam = cache(() =>
  client.fetch<TeamMember[]>(executiveTeamQuery).catch(() => null),
)

export const getBoardMembers = cache(() =>
  client.fetch<TeamMember[]>(boardMembersQuery).catch(() => null),
)

export const getBorrowersPage = cache(() =>
  client.fetch<BorrowersPage>(borrowersPageQuery).catch(() => null),
)

export const getInvestorsPage = cache(() =>
  client.fetch<InvestorsPage>(investorsPageQuery).catch(() => null),
)

export const getContactPage = cache(() =>
  client.fetch<ContactPage>(contactPageQuery).catch(() => null),
)

export const getInsightsPage = cache(() =>
  client.fetch<InsightsPage>(insightsPageQuery).catch(() => null),
)

export const getPostBySlug = cache((slug: string) =>
  client.fetch<PostFull | null>(postBySlugQuery, { slug }).catch(() => null),
)

export const getRelatedPosts = cache((slug: string) =>
  client.fetch<PostSummary[]>(relatedPostsQuery, { slug }).catch(() => [] as PostSummary[]),
)

export const getPostSlugs = cache(() =>
  client.fetch<{ slug: string }[]>(postSlugsQuery).catch(() => []),
)

export interface NavLabels {
  about?: { label?: string; slug?: string }
  borrowers?: { label?: string; slug?: string }
  investors?: { label?: string; slug?: string }
  insights?: { label?: string; slug?: string }
  contact?: { label?: string; slug?: string }
}

export const getNavLabels = cache(() =>
  client.fetch<NavLabels>(navLabelsQuery).catch(() => null),
)

export const getSiteSettings = cache(() =>
  client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
)

export const getCaseStudies = cache(() =>
  client.fetch<CaseStudy[]>(caseStudiesQuery).catch(() => [] as CaseStudy[]),
)
