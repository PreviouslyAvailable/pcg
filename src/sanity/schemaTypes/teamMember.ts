import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'memberType',
      title: 'Member Type',
      description: 'Select one or both. People can belong to the Executive Team, the Board of Directors, or both.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Executive Team', value: 'executive' },
          { title: 'Board of Directors', value: 'board' },
        ],
        layout: 'grid',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      memberType: 'memberType',
      media: 'image',
    },
    prepare({ title, memberType }: { title: string; memberType?: string[] }) {
      const labels: Record<string, string> = {
        executive: 'Executive Team',
        board: 'Board of Directors',
      }
      const subtitle = (memberType ?? []).map((value) => labels[value] ?? value).join(' + ')
      return { title, subtitle }
    },
  },
})
