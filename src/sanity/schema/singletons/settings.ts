import { TEXT_LENGTH_MD } from '@/constants'
import { toTitleCase } from '@/sanity/utils/toTitleCase'
import { CogIcon, ImageIcon, LinkIcon, UlistIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { BrandAttribute } from '../documents/brandAttribute'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'general',
      title: 'General',
    },
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'The default title used for the website.',
      title: 'Title',
      type: 'string',
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
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      group: 'header',
      of: [
        defineArrayMember({
          name: 'menuItem',
          title: 'Menu Item',
          type: 'object',
          icon: LinkIcon,
          preview: {
            select: {
              title: 'title',
              linkTitle: 'link.title',
              docType: 'link._type',
              media: 'link.icon',
            },
            prepare({ title, linkTitle, docType, media }) {
              return {
                title: title ? title : linkTitle,
                subtitle: toTitleCase(docType),
                media,
              }
            },
          },
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: '(optional) Use a custom title.',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: '(optional) Use a custom URL.',
              validation: (rule) => rule.uri({ allowRelative: true }),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'reference',
              to: [{ type: 'product' }, { type: 'productCategory' }],
            }),
            defineField({
              name: 'children',
              title: 'Children',
              type: 'array',
              validation: (rule) => rule.max(4),
              of: [
                defineArrayMember({
                  name: 'listItem',
                  title: 'List Item',
                  type: 'object',
                  icon: UlistIcon,
                  preview: {
                    select: {
                      title: 'title',
                      linkTitle: 'link.title',
                    },
                    prepare({ title, linkTitle }) {
                      return {
                        title: title ? title : linkTitle,
                        subtitle: 'List',
                      }
                    },
                  },
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'links',
                      title: 'Links',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          name: 'link',
                          title: 'Link',
                          type: 'object',
                          icon: LinkIcon,
                          preview: {
                            select: {
                              title: 'title',
                              linkTitle: 'link.title',
                            },
                            prepare({ title, linkTitle }) {
                              return {
                                title: title ? title : linkTitle,
                              }
                            },
                          },
                          fields: [
                            defineField({
                              name: 'title',
                              title: 'Title',
                              type: 'string',
                              description: '(optional) Use a custom title.',
                            }),
                            defineField({
                              name: 'url',
                              title: 'URL',
                              type: 'url',
                              description: '(optional) Use a custom URL.',
                              validation: (rule) => rule.uri({ allowRelative: true }),
                            }),
                            defineField({
                              name: 'link',
                              title: 'Link',
                              type: 'reference',
                              to: [{ type: 'product' }, { type: 'productCategory' }],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                defineArrayMember({
                  name: 'imageItem',
                  title: 'Image Item',
                  type: 'object',
                  icon: ImageIcon,
                  preview: {
                    select: {
                      title: 'title',
                      linkTitle: 'link.title',
                      media: 'image.asset',
                    },
                    prepare({ title, linkTitle, media }) {
                      return {
                        title: title ? title : linkTitle,
                        subtitle: 'Image',
                        media,
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
                    }),
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      description: '(optional) Use a custom title.',
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'url',
                      description: '(optional) Use a custom URL.',
                      validation: (rule) => rule.uri({ allowRelative: true }),
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'reference',
                      to: [{ type: 'product' }, { type: 'productCategory' }],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
