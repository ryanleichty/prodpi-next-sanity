'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { locate } from '@/sanity/presentation/locate'
import { singletonPlugin } from '@/sanity/plugins/settings'
import { schemaTypes } from '@/sanity/schema'
import home from '@/sanity/schema/singletons/home'
import settings from '@/sanity/schema/singletons/settings'
import { structure, defaultDocumentNode } from '@/sanity/structure'

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
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
