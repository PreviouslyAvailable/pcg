import { defineField, defineType } from 'sanity'

export const insightsPage = defineType({
  name: 'insightsPage',
  title: 'Insights Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Name (Browser Tab)',
      type: 'string',
      description: 'Appears in the browser tab and search results',
    }),
    defineField({
      name: 'slug',
      title: 'Page URL',
      type: 'string',
      description: 'The URL path for this page (e.g. /insights)',
      initialValue: '/insights',
    }),
    defineField({
      name: 'heading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'recentInsightsHeading',
      title: 'Recent Insights Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'educationalResourcesHeading',
      title: 'Educational Resources Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'allInsightsHeading',
      title: 'All Insights Section Heading',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Insights Page' }
    },
  },
})
