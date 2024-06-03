import { TEXT_LENGTH_MD } from '@/constants'
import { TagIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { ProductAttribute } from './productAttribute'
import { PrintMethod } from './printMethod'

export default defineType({
  type: 'document',
  name: 'product',
  title: 'Product',
  icon: TagIcon,
  groups: [
    {
      name: 'general',
      title: 'General',
    },
    {
      name: 'details',
      title: 'Details',
    },
    {
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'editor',
      title: 'Editor',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
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
      type: 'text',
      name: 'description',
      title: 'Description',
      rows: 5, // default: 10
      validation: (rule) => rule.max(TEXT_LENGTH_MD),
    }),
    defineField({
      type: 'reference',
      name: 'productCategory',
      title: 'Product Category',
      to: [{ type: 'productCategory' }],
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
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.warning('Alt text is required'),
            },
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
    defineField({
      title: 'Print Methods',
      name: 'printMethods',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'printMethod' }],
          options: {
            filter: ({ document }) => {
              const refList = (document?.printMethods as PrintMethod[]).map((doc) => {
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
      validation: (rule) => rule.unique(),
    }),
    defineField({
      title: 'Product Attributes',
      name: 'productAttributes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'productAttribute' }],
          options: {
            filter: ({ document }) => {
              const refList = (document?.productAttributes as ProductAttribute[]).map((doc) => {
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
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      group: 'editorial',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
          ],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        }),
        defineArrayMember({
          type: 'oneColumn',
        }),
        defineArrayMember({
          type: 'twoColumn',
        }),
        defineArrayMember({
          type: 'threeColumn',
        }),
      ],
    }),
    defineField({
      type: 'object',
      name: 'editor',
      title: 'Editor',
      group: 'editor',
      fields: [
        defineField({
          type: 'string',
          name: 'id',
          title: 'ID',
        }),
        defineField({
          type: 'string',
          name: 'slug',
          title: 'Slug',
        }),
      ],
    }),
    defineField({
      type: 'object',
      name: 'seo',
      title: 'SEO',
      group: 'seo',
      fields: [
        defineField({
          type: 'string',
          name: 'title',
          title: 'Title',
        }),
        defineField({
          type: 'string',
          name: 'description',
          title: 'Description',
        }),
        defineField({
          type: 'array',
          name: 'keywords',
          title: 'Keywords',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'productCategory.title',
      media: 'imageGallery.0.asset',
    },
  },
})
