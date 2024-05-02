import { ProductPayload } from '@/types'
import { cx } from '@/utils'
import ProductBlocks from './ProductBlocks'
import { PortableText } from 'next-sanity'
import { StudioPathLike } from '@sanity/react-loader'

type Props = {
  product: ProductPayload | null
  encodeDataAttribute: (path: StudioPathLike) => string | undefined
}

export default function Product({ product, encodeDataAttribute }: Props) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, description, productCategory, summary, imageGallery, productAttributes, blocks } =
    product ?? {}

  return (
    <div className="container">
      <section className="grid grid-cols-[320px_1fr] gap-16 py-8">
        <div>
          <div className="font-sans-wide uppercase tracking-wide text-brass">
            {productCategory?.title}
          </div>
          <h1 className="mb-8 mt-4 font-sans-wide text-4xl">{title}</h1>
          <p className="text-sm">{description}</p>
        </div>
        <div>
          {imageGallery && imageGallery.length > 0 && (
            <div>
              <div className="flex h-[600px] gap-8 overflow-x-auto">
                {imageGallery.map((image) => (
                  // eslint-disable-next-line
                  <img
                    key={image._key}
                    src={image.url}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    data-sanity={encodeDataAttribute?.(['imageGallery'])}
                  />
                ))}
              </div>
              <div className="mt-6 flex gap-1">
                {imageGallery.map((image, i) => (
                  <button
                    className={cx('h-0.5 w-8', i === 0 ? 'bg-black' : 'bg-black/10')}
                    key={image._key}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {summary && (
            <div className="mt-12" data-sanity-edit-target>
              <PortableText
                value={summary}
                components={{
                  block: {
                    normal: ({ children }) => {
                      return <p className="font-serif text-4xl italic">{children}</p>
                    },
                  },
                  marks: {
                    strong: ({ children }) => {
                      return (
                        <strong className="font-sans-wide font-light uppercase not-italic">
                          {children}
                        </strong>
                      )
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </section>
      {productAttributes?.length && (
        <section>
          <h2 className="font-serif text-sm italic">Why we like it</h2>
          <div className="flex gap-8">
            {productAttributes?.map(({ _id, title, description, image }) => (
              <div key={_id} className="bg-sand px-10 py-12 text-center">
                <img className="mx-auto mb-6 size-12" src={image.url} />
                <h3 className="font-sans-wide text-xl">{title}</h3>
                <p className="mt-2">{description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {blocks && (
        <div className="my-16 space-y-8">
          <ProductBlocks value={blocks} />
        </div>
      )}
    </div>
  )
}
