'use client'

import { Product } from './Product'
import { PRODUCT_QUERY } from '@/sanity/lib/queries'
import { ProductPayload } from '@/types'
import { QueryResponseInitial } from '@sanity/react-loader'
import { useQuery } from '@/sanity/loader/useQuery'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<ProductPayload | null>
}

export default function ProductPreview({ initial, params }: Props) {
  const { data, encodeDataAttribute } = useQuery<ProductPayload | null>(PRODUCT_QUERY, params, {
    initial,
  })

  return <Product product={data} encodeDataAttribute={encodeDataAttribute} />
}
