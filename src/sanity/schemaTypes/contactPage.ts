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

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
      initialValue: '/contact',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text' }),
      ],
    }),
    defineField({
      name: 'formRecipients',
      title: 'Contact Form Recipients (by enquiry type)',
      description:
        'Route contact form enquiries to different inboxes based on the enquiry type selected in the form. Set one or more addresses per type. If a type has no addresses, the Fallback / general list is used. If that is also empty, the site falls back to the CONTACT_TO_EMAIL server setting.',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'borrower',
          title: 'Borrower enquiries',
          type: 'array',
          of: [defineArrayMember({ type: 'string', validation: (Rule) => Rule.email() })],
          validation: (Rule) => Rule.unique(),
        }),
        defineField({
          name: 'investor',
          title: 'Investor enquiries',
          type: 'array',
          of: [defineArrayMember({ type: 'string', validation: (Rule) => Rule.email() })],
          validation: (Rule) => Rule.unique(),
        }),
        defineField({
          name: 'advisor',
          title: 'Professional Advisor enquiries',
          type: 'array',
          of: [defineArrayMember({ type: 'string', validation: (Rule) => Rule.email() })],
          validation: (Rule) => Rule.unique(),
        }),
        defineField({
          name: 'fallback',
          title: 'Fallback / general',
          description:
            'Used when the selected enquiry type has no specific recipients set above. Also acts as a catch-all for general enquiries.',
          type: 'array',
          of: [defineArrayMember({ type: 'string', validation: (Rule) => Rule.email() })],
          validation: (Rule) => Rule.unique(),
        }),
      ],
    }),
    defineField({
      name: 'offices',
      title: 'Offices',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({
              name: 'addressLines',
              title: 'Address Lines',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            imageField('image', 'Image'),
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
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
})
