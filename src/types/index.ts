import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface PrintMethod {
  title?: string
  description?: string
  summary?: PortableTextBlock[]
}

export interface ProductAttribute {
  _key: string
  title?: string
  description?: string
  image?: {
    url: string
  }
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface ProductPayload {
  _id: string
  _type: string
  title?: string
  slug?: string
  description?: string
  productCategory?: {
    title?: string
    slug?: string
    headline?: string
  }
  summary?: PortableTextBlock[]
  imageGallery: {
    _key: string
    url: string
    width: number
    height: number
    alt?: string
    caption?: string
  }[]
  printMethods?: PrintMethod[]
  productAttributes?: ProductAttribute[]
  blocks?: PortableTextBlock[]
  editor?: {
    id?: string
    slug?: string
  }
  seo?: {
    title?: string
    description?: string
  }
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
