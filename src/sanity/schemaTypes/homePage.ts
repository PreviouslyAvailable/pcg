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

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
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
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seo',
    }),
    defineField({
      name: 'slug',
      title: 'Page URL',
      type: 'string',
      description: 'The URL path for this page',
      initialValue: '/',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
        imageField('backgroundImage', 'Background Image'),
        imageField('backgroundImage2', 'Background Image 2 (optional)'),
        imageField('backgroundImage3', 'Background Image 3 (optional)'),
      ],
    }),
    defineField({
      name: 'introSection',
      title: 'What We Do Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
        defineField({
          name: 'borrowers',
          title: 'Borrowers Column',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
            defineField({ name: 'ctaLabel', title: 'Button Label', type: 'string' }),
            defineField({ name: 'ctaHref', title: 'Button Link', type: 'string' }),
            imageField('image', 'Image'),
          ],
        }),
        defineField({
          name: 'investors',
          title: 'Investors Column',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
            defineField({ name: 'ctaLabel', title: 'Button Label', type: 'string' }),
            defineField({ name: 'ctaHref', title: 'Button Link', type: 'string' }),
            imageField('image', 'Image'),
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
                defineField({ name: 'ctaLabel', title: 'Button Label', type: 'string' }),
                defineField({ name: 'ctaHref', title: 'Button Link', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'statsSection',
      title: 'Key Stats Band',
      description: 'Full-width band of up to 4 key statistics, shown between the "What We Do" and "Investors" sections.',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading (optional)',
          type: 'string',
          description: 'Optional heading shown above the stats.',
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          validation: (Rule) => Rule.max(4),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Stat Value',
                  type: 'string',
                  description: 'The headline figure, e.g. "$500M" or "20+"',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  description: 'Short label under the value, e.g. "Assets under management"',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description (optional)',
                  type: 'string',
                  description: 'Optional supporting line of text.',
                }),
              ],
              preview: {
                select: { title: 'value', subtitle: 'label' },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
        imageField('image', 'Image'),
        defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
      ],
    }),
    defineField({
      name: 'investorsSection',
      title: 'Investors Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading (Desktop)', type: 'string' }),
        defineField({ name: 'headingMobile', title: 'Heading (Mobile)', type: 'string' }),
        defineField({
          name: 'content',
          title: 'Content',
          description: 'Write body text and bullet points together using the rich text editor.',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
        }),
        defineField({ name: 'ctaLabel', title: 'Button Label (Desktop)', type: 'string' }),
        defineField({ name: 'ctaLabelMobile', title: 'Button Label (Mobile)', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'Button Link', type: 'string' }),
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
      name: 'howDifferentSection',
      title: 'How PCG Is Different Section',
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
                defineField({ name: 'step', title: 'Step', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
                imageField('image', 'Image'),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaBannerBottom',
      title: 'Bottom CTA Banner',
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
      return { title: 'Home Page' }
    },
  },
})
