'use client'

import { HOME_QUERY } from '@/sanity/lib/queries'
import { HomePagePayload } from '@/types'
import { QueryResponseInitial } from '@sanity/react-loader'
import { useQuery } from '@/sanity/loader/useQuery'
import { Home } from './Home'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<HomePagePayload | null>
}

export default function HomePreview({ initial, params }: Props) {
  const { data, encodeDataAttribute } = useQuery<HomePagePayload | null>(HOME_QUERY, params, {
    initial,
  })

  return <Home data={data} encodeDataAttribute={encodeDataAttribute} />
}
