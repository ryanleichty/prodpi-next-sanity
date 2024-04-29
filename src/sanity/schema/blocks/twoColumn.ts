import { BlockElementIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'twoColumn',
  title: 'Two Column',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: 'array',
      name: 'columns',
      title: 'Columns',
      of: [
        defineField({
          type: 'object',
          name: 'column',
          title: 'Column',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (rule) => rule.warning('Alt text is required'),
                }),
              ],
              preview: {
                select: {
                  title: 'asset.originalFilename',
                  media: 'asset',
                },
              },
            }),
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
                    decorators: [{ title: 'Italic', value: 'em' }],
                  },
                }),
              ],
            }),
          ],
        }),
      ],
      validation: (rule) => rule.length(2).required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Two Column',
      }
    },
  },
})
