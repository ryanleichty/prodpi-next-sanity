import { HomePagePayload } from '@/types'
import ProductBlocks from '../../components/ProductBlocks'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'

type Props = {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Home({ data, encodeDataAttribute }: Props) {
  const { _id, _type, blocks } = data || {}

  return (
    <div className="container">
      {blocks && (
        <div className="my-16">
          <ProductBlocks page={{ _id, _type }} blocks={blocks} />
        </div>
      )}
    </div>
  )
}
