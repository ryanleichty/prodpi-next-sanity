import { loadBrandAttributes } from '@/sanity/loader/loadQuery'
import { draftMode } from 'next/headers'
import { ProductLayout } from './ProductLayout'
import ProductLayoutPreview from './ProductLayoutPreview'

export default async function ProductPageLayout({ ...props }) {
  const initial = await loadBrandAttributes()

  return draftMode().isEnabled ? (
    <ProductLayoutPreview initial={initial} {...props} />
  ) : (
    <ProductLayout data={initial.data} {...props} />
  )
}
