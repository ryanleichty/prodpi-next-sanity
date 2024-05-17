import { BrandAttributePayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { createDataAttribute } from 'next-sanity'

type Props = {
  data: BrandAttributePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
  children?: React.ReactNode
}

export function ProductLayout({ data, encodeDataAttribute, children }: Props) {
  // Default to an empty object to allow previews on non-existent documents
  const { _id, _type, brandAttributes } = data ?? {}

  const attr = createDataAttribute({
    id: _id,
    type: _type,
  })

  return (
    <main className="pb-16 pt-8">
      {children}
      <section className="mx-auto grid w-full max-w-container grid-cols-2 gap-12 bg-pacific px-8 pb-12 pt-20 text-white">
        <div>
          <div className="font-sans-wide uppercase tracking-widest text-brass">Our mission</div>
          <h2 className="mt-6 font-serif text-6xl uppercase leading-tight">
            Top of the line products <span className="normal-case italic">for your</span> creative
            vision
          </h2>
        </div>
        {brandAttributes && brandAttributes.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-4" data-sanity={attr('brandAttributes')}>
            {brandAttributes.map(({ _key, title, description }) => (
              <div className="bg-[#163239] p-8 pt-20" key={_key}>
                <h3 className="font-sans-wide text-2xl font-light">{title}</h3>
                <p className="mt-4 text-sage">{description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
