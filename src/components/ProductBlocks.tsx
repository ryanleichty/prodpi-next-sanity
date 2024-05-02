import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity'
import { ThreeColumn } from './ThreeColumn'
import { OneColumn } from './OneColumn'

type Props = {
  value: PortableTextBlock[]
}

export default function ProductBlocks({ value: blocks }: Props) {
  const textComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => {
        return <h1>{children}</h1>
      },
      h2: ({ children }) => {
        return <h2 className="text-3xl">{children}</h2>
      },
      h3: ({ children }) => {
        return <h3>{children}</h3>
      },
      normal: ({ children }) => {
        return <p>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
  }

  const customComponents: PortableTextComponents = {
    types: {
      oneColumn: ({ value }) => {
        return <OneColumn body={value?.body} image={value?.image} />
      },
      textColumn: ({ value }) => {
        return <section>Text column</section>
      },
      threeColumn: ({ value }) => {
        return <ThreeColumn columns={value?.columns} />
      },
    },
  }

  let textBlocks: PortableTextBlock[] = []
  return blocks.map((block, i) => {
    // Group text blocks together (p, h1, h2, etc.)
    if (block._type === 'block') {
      textBlocks.push(block)

      // If the next block is also text, add it to the group
      if (blocks[i + 1]?._type === 'block') return null

      // Otherwise, render the group of text blocks
      const value = textBlocks
      textBlocks = []

      return (
        <section key={block._key} className="m-auto max-w-screen-sm">
          <PortableText value={value} components={textComponents} />
        </section>
      )
    } else {
      // Non-text blocks (modules, sections, etc.)
      return <PortableText key={block._key} value={block} components={customComponents} />
    }
  })
}
