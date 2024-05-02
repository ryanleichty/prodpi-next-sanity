import { PortableText, PortableTextBlock, PortableTextComponents } from 'next-sanity'

type Props = {
  body?: PortableTextBlock[]
  image?: {
    url: string
    width: number
    height: number
    alt?: string
  }
}

export function OneColumn({ body, image }: Props) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className="font-serif text-4xl italic leading-tight">{children}</p>
      },
    },
    marks: {
      strong: ({ children }) => {
        return <strong className="font-normal uppercase not-italic">{children}</strong>
      },
    },
  }

  return (
    <section className="relative flex flex-col items-center">
      {image && (
        // eslint-disable-next-line
        <img
          className="aspect-video h-full w-full object-cover"
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      )}
      {body && (
        <div className="absolute max-w-screen-sm p-16 text-center">
          <div data-sanity-edit-target>
            <PortableText value={body} components={components} />
          </div>
        </div>
      )}
    </section>
  )
}
