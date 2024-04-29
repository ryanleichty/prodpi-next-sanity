import { TEXT_LENGTH_MD, TEXT_LENGTH_XS } from '@/constants'
import { BlockElementIcon, ImageIcon, TextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'threeColumn',
  title: 'Three Column',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: 'array',
      name: 'columns',
      title: 'Columns',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'imageColumn',
          title: 'Image Column',
          icon: ImageIcon,
          preview: {
            prepare() {
              return {
                title: 'Image Column',
              }
            },
          },
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
                defineField({
                  name: 'caption',
                  title: 'Caption',
                  type: 'string',
                  validation: (rule) => rule.max(TEXT_LENGTH_MD),
                }),
              ],
              preview: {
                select: {
                  title: 'asset.originalFilename',
                  media: 'asset',
                },
              },
            }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'textColumn',
          title: 'Text Column',
          icon: TextIcon,
          preview: {
            prepare() {
              return {
                title: 'Text Column',
              }
            },
          },
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow',
              type: 'string',
              validation: (rule) => rule.max(TEXT_LENGTH_XS),
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
                    decorators: [{ title: 'Strong', value: 'strong' }],
                  },
                }),
              ],
            }),
            defineField({
              name: 'textSize',
              title: 'Text Size',
              type: 'string',
              initialValue: 'normal',
              options: {
                list: [
                  { title: 'Normal', value: 'normal' },
                  { title: 'Large', value: 'large' },
                ],
                layout: 'radio',
              },
            }),
          ],
        }),
      ],
      validation: (rule) => rule.length(3),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Three Column',
      }
    },
  },
})
