'use client'

import { PRODUCT_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { ProductSettingsPayload } from '@/types'
import { QueryResponseInitial } from '@sanity/react-loader'
import { ProductLayout } from './ProductLayout'

type Props = {
  initial: QueryResponseInitial<ProductSettingsPayload | null>
}

export default function ProductPreview({ initial, ...props }: Props) {
  const { data, encodeDataAttribute } = useQuery<ProductSettingsPayload | null>(
    PRODUCT_SETTINGS_QUERY,
    {},
    {
      initial,
    },
  )

  return <ProductLayout data={data} encodeDataAttribute={encodeDataAttribute} {...props} />
}
