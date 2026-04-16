import { defineField, defineType, defineArrayMember } from 'sanity'

const imageField = (name: string, title: string, withCaption = false) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ...(withCaption
        ? [defineField({ name: 'caption', title: 'Caption', type: 'string' })]
        : []),
    ],
  })

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'navLabel',
      title: 'Navigation Label',
      type: 'string',
      description: 'The name shown in the site navigation menu (e.g. "News")',
    }),
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
      description: 'The URL path for this page',
      initialValue: '/about',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
        imageField('image', 'Image', true),
        defineField({ name: 'imageAlt', title: 'Image Alt (legacy)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        imageField('image', 'Image'),
        defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
      ],
    }),
    defineField({
      name: 'featureCards',
      title: 'Feature Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
            defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
            defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'quoteBanner',
      title: 'Quote Banner',
      type: 'object',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text' }),
        imageField('image', 'Background Image'),
      ],
    }),
    defineField({
      name: 'executiveTeam',
      title: 'Executive Team',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'teamMember' }],
        }),
      ],
    }),
    defineField({
      name: 'boardOfDirectors',
      title: 'Board of Directors',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'teamMember' }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
