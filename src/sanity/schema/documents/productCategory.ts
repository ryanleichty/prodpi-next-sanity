import { TEXT_LENGTH_XS } from '@/constants'
import { SchemaIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'productCategory',
  title: 'Product Category',
  icon: SchemaIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'headline',
      title: 'Headline',
      validation: (rule) => rule.max(TEXT_LENGTH_XS),
    }),
  ],
})
