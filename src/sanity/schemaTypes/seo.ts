import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  description:
    'Controls how this page appears in Google search results and when shared on social media. All fields are optional — sensible defaults are used when left blank.',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Search / Browser Title',
      type: 'string',
      description:
        'Overrides the title shown in the browser tab, search results, and link previews. Leave blank to use the Page Name. Aim for under 60 characters.',
      validation: (Rule) =>
        Rule.max(70).warning('Titles longer than ~60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'The summary shown under the title in Google and in social link previews. Aim for 150–160 characters.',
      validation: (Rule) =>
        Rule.max(160).warning('Descriptions longer than ~160 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Image shown when this page is shared on LinkedIn, Facebook, or X. Recommended size 1200×630px. Falls back to a site default if left blank.',
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description:
        'Turn on to ask Google and other search engines not to list this page. Leave off for normal pages.',
      initialValue: false,
    }),
  ],
})
