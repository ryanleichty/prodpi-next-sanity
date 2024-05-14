import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
  createDataAttribute,
} from 'next-sanity'
import { cx } from '@/utils'
import { PageData } from '@/types'

type Props = {
  page: PageData
  block: TwoColumnBlockData
}

type TwoColumnBlockData = {
  _type: string
  _key: string
  columns: ColumnData[]
}

type ColumnData = {
  _type: string
  _key: string
  body?: PortableTextBlock[]
  image?: {
    url: string
    width: number
    height: number
    alt?: string
  }
}

export function TwoColumn({ page: data, block }: Props) {
  const attr = createDataAttribute({
    id: data._id,
    type: data._type,
  })

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={cx('font-serif text-3xl')}>{children}</p>
      },
    },
    marks: {
      strong: ({ children }) => {
        return <em className="italic">{children}</em>
      },
    },
  }

  return (
    <section
      className="mx-auto grid max-w-container md:grid-cols-[repeat(auto-fit,minmax(0px,1fr))]"
      data-sanity={attr(`blocks[_key=="${block._key}"]`)}
    >
      {block.columns?.length > 0 &&
        block.columns?.map(({ _key, image, body }, index) => (
          <div
            key={_key}
            className={cx(
              'flex flex-col gap-7 p-8 pb-24',
              index === 0 ? 'bg-[#7F8369]' : 'bg-brass',
            )}
          >
            {image?.url && (
              // eslint-disable-next-line
              <img
                className="aspect-square w-full object-cover"
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            )}
            {body && (
              <div data-sanity-edit-target>
                <PortableText value={body} components={components} />
              </div>
            )}
          </div>
        ))}
    </section>
  )
}
