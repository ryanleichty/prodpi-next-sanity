import { TEXT_LENGTH_MD } from '@/constants'
import { DropIcon } from '@sanity/icons'
import {
  PortableTextBlock,
  SanityDocument,
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

export type PrintMethod = {
  title: string
  description: string
  summary?: PortableTextBlock[]
} & SanityDocument

export default defineType({
  type: 'document',
  name: 'printMethod',
  title: 'Print Method',
  icon: DropIcon,
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
      name: 'summary',
      title: 'Summary',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        }),
      ],
    }),
  ],
})
