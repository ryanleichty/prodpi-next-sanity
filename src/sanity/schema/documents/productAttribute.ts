import { TEXT_LENGTH_MD } from '@/constants'
import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'productAttribute',
  title: 'Product Attribute',
  icon: BlockContentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'text',
      name: 'description',
      title: 'Description',
      rows: 5, // default: 10
      validation: (rule) => rule.max(TEXT_LENGTH_MD).required(),
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
