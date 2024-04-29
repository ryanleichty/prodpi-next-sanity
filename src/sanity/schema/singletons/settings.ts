import { TEXT_LENGTH_MD } from '@/constants'
import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'The default title used for the website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'text',
      name: 'description',
      title: 'Description',
      rows: 5, // default: 10
      validation: (rule) => rule.max(TEXT_LENGTH_MD).required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
