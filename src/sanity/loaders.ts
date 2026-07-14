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

function logLoaderError(name: string, error: unknown) {
  console.error(`[sanity/${name}]`, error)
}

export const getHomePage = cache(() =>
  client.fetch<HomePage>(homePageQuery).catch((error) => {
    logLoaderError('getHomePage', error)
    return null
  }),
)

export const getPosts = cache(() =>
  client.fetch<PostSummary[]>(postsQuery).catch((error) => {
    logLoaderError('getPosts', error)
    return [] as PostSummary[]
  }),
)

export const getAboutPage = cache(() =>
  client.fetch<AboutPage>(aboutPageQuery).catch((error) => {
    logLoaderError('getAboutPage', error)
    return null
  }),
)

export const getExecutiveTeam = cache(() =>
  client.fetch<TeamMember[]>(executiveTeamQuery).catch((error) => {
    logLoaderError('getExecutiveTeam', error)
    return null
  }),
)

export const getBoardMembers = cache(() =>
  client.fetch<TeamMember[]>(boardMembersQuery).catch((error) => {
    logLoaderError('getBoardMembers', error)
    return null
  }),
)

export const getBorrowersPage = cache(() =>
  client.fetch<BorrowersPage>(borrowersPageQuery).catch((error) => {
    logLoaderError('getBorrowersPage', error)
    return null
  }),
)

export const getInvestorsPage = cache(() =>
  client.fetch<InvestorsPage>(investorsPageQuery).catch((error) => {
    logLoaderError('getInvestorsPage', error)
    return null
  }),
)

export const getContactPage = cache(() =>
  client.fetch<ContactPage>(contactPageQuery).catch((error) => {
    logLoaderError('getContactPage', error)
    return null
  }),
)

export const getInsightsPage = cache(() =>
  client.fetch<InsightsPage>(insightsPageQuery).catch((error) => {
    logLoaderError('getInsightsPage', error)
    return null
  }),
)

export const getPostBySlug = cache((slug: string) =>
  client.fetch<PostFull | null>(postBySlugQuery, { slug }).catch((error) => {
    logLoaderError('getPostBySlug', error)
    return null
  }),
)

export const getRelatedPosts = cache((slug: string) =>
  client.fetch<PostSummary[]>(relatedPostsQuery, { slug }).catch((error) => {
    logLoaderError('getRelatedPosts', error)
    return [] as PostSummary[]
  }),
)

export const getPostSlugs = cache(() =>
  client.fetch<{ slug: string }[]>(postSlugsQuery).catch((error) => {
    logLoaderError('getPostSlugs', error)
    return []
  }),
)

export interface NavLabels {
  about?: { label?: string; slug?: string }
  borrowers?: { label?: string; slug?: string }
  investors?: { label?: string; slug?: string }
  insights?: { label?: string; slug?: string }
  contact?: { label?: string; slug?: string }
}

export const getNavLabels = cache(() =>
  client.fetch<NavLabels>(navLabelsQuery).catch((error) => {
    logLoaderError('getNavLabels', error)
    return null
  }),
)

export const getSiteSettings = cache(() =>
  client.fetch<SiteSettings>(siteSettingsQuery).catch((error) => {
    logLoaderError('getSiteSettings', error)
    return null
  }),
)

export const getCaseStudies = cache(() =>
  client.fetch<CaseStudy[]>(caseStudiesQuery).catch((error) => {
    logLoaderError('getCaseStudies', error)
    return [] as CaseStudy[]
  }),
)
