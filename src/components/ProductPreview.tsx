'use client'

import Product from '@/components/Product'
import { PRODUCT_QUERY } from '@/sanity/lib/queries'
import { ProductPayload } from '@/types'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'

type Props = {
  initial: QueryResponseInitial<ProductPayload | null>
  params: { slug: string }
}

export default function ProductPreview({ initial, params }: Props) {
  const { data, encodeDataAttribute } = useQuery<ProductPayload | null>(PRODUCT_QUERY, params, {
    initial,
  })

  return <Product product={data} encodeDataAttribute={encodeDataAttribute} />
}
