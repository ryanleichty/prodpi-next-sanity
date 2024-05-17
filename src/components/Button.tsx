import React from 'react'
import { cva } from '@/utils'
import { VariantProps } from 'cva'
import Link from 'next/link'

const buttonVariants = cva({
  base: 'inline-flex font-sans-wide items-center justify-center gap-2 h-12 whitespace-nowrap text-sm uppercase tracking-widest px-6 transition-colors duration-100',
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

type ButtonOrLinkProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      icon?: React.ReactNode
      type?: 'button' | 'submit' | 'reset' | undefined
    } & VariantProps<typeof buttonVariants>)
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      icon?: React.ReactNode
    } & VariantProps<typeof buttonVariants>)

function Button(
  {
    children,
    className,
    icon,
    size = 'lg',
    variant = 'primary',
    type = 'button',
    ...props
  }: ButtonOrLinkProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return 'href' in props ? (
    <Link {...props} className={buttonVariants({ variant, size, className })} ref={ref}>
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <button
      {...props}
      className={buttonVariants({ variant, size, className })}
      type={type}
      ref={ref}
    >
      <TouchTarget>{children}</TouchTarget>
    </button>
  )
}

export default React.forwardRef(Button)

/* Expand the hit area to at least 44×44px on touch devices */
export function TouchTarget({ children }: { children: React.ReactNode }) {
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
