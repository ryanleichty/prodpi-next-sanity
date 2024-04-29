'use client'

import Product from '@/components/Product'
import { PRODUCT_QUERY } from '@/sanity/lib/queries'
import { ProductPayload } from '@/types'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { QueryParams } from 'next-sanity'

type Props = {
  initial: QueryResponseInitial<ProductPayload | null>
  params: { slug: string }
}

export default function ProductPreview({ initial, params }: Props) {
  const { data } = useQuery<ProductPayload | null>(PRODUCT_QUERY, params, {
    initial,
  })

  return <Product product={data} />
}
