import { ProductSettingsPayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { PortableText, createDataAttribute } from 'next-sanity'

type Props = {
  data: ProductSettingsPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
  children?: React.ReactNode
}

type BrandAttribute = {
  _key: string
  title?: string
  description?: string
}

export function ProductLayout({ data, encodeDataAttribute, children }: Props) {
  // Default to an empty object to allow previews on non-existent documents
  const { _id, _type, brandSummary } = data ?? {}

  const groupedBrandAttributes = [[], []] as [BrandAttribute[], BrandAttribute[]]
  brandSummary?.attributes.forEach((v, i) => {
    groupedBrandAttributes[i % 2].push(v)
  })

  const attr = createDataAttribute({
    id: _id,
    type: _type,
  })

  return (
    <main className="pt-8 2xl:pb-16">
      {children}
      <section className="mx-auto grid w-full max-w-container gap-12 bg-pacific p-10 pt-20 text-white lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] xl:grid-cols-2">
        <div className="@container">
          {brandSummary?.eyebrow && (
            <div className="font-sans-wide uppercase tracking-widest text-brass">
              {brandSummary?.eyebrow}
            </div>
          )}

          {brandSummary?.title && (
            <div className="mt-6" data-sanity-edit-target>
              <PortableText
                value={brandSummary?.title}
                components={{
                  block: {
                    normal: ({ children }) => {
                      return (
                        <h2 className="@xl:text-6xl/tight font-serif text-5xl/tight italic">
                          {children}
                        </h2>
                      )
                    },
                  },
                  marks: {
                    strong: ({ children }) => {
                      return <span className="uppercase not-italic">{children}</span>
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
        {groupedBrandAttributes.flat().length > 0 && (
          <div
            className="mt-12 grid gap-4 sm:grid-cols-2"
            data-sanity={attr('brandSummary.attributes')}
          >
            {groupedBrandAttributes.map((group, index) => (
              <div key={index} className="flex flex-col justify-end gap-4">
                {group.map(({ _key, title, description }) => {
                  return (
                    <div className="bg-[#163239] p-8 pt-20" key={_key}>
                      <h3 className="font-sans-wide text-2xl font-light">{title}</h3>
                      <p className="mt-4 text-sage">{description}</p>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
