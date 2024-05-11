'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef, useState } from 'react'

import Logo from '@/components/Logo'
import MenuDrawer from '@/components/MenuDrawer'
import ShiftBy from '@/components/ShiftBy'
import { PRODUCT_MENU } from '@/data'
import { cx } from '@/utils'

type Props = ComponentPropsWithoutRef<'header'>

export default function Header({ className, ...props }: Props) {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState('')

  return (
    <header
      className={cx(
        'px-container',
        isProductMenuOpen ? 'bg-white' : '',
        'transition-colors duration-200',
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-container">
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center border-b border-black/20">
          <div>
            <MenuDrawer />
          </div>
          <Link href="/" className="p-4">
            <Logo />
          </Link>
          <div className="flex justify-end">
            <Cart />
          </div>
        </div>
        <NavigationMenu.Root value={isProductMenuOpen} onValueChange={setIsProductMenuOpen}>
          <NavigationMenu.List className="scrollbar-hidden flex h-16 items-center overflow-x-auto border-b border-black/20 lg:justify-center">
            <div className="mr-2 font-sans-wide text-[10px] uppercase leading-snug sm:hidden">
              Quick shop
            </div>
            {PRODUCT_MENU.map((item) => {
              if (item?.children) {
                return (
                  <NavigationMenu.Item key={item?.label} className="h-full">
                    <NavigationMenu.Trigger className="h-full whitespace-nowrap px-4 font-serif uppercase transition-colors hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-off-white">
                      {item?.label}
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                      <div className="scrollbar-hidden container grid auto-cols-[200px] grid-flow-col gap-8 overflow-x-auto py-8 lg:justify-center">
                        {item?.children.map((childItem) => {
                          if (childItem.type === 'image') {
                            return (
                              <NavigationMenuLink key={childItem?.label} href={childItem?.url}>
                                {childItem?.image && (
                                  <>
                                    <Image
                                      className="aspect-square object-cover"
                                      src={childItem?.image}
                                      width={200}
                                      height={200}
                                      alt=""
                                    />
                                    <p className="mt-1 text-sm">{childItem?.label}</p>
                                  </>
                                )}
                              </NavigationMenuLink>
                            )
                          } else {
                            return (
                              <div key={childItem?.label} className="border-l pl-4">
                                <h2 className="mb-2 font-sans-wide text-xs uppercase text-brass">
                                  {childItem?.label}
                                </h2>
                                <ul>
                                  {childItem.children.map((listChildItem) => {
                                    return (
                                      <li key={listChildItem?.label}>
                                        <NavigationMenuLink
                                          href={listChildItem?.url}
                                          className="-mx-2 block rounded-sm px-2 py-0.5 hover:bg-sand/50"
                                        >
                                          {listChildItem?.label}
                                        </NavigationMenuLink>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                )
              } else {
                return (
                  <NavigationMenu.Item key={item.label} className="h-full">
                    <NavigationMenuLink
                      href={item.url}
                      className="grid h-full place-items-center whitespace-nowrap px-4 font-serif uppercase transition-colors hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-off-white"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenu.Item>
                )
              }
            })}
          </NavigationMenu.List>

          <NavigationMenu.Viewport className="absolute inset-x-0 h-[var(--radix-navigation-menu-viewport-height)] bg-white transition-all data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn" />
        </NavigationMenu.Root>
      </div>
    </header>
  )
}

type NavigationMenuLinkProps = React.ComponentPropsWithoutRef<typeof NavigationMenu.Link> & {
  href: string
}

function NavigationMenuLink({ href, ...props }: NavigationMenuLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenu.Link active={isActive} {...props} />
    </Link>
  )
}

function Cart() {
  return (
    <Link href="/cart" className="flex gap-2">
      Cart
      <div className="grid h-6 w-6 place-items-center rounded-full bg-surfboard text-sm">
        <ShiftBy y={-1.5}>0</ShiftBy>
      </div>
    </Link>
  )
}
