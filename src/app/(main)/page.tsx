import { Home } from './Home'
import { loadHomePage } from '@/sanity/loader/loadQuery'
import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
const HomePreview = dynamic(() => import('@/app/(main)/HomePreview'))

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: page } = await loadHomePage()

  return {
    title: page?.title,
    description: page?.description ? page?.description : (await parent).description,
  }
}

export default async function HomePage({ params }: Props) {
  const initial = await loadHomePage()

  return draftMode().isEnabled ? (
    <HomePreview initial={initial} params={params} />
  ) : (
    <Home data={initial.data} />
  )
}
