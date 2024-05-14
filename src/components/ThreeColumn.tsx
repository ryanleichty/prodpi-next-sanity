import { PageData } from '@/types'
import { cx } from '@/utils'
import { vercelStegaCleanAll } from '@sanity/client/stega'
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
  createDataAttribute,
} from 'next-sanity'

type Props = {
  page: PageData
  block: ThreeColumnBlockData
}

export type ThreeColumnBlockData = {
  _type: string
  _key: string
  columns: Array<ImageColumnData | TextColumnData>
}

export type ImageColumnData = {
  _type: 'imageColumn'
  _key: string
  image?: {
    url: string
    width: number
    height: number
    alt?: string
  }
}

export type TextColumnData = {
  _type: 'textColumn'
  _key: string
  body?: PortableTextBlock[]
  eyebrow?: string
  textSize?: string
}

export function ThreeColumn({ page: data, block }: Props) {
  const attr = createDataAttribute({
    id: data._id,
    type: data._type,
  })

  return (
    <section
      className="mx-auto grid max-w-container grid-cols-[repeat(auto-fit,minmax(0px,1fr))]"
      data-sanity={attr(`blocks[_key=="${block._key}"]`)}
    >
      {block.columns?.length > 0 &&
        block.columns?.map((column) => {
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

function ImageColumn({ image }: ImageColumnData) {
  return (
    <>
      {image?.url && (
        // eslint-disable-next-line
        <img
          className="h-full w-full object-cover"
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      )}
    </>
  )
}

function TextColumn({ eyebrow, body, textSize }: TextColumnData) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return (
          <p
            className={cx(
              'font-serif text-3xl italic',
              vercelStegaCleanAll(textSize) === 'large' ? 'text-3xl' : 'text-2xl',
            )}
          >
            {children}
          </p>
        )
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
      {eyebrow && (
        <p className="mb-4 font-sans-wide text-sm uppercase tracking-widest">{eyebrow}</p>
      )}
      {body && (
        <div data-sanity-edit-target>
          <PortableText value={body} components={components} />
        </div>
      )}
    </div>
  )
}
