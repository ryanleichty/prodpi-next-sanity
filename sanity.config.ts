'use client'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { singletonPlugin } from '@/sanity/plugins/settings'
import { locate } from '@/sanity/presentation/locate'
import { schemaTypes } from '@/sanity/schema'
import home from '@/sanity/schema/singletons/home'
import settings from '@/sanity/schema/singletons/settings'
import { defaultDocumentNode, structure } from '@/sanity/structure'
import { CodeIcon, EyeOpenIcon } from '@sanity/icons'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { media } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'ProDPI',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    media(),
    presentationTool({
      locate,
      icon: EyeOpenIcon,
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
          disable: '/api/disable-draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion, icon: CodeIcon }),
  ],
})
