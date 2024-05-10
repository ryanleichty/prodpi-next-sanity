import { OneColumnBlockData, PageData } from '@/types'
import { PortableText, PortableTextComponents, createDataAttribute } from 'next-sanity'

type Props = {
  page: PageData
  block: OneColumnBlockData
}

export function OneColumn({ page: data, block }: Props) {
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

  const attr = createDataAttribute({
    id: data._id,
    type: data._type,
  })

  return (
    <section
      className="relative mx-auto flex max-w-container flex-col items-center"
      data-sanity={attr(`blocks[_key=="${block._key}"]`)}
    >
      {block.image && (
        // eslint-disable-next-line
        <img
          className="aspect-video h-full w-full object-cover"
          src={block.image.url}
          alt={block.image.alt}
          width={block.image.width}
          height={block.image.height}
        />
      )}
      {block.body && (
        <div className="absolute max-w-screen-sm p-16 text-center">
          <div data-sanity-edit-target>
            <PortableText value={block.body} components={components} />
          </div>
        </div>
      )}
    </section>
  )
}
