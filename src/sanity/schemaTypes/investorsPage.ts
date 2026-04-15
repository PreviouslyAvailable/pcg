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

export const investorsPage = defineType({
  name: 'investorsPage',
  title: 'Investors Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Page URL',
      type: 'string',
      description: 'The URL path for this page',
      initialValue: '/investors',
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
      name: 'investmentOpportunity',
      title: 'Investment Opportunity',
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
      ],
    }),
    defineField({
      name: 'fundDetails',
      title: 'Fund Details (NZPDF)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'secondFundName',
      title: 'Second Fund Name',
      type: 'string',
    }),
    defineField({
      name: 'secondFundDetails',
      title: 'Second Fund Details',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'activeInvestorPlus',
      title: 'Active Investor Plus Programme',
      type: 'object',
      fields: [
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
      return { title: 'Investors Page' }
    },
  },
})
