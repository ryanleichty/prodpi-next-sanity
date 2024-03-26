import { type DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { type SanityDocument } from 'sanity'

// Customize this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument & { slug?: { current?: string } }) {
  return doc?.slug?.current
    ? `${window.location.origin}/products/${doc.slug.current}`
    : new Error('Missing slug')
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
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
