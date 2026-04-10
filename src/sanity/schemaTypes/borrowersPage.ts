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

export const borrowersPage = defineType({
  name: 'borrowersPage',
  title: 'Borrowers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
        imageField('image', 'Image', true),
      ],
    }),
    defineField({
      name: 'whyPCG',
      title: 'Why Choose PCG',
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
      name: 'quoteBanner',
      title: 'Quote Banner',
      type: 'object',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text' }),
        imageField('image', 'Background Image'),
      ],
    }),
    defineField({
      name: 'lendingFocus',
      title: 'Our Lending Focus',
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
                defineField({ name: 'body', title: 'Body', type: 'text' }),
              ],
            }),
          ],
        }),
        imageField('image', 'Image'),
      ],
    }),
    defineField({
      name: 'howWeWork',
      title: 'How We Work',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text' }),
            imageField('image', 'Image'),
            defineField({ name: 'imageLeft', title: 'Image on Left', type: 'boolean' }),
            defineField({
              name: 'cta',
              title: 'CTA',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'href', title: 'Href', type: 'string' }),
              ],
            }),
          ],
        }),
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
      return { title: 'Borrowers Page' }
    },
  },
})
