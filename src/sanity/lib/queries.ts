import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const PRODUCT_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    productCategory->{
      title,
      slug,
      headline,
    },
    summary,
    imageGallery[]{
      "_key": asset->_key,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt,
      caption,
    },
    printMethods,
    productAttributes[]->{
      _id,
      title,
      description,
      image {
        "id": asset->_id,
        "url": asset->url,
      },
    },
    blocks[]{
      ...,
      _type == 'oneColumn' => {
        body,
        image {
          "url": asset->url,
          alt,
          caption,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
        },
      },
      _type == 'threeColumn' => {
        columns[]{
          _type == 'textColumn' => {
            ...,
            eyebrow,
            body,
            textSize,
          },
          _type == 'imageColumn' => {
            ...,
            image {
              "url": asset->url,
              alt,
              caption,
              "width": asset->metadata.dimensions.width,
              "height": asset->metadata.dimensions.height,
            },
          },
        }
      },
    },
    editor {
      id,
      slug,
    },
    seo {
      title,
      description,
    },
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
