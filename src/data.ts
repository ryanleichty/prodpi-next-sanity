type LinkMenuItem = {
  label: string
  url: string
}

type ImageMenuItem = LinkMenuItem & {
  type: 'image'
  image: string
}

type ListMenuItem = {
  type: 'list'
  label: string
  children: LinkMenuItem[]
}

type MenuItem = ImageMenuItem | ListMenuItem

type ProductMenu = LinkMenuItem & {
  children?: MenuItem[]
}

export const PRODUCT_MENU: ProductMenu[] = [
  {
    label: 'Loose Prints',
    url: '/products/prints',
    children: [
      {
        type: 'image',
        label: 'C-Type Photographic Prints',
        url: '/products/prints/chromogenic-photo-prints',
        image: '/images/ProDPI_FallMemories_FullRes-27.jpg',
      },
      {
        type: 'image',
        label: 'Giclée Fine Art Prints',
        url: '/products/prints/giclee-fine-art-prints',
        image: '/images/ProDPI_FineArt_Web-27.jpg',
      },
      {
        type: 'list',
        label: 'C-Type Prints',
        children: [
          {
            label: 'C-Type Photographic Prints',
            url: '/products/prints/chromogenic-photo-prints',
          },
          {
            label: 'Large Format Photographic Prints',
            url: '/products/prints/large-format-photo-prints',
          },
        ],
      },
      {
        type: 'list',
        label: 'Giclée Fine Art',
        children: [
          {
            label: 'Giclée Fine Art Prints',
            url: '/products/prints/giclee-fine-art-prints',
          },
          {
            label: 'Large Format Fine Art Prints',
            url: '/products/prints/large-format-fine-art-prints',
          },
          {
            label: 'Ultra-Thick Prints',
            url: '/products/prints/ultra-thick-prints',
          },
          {
            label: 'Deckled Edge Fine Art Prints',
            url: '/products/prints/deckled-edge-fine-art',
          },
        ],
      },
    ],
  },
  {
    label: 'Wall Art',
    url: '/products/wall-art',
    children: [
      {
        type: 'image',
        label: 'Walnut Frames',
        url: '/products/wall-art/walnut-frames',
        image:
          '/images/ProDPI_Easel_Back_Woodland_Frame_Engagement_2022_01.jpg',
      },
      {
        type: 'image',
        label: 'Framed Acrylic Prints',
        url: '/products/wall-art/framed-acrylic-prints',
        image: '/images/ProDPI_Lunar_New_Year_Framed_Acrylic_15.jpg',
      },
      {
        type: 'list',
        label: 'Frames',
        children: [
          {
            label: 'Ash Framed Canvas',
            url: '/products/wall-art/ash-framed-canvas',
          },
          {
            label: 'Walnut Framed Canvas',
            url: '/products/wall-art/walnut-framed-canvas',
          },
          {
            label: 'Frosted Metal Frames',
            url: '/products/wall-art/metal-frames',
          },
          {
            label: 'Modern Metal Frames',
            url: '/products/wall-art/modern-metal-frames',
          },
          {
            label: 'Gallery Frames',
            url: '/products/wall-art/gallery-frames',
          },
          {
            label: 'Walnut Frames',
            url: '/products/wall-art/walnut-frames',
          },
          {
            label: 'Ash Frames',
            url: '/products/wall-art/ash-frames',
          },
          {
            label: 'Rustic Wood Frames',
            url: '/products/wall-art/rustic-wood-frames',
          },
        ],
      },
      {
        type: 'list',
        label: 'Unique Displays',
        children: [
          {
            label: 'Acrylic Prints',
            url: '/products/wall-art/acrylic-prints',
          },
          {
            label: 'Aluminum Metal Prints',
            url: '/products/wall-art/aluminum-metal-prints',
          },
          {
            label: 'Framed Acrylic Prints',
            url: '/products/wall-art/framed-acrylic-prints',
          },
          {
            label: 'Wrapped Canvas',
            url: '/products/wall-art/wrapped-canvas',
          },
          {
            label: 'Bamboo Blocks',
            url: '/products/wall-art/bamboo-blocks',
          },
          {
            label: 'Photo Blocks',
            url: '/products/wall-art/photo-blocks',
          },
          {
            label: 'Maple Wood Prints',
            url: '/products/wall-art/maple-wood-prints',
          },
        ],
      },
    ],
  },
  {
    label: 'Books + Albums',
    url: '/products/books-albums',
    children: [
      {
        type: 'image',
        label: 'Layflat Albums',
        url: '/products/books-albums/layflat-albums/',
        image: '/images/ProDPI_PortfolioBooks_Nicole_Web-14.jpg',
      },
      {
        type: 'image',
        label: 'Layflat Books',
        url: '/products/books-albums/layflat-books',
        image: '/images/ProDPI_layflat_books_hero.jpeg',
      },
      {
        type: 'image',
        label: 'Hardcover Books',
        url: '/products/books-albums/hardcover-books',
        image: '/images/Hardcover-marble_1000w.jpg',
      },
      {
        type: 'list',
        label: 'Books + Albums',
        children: [
          {
            label: 'Layflat Albums',
            url: '/products/books-albums/layflat-albums',
          },
          {
            label: 'Layflat Books',
            url: '/products/books-albums/layflat-books',
          },
          {
            label: 'Hardcover Books',
            url: '/products/books-albums/hardcover-books',
          },
        ],
      },
    ],
  },
  {
    label: 'Cards + Keepsakes',
    url: '/designs/cards',
    children: [
      {
        type: 'image',
        label: 'Graduation Cards',
        url: '/designs/browse/cards/graduation/all',
        image: '/images/ProDPI_Prints-6_1200.jpg',
      },
      {
        type: 'image',
        label: 'Acrylic Blocks',
        url: '/products/keepsakes/acrylic-blocks',
        image: '/images/ProDPI_2022_Holiday_Lab_03_Acrylic_Block.jpg',
      },
      {
        type: 'image',
        label: 'Wedding Cards',
        url: '/designs/browse/cards/wedding/all',
        image: '/images/ProDPI_Prints-11_1200cropped.jpg',
      },
      {
        type: 'list',
        label: 'Card Designs',
        children: [
          {
            label: 'Wedding + Engagement Cards',
            url: '/designs/browse/cards/wedding/all',
          },
          {
            label: 'Stationery Designs',
            url: '/designs/browse/cards/marketing/stationery',
          },
          {
            label: 'Graduation Cards',
            url: '/designs/browse/cards/graduation/all',
          },
          {
            label: 'Newborn + Baby Cards',
            url: '/designs/browse/cards/baby/all',
          },
          {
            label: 'Business + Marketing Cards',
            url: '/designs/browse/cards/marketing/all',
          },
          {
            label: 'Holiday Cards',
            url: '/designs/browse/cards/holiday/all',
          },
        ],
      },
    ],
  },
  {
    label: 'About Us',
    url: '/about',
  },
]

export const SUB_MENU: LinkMenuItem[] = [
  {
    label: 'Stories',
    url: '/about',
  },
  {
    label: 'Pricing Updates 2023',
    url: '/about',
  },
  {
    label: 'Turnaround Times',
    url: '/about',
  },
  {
    label: 'About Us',
    url: '/about',
  },
  {
    label: 'Ordering Info',
    url: '/about',
  },
  {
    label: 'Shipping',
    url: '/about',
  },
  {
    label: 'Additional Products in ROES',
    url: '/about',
  },
  {
    label: 'Integrated Partners',
    url: '/about',
  },
]
