import { TEXT_LENGTH_MD } from '@/constants'
import { SparkleIcon } from '@sanity/icons'
import { SanityDocument } from 'next-sanity'
import { defineField, defineType } from 'sanity'

export type BrandAttribute = {
  title: string
  description: string
} & SanityDocument

export default defineType({
  type: 'document',
  name: 'brandAttribute',
  title: 'Brand Attribute',
  icon: SparkleIcon,
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
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
