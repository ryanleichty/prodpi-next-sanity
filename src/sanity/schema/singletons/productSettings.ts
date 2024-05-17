import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { BrandAttribute } from '../documents/brandAttribute'

export default defineType({
  name: 'productSettings',
  title: 'Product Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'brandSummary',
      title: 'Brand Summary',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
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
          name: 'attributes',
          title: 'Attributes',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'brandAttribute' }],
              options: {
                filter: ({ document }) => {
                  const refList = document?.brandSummary?.attributes.map((doc) => {
                    return doc?._ref
                  })

                  return {
                    filter: '!(_id in $list) && !(_id in path("drafts.**"))',
                    params: { list: refList },
                  }
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Product Settings',
      }
    },
  },
})
