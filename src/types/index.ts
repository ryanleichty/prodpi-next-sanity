import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface SettingsPayload {
  ogImage?: Image
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

// Blocks

export type ProductBlocksData = Array<
  PortableTextBlock[] | ThreeColumnBlockData | OneColumnBlockData
>

export type OneColumnBlockData = {
  _type: string
  _key: string
  body?: PortableTextBlock[]
  image?: {
    url: string
    width: number
    height: number
    alt?: string
  }
}

export type ThreeColumnBlockData = {
  _type: string
  _key: string
  columns: Array<ImageColumnData | TextColumnData>
}

export type ImageColumnData = {
  _type: 'imageColumn'
  _key: string
  image?: {
    url: string
    width: number
    height: number
    alt?: string
  }
}

export type TextColumnData = {
  _type: 'textColumn'
  _key: string
  body?: PortableTextBlock[]
  eyebrow?: string
  textSize?: string
}
