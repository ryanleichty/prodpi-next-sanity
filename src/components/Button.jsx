import Link from 'next/link'
import React from 'react'

import { cva } from '@/utils'

function Button(
  {
    children,
    className,
    icon,
    size = 'lg',
    shape = 'square',
    variant = 'primary',
    ...props
  },
  ref,
) {
  const button = cva({
    base: 'inline-flex font-sans-wide items-center justify-between gap-2 h-12 whitespace-nowrap text-sm uppercase tracking-widest px-6 transition-colors duration-100',
    variants: {
      variant: {
        primary: 'bg-pacific text-white hover:bg-black',
        secondary: 'bg-sand text-black hover:bg-white',
      },
      size: {
        sm: 'text-xs min-h-8 px-3',
        md: 'text-sm min-h-10 px-4',
        lg: 'min-h-12 px-5',
      },
    },
  })

  return 'href' in props ? (
    <Link
      {...props}
      className={button({ intent: variant, size, shape, className })}
      ref={ref}
    >
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <button
      {...props}
      className={button({ intent: variant, size, shape, className })}
      type={props.type || 'button'}
      ref={ref}
    >
      <TouchTarget>{children}</TouchTarget>
    </button>
  )
}

export default React.forwardRef(Button)

/* Expand the hit area to at least 44×44px on touch devices */
export function TouchTarget({ children }) {
  return (
    <>
      {children}
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
    </>
  )
}
