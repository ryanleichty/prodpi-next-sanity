import { BlockElementIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'oneColumn',
  title: 'One Column',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [{ title: 'Strong', value: 'strong' }],
          },
        }),
      ],
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
