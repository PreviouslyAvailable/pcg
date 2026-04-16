import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Use this for fetches that must always be fresh (nav, settings etc.)
export const fetchOptions = { cache: 'no-store' } as const
