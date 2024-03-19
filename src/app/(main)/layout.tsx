import '@/css/main.css'

import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { Suspense } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'

const LiveVisualEditing = dynamic(
  () => import('@/sanity/loader/LiveVisualEditing'),
)

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
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: 'black',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={gtsuper.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/sbu6cys.css" />
      </head>
      <body className="antialiased bg-off-white selection:bg-surfboard/50 flex min-h-screen flex-col">
        <Suspense>
          <Header />
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
