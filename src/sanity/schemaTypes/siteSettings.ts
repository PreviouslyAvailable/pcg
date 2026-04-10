import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter Heading',
      type: 'string',
    }),
    defineField({
      name: 'newsletterBody',
      title: 'Newsletter Body',
      type: 'text',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
