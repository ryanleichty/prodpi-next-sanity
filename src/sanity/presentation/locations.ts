import { map, Observable } from 'rxjs'
import { DocumentLocationResolver, DocumentLocationsState } from 'sanity/presentation'
import { resolveHref } from '@/utils'

const observableDocs = ['home', 'product', 'productCategory', 'productAttribute', 'printMethod']

const QUERY = `*[_id==$id || references($id)]{
  _type,
  "slug": select(
    _type == 'product' => productCategory->slug.current + "/" + slug.current,
    slug.current
  ),
  title
}`

type ObservableDocument = {
  _type: string
  slug: string
  title: string | null
}

// See: https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
export const locations: DocumentLocationResolver = (params, context) => {
  if (params.type === 'settings') {
    return {
      message: 'This document is used on all pages',
      tone: 'caution',
    } satisfies DocumentLocationsState
  }

  if (observableDocs.includes(params.type)) {
    const doc$ = context.documentStore.listenQuery(QUERY, params, {
      perspective: 'previewDrafts',
    }) as Observable<ObservableDocument[] | null>

    return doc$.pipe(
      map((docs) => {
        switch (params.type) {
          case 'home':
            return {
              locations: [
                {
                  title: docs?.find((doc) => doc._type === 'home')?.title || 'Home',
                  href: resolveHref(params.type)!,
                },
              ],
            } satisfies DocumentLocationsState
          case 'product':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug)
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .filter((doc) => doc.href !== undefined),
            } satisfies DocumentLocationsState
          case 'productCategory':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug)
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .filter((doc) => doc.href !== undefined),
            } satisfies DocumentLocationsState
          case 'productAttribute':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug)
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .filter((doc) => doc.href !== undefined),
            } satisfies DocumentLocationsState
          case 'printMethod':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug)
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  }
                })
                .filter((doc) => doc.href !== undefined),
            } satisfies DocumentLocationsState
          default:
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical',
            } satisfies DocumentLocationsState
        }
      }),
    )
  }

  return null
}
