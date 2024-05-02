import { PortableText, PortableTextComponents } from 'next-sanity'
import { vercelStegaCleanAll } from '@sanity/client/stega'

export function ThreeColumn({ columns }) {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(0px,1fr))]">
      {columns?.length > 0 &&
        columns?.map((column) => {
          switch (column?._type) {
            case 'imageColumn':
              return <ImageColumn key={column._key} {...column} />
            case 'textColumn':
              return <TextColumn key={column._key} {...column} />
          }
        })}
    </section>
  )
}

function ImageColumn({ image }) {
  return (
    // eslint-disable-next-line
    <img
      className="h-full w-full object-cover"
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
    />
  )
}

function TextColumn({ eyebrow, body, textSize }) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className="font-serif text-3xl italic">{children}</p>
      },
    },
    marks: {
      strong: ({ children }) => {
        return <strong className="font-sans font-normal uppercase not-italic">{children}</strong>
      },
    },
  }

  return (
    <div className="bg-brass p-8">
      <p className="mb-4 font-sans-wide text-sm uppercase tracking-widest">{eyebrow}</p>
      <div data-sanity-edit-target>
        <PortableText
          value={body}
          components={vercelStegaCleanAll(textSize) === 'large' ? components : undefined}
        />
      </div>
    </div>
  )
}
