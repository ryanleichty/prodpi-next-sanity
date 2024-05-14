import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface SettingsPayload {
  _id: string
  _type: string
  ogImage?: Image
  navigation?: MenuItem[]
}

export type MenuItem = {
  _key: string
  title?: string
  url?: string
  link?: {
    _type: string
    title: string
    slug: string
  }
  children?: ImageItem[] | ListItem[]
}

export type ImageItem = {
  _type: string
  _key: string
  image?: Image
  title?: string
  url?: string
  link?: {
    _type?: string
    title?: string
    slug?: string
  }
}

export type ListItem = {
  _type: string
  _key: string
  title?: string
  links?: {
    _key: string
    title?: string
    url?: string
    link?: {
      _type: string
      title?: string
      slug?: string
    }
  }[]
}

// Page payloads

export type PageData = {
  _id: string | undefined
  _type: string | undefined
}

export interface HomePagePayload {
  _id: string
  _type: string
  title?: string
  description?: string
  blocks: any
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
