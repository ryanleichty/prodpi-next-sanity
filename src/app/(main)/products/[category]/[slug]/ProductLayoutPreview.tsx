'use client'

import { BRAND_ATTRIBUTES_QUERY } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { BrandAttributePayload } from '@/types'
import { QueryResponseInitial } from '@sanity/react-loader'
import { ProductLayout } from './ProductLayout'

type Props = {
  initial: QueryResponseInitial<BrandAttributePayload | null>
}

export default function ProductPreview({ initial, ...props }: Props) {
  const { data, encodeDataAttribute } = useQuery<BrandAttributePayload | null>(
    BRAND_ATTRIBUTES_QUERY,
    {},
    {
      initial,
    },
  )

  return <ProductLayout data={data} encodeDataAttribute={encodeDataAttribute} {...props} />
}
