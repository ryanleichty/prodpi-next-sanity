import Product from '@/components/Product'
import ProductPreview from '@/components/ProductPreview'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadProduct } from '@/sanity/loader/loadQuery'
import type { Metadata, ResolvingMetadata } from 'next'
import { draftMode } from 'next/headers'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: product } = await loadProduct(params.slug)

  return {
    title: product?.title,
    description: product?.description ? product?.description : (await parent).description,
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('product')
}

export default async function ProductPage({ params }: Props) {
  const initial = await loadProduct(params.slug)

  return draftMode().isEnabled ? (
    <ProductPreview initial={initial} params={params} />
  ) : (
    <Product product={initial.data} />
  )
}
