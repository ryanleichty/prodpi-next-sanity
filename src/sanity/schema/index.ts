// Singletons
import home from '@/sanity/schema/singletons/home'
import settings from '@/sanity/schema/singletons/settings'
import productSettings from '@/sanity/schema/singletons/productSettings'

// Documents
import product from '@/sanity/schema/documents/product'
import printMethod from '@/sanity/schema/documents/printMethod'
import productAttribute from './documents/productAttribute'
import productCategory from './documents/productCategory'
import brandAttribute from './documents/brandAttribute'

// Objects
import oneColumn from './blocks/oneColumn'
import twoColumn from './blocks/twoColumn'
import threeColumn from './blocks/threeColumn'

export const schemaTypes = [
  // Singletons
  home,
  settings,
  productSettings,

  // Documents
  product,
  productCategory,
  productAttribute,
  printMethod,
  brandAttribute,

  // Objects
  oneColumn,
  twoColumn,
  threeColumn,
]
