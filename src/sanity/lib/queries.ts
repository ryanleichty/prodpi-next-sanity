import { groq } from 'next-sanity'

const ONE_COLUMN_BLOCK_QUERY = groq`_type == 'oneColumn' => {
  _type,
  _key,
  body,
  image {
    "url": asset->url,
    alt,
    caption,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
  },
}`

const TWO_COLUMN_BLOCK_QUERY = groq`_type == 'twoColumn' => {
  _type,
  _key,
  columns[]{
    body,
    image {
      "url": asset->url,
      alt,
      caption,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
    },
  }
}`

const THREE_COLUMN_BLOCK_QUERY = groq`_type == 'threeColumn' => {
  _type,
  _key,
  columns[]{
    _type == 'textColumn' => {
      _type,
      _key,
      eyebrow,
      body,
      textSize,
    },
    _type == 'imageColumn' => {
      _type,
      _key,
      image {
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        alt,
        caption,
      },
    },
  }
}`

export const HOME_QUERY = groq`*[_type == "home"][0]{
  _id,
  _type,
  title,
  description,
  blocks[]{
    ${ONE_COLUMN_BLOCK_QUERY},
    ${TWO_COLUMN_BLOCK_QUERY},
    ${THREE_COLUMN_BLOCK_QUERY},
  },
}`

export const PRODUCT_QUERY = groq`*[ _type == "product" && slug.current == $slug ][0]{
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
  productCategory->{
    title,
    "slug": slug.current,
    headline,
  },
  summary,
  imageGallery[]{
    _key,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    alt,
    caption,
  },
  printMethods[]{
    _key,
    _type,
    "title": @->title,
    "description": @->description,
    "summary": @->summary,
  },
  productAttributes[]{
    _key,
    "title": @->title,
    "description": @->description,
    "image": @->image{
      "url": asset->url,
    },
  },
  blocks[]{
    _type == 'block' => {
      ...,
    },
    ${ONE_COLUMN_BLOCK_QUERY},
    ${TWO_COLUMN_BLOCK_QUERY},
    ${THREE_COLUMN_BLOCK_QUERY},
  },
  editor {
    id,
    slug,
  },
  seo {
    title,
    description,
  },
}`

export const PRODUCT_SETTINGS_QUERY = groq`*[_type == "productSettings"][0]{
  _id,
  _type,
  brandSummary {
    eyebrow,
    title,
    attributes[]{
      _key,
      "title": @->title,
      "description": @->description,
    },
  },
  brandAttributes[]{
    _key,
    "title": @->title,
    "description": @->description,
  },
}`

export const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
  _id,
  _type,
  ogImage,
  navigation[]{
    _key,
    title,
    url,
    link->{
      _type,
      title,
      "slug": select(
        _type == 'product' => productCategory->slug.current + "/" + slug.current,
        slug.current
      ),
    },
    children[]{
      _type == 'imageItem' => {
        _type,
        _key,
        image,
        title,
        url,
        link->{
          _type,
          title,
          "slug": select(
            _type == 'product' => productCategory->slug.current + "/" + slug.current,
            slug.current
          ),
        },
      },
      _type == 'listItem' => {
        _type,
        _key,
        title,
        links[] {
          _key,
          title,
          url,
          link->{
            _type,
            title,
            "slug": select(
              _type == 'product' => productCategory->slug.current + "/" + slug.current,
              slug.current
            ),
          },
        },
      },
    },
  }
}`
