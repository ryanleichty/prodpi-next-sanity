import { defineDocuments } from 'sanity/presentation'

// See: https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
export const mainDocuments = defineDocuments([
  {
    route: '/',
    filter: '_type == "home"',
  },
  {
    route: '/products/:slug',
    filter: '_type == "productCategory" && slug.current == $slug',
  },
  {
    route: '/products/:productCategory/:slug',
    filter: '_type == "product" && slug.current == $slug',
  },
])
