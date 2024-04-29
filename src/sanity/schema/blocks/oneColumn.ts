import { BlockElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'oneColumn',
  title: 'One Column',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Image',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'One Column',
      }
    },
  },
})
