import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/css/main.css'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'
import type { Metadata, Viewport } from 'next'
import { createDataAttribute, toPlainText } from 'next-sanity'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

const LiveVisualEditing = dynamic(() => import('@/sanity/loader/LiveVisualEditing'))

const gtsuper = localFont({
  src: [
    {
      path: '../../fonts/GT-Super-Display-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../fonts/GT-Super-Display-Light-Italic.woff2',
      weight: '300',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-gtsuper',
})

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ])

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Personal website',
        }
      : undefined,
    description: homePage?.description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: 'black',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let { data: settings } = await loadSettings()

  return (
    <html lang="en" className={gtsuper.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/sbu6cys.css" />
      </head>
      <body className="flex min-h-screen flex-col bg-off-white antialiased selection:bg-surfboard/50">
        <Suspense>
          <Header
            doc={{ _id: settings._id, _type: settings._type }}
            navigation={settings?.navigation || []}
          />
        </Suspense>
        <Suspense>{children}</Suspense>
        <Suspense>
          <Footer className="mt-auto" />
        </Suspense>
      </body>
      {draftMode().isEnabled && <LiveVisualEditing />}
    </html>
  )
}
