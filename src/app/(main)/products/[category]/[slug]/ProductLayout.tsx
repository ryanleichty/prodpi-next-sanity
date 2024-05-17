import { BrandAttributePayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { createDataAttribute } from 'next-sanity'

type Props = {
  data: BrandAttributePayload | null
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
  const { _id, _type, brandAttributes } = data ?? {}

  const groupedBrandAttributes = [[], []] as [BrandAttribute[], BrandAttribute[]]
  brandAttributes?.forEach((v, i) => {
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
          <div className="font-sans-wide uppercase tracking-widest text-brass">Our mission</div>
          <h2 className="@xl:text-6xl/tight mt-6 font-serif text-5xl/tight uppercase">
            Top of the line products <span className="normal-case italic">for your</span> creative
            vision
          </h2>
        </div>
        {groupedBrandAttributes.flat().length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2" data-sanity={attr('brandAttributes')}>
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
