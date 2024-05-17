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
      name: 'brandAttributes',
      title: 'Brand Attributes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'brandAttribute' }],
          options: {
            filter: ({ document }) => {
              const refList = (document?.brandAttributes as BrandAttribute[]).map((doc) => {
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
  preview: {
    prepare() {
      return {
        title: 'Product Settings',
      }
    },
  },
})
