import { ProductPayload } from '@/types'
import { cx } from '@/utils'
import ProductBlocks from '@/components/ProductBlocks'
import { PortableText, createDataAttribute } from 'next-sanity'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { stegaClean } from '@sanity/client/stega'
import Button from '@/components/Button'

type Props = {
  product: ProductPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Product({ product, encodeDataAttribute }: Props) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    _id,
    _type,
    title,
    description,
    productCategory,
    summary,
    imageGallery,
    productAttributes,
    blocks,
  } = product ?? {}

  const attr = createDataAttribute({
    id: _id,
    type: _type,
  })

  return (
    <div className="px-container">
      <div className="mx-auto max-w-container">
        <section className="grid grid-cols-[320px_1fr] gap-16">
          <div>
            {productCategory && (
              <div
                data-sanity={attr('productCategory')}
                className="font-sans-wide uppercase tracking-wide text-brass"
              >
                {stegaClean(productCategory.title)}
              </div>
            )}
            {title && <h1 className="mb-8 mt-4 font-sans-wide text-4xl">{title}</h1>}
            {description && <p className="text-sm">{description}</p>}
            <Button className="w-full">Shop Now</Button>
            <p className="mt-2 text-[gray]">Starts from $1.35</p>
            <div>
              <h2>How it’s printed</h2>
            </div>
          </div>
          <div>
            {imageGallery && imageGallery.length > 0 && (
              <div>
                <div
                  className="flex h-[600px] gap-8 overflow-x-auto"
                  data-sanity={attr('imageGallery')}
                >
                  {imageGallery.map((image, index) => {
                    return (
                      // eslint-disable-next-line
                      <img
                        className="h-full w-full object-cover"
                        key={image._key}
                        src={image.url}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                      />
                    )
                  })}
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
            <div className="flex gap-8" data-sanity={attr('productAttributes')}>
              {productAttributes?.map(({ _key, title, description, image }) => (
                <div key={_key} className="bg-sand px-10 py-12 text-center">
                  {/* eslint-disable-next-line */}
                  {image && <img className="mx-auto mb-6 size-12" src={image.url} />}
                  <h3 className="font-sans-wide text-xl">{stegaClean(title)}</h3>
                  <p className="mt-2">{stegaClean(description)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {blocks && (
          <div className="my-16 space-y-8">
            <ProductBlocks page={{ _id, _type }} blocks={blocks} />
          </div>
        )}
      </div>
    </div>
  )
}
