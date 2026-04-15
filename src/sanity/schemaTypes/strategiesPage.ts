import { defineField, defineType, defineArrayMember } from 'sanity'

const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    ],
  })

export const strategiesPage = defineType({
  name: 'strategiesPage',
  title: 'Strategies Page',
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
      description: 'The URL path for this page',
      initialValue: '/strategies',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
        imageField('image', 'Image'),
      ],
    }),
    defineField({
      name: 'coreStrategyLabel',
      title: 'Core Strategy Label',
      type: 'string',
    }),
    defineField({
      name: 'coreStrategyHeading',
      title: 'Core Strategy Heading',
      type: 'string',
    }),
    defineField({
      name: 'strategies',
      title: 'Strategies',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'sectorFocus',
      title: 'Sector Focus',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
              ],
            }),
          ],
        }),
        imageField('image', 'Image'),
      ],
    }),
    defineField({
      name: 'lendingCriteria',
      title: 'Lending Criteria',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'feature', title: 'Feature', type: 'string' }),
                defineField({ name: 'criteria', title: 'Criteria', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'coreLendingAreas',
      title: 'Core Lending Areas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'riskFramework',
      title: 'Risk Management Framework',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
              ],
            }),
          ],
        }),
        imageField('image', 'Image'),
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
      name: 'ctaBanner',
      title: 'CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Strategies Page' }
    },
  },
})
