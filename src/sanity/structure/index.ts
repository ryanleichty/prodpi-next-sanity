import home from '@/sanity/schema/singletons/home'
import settings from '@/sanity/schema/singletons/settings'
import { resolveHref } from '@/utils'
import { DocumentDefinition, SanityDocument } from 'sanity'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'
import products from './productStructure'
import { SparklesIcon } from '@sanity/icons'

export const structure: StructureResolver = (S, context) => {
  function singletonItem(typeDef: DocumentDefinition) {
    return S.listItem()
      .title(typeDef.title!)
      .icon(typeDef.icon)
      .child(S.editor().id(typeDef.name).schemaType(typeDef.name).documentId(typeDef.name))
  }

  return S.list()
    .id('root')
    .title('Content')
    .items([
      // Singletons
      singletonItem(home),
      singletonItem(settings),

      S.divider(),

      // Documents
      products(S, context),
      S.documentTypeListItem('productCategory').title('Product Categories'),
      S.documentTypeListItem('productAttribute').title('Product Attributes'),
      S.documentTypeListItem('printMethod').title('Print Methods'),
      S.divider(),
      S.documentTypeListItem('brandAttribute').title('Brand Attributes').icon(SparklesIcon),
    ])
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Only show preview pane on `product` schema type documents
  switch (schemaType) {
    case `product`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: {
              origin: 'same-origin',
              preview: (doc: SanityDocument) => getPreviewUrl(doc),
              draftMode: '/api/draft',
            },
            reload: {
              button: true,
            },
          })
          .title('Preview'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}

// Customize this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument & { slug?: { current?: string } }) {
  if (!doc?.slug?.current) {
    return new Error('Missing slug')
  }

  const urlPath = resolveHref(doc._type, doc.slug.current)

  return `${window.location.origin}${urlPath}`
}
