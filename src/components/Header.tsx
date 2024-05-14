'use client'

import Logo from '@/components/Logo'
import MenuDrawer from '@/components/MenuDrawer'
import ShiftBy from '@/components/ShiftBy'
import { urlForImage } from '@/sanity/lib/utils'
import { SettingsPayload, type ImageItem, type ListItem, type MenuItem } from '@/types'
import { cx, resolveHref } from '@/utils'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { createDataAttribute } from 'next-sanity'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef, useState } from 'react'

type Props = ComponentPropsWithoutRef<'header'> & {
  data: SettingsPayload
}

export default function Header({ data, className, ...props }: Props) {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState('')

  return (
    <header
      className={cx(
        'px-container transition-colors duration-200',
        isProductMenuOpen ? 'bg-white' : null,
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-container">
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center border-b border-black/20">
          <div>
            <MenuDrawer data={data} />
          </div>
          <Link href="/" className="p-4">
            <Logo />
          </Link>
          <div className="flex justify-end">
            <Cart />
          </div>
        </div>
        <NavigationMenu
          data={data}
          value={isProductMenuOpen}
          onValueChange={setIsProductMenuOpen}
        />
      </div>
    </header>
  )
}

type NavigationMenuProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
  data: SettingsPayload
}

function NavigationMenu({ data, ...props }: NavigationMenuProps) {
  const { navigation } = data

  const attr = createDataAttribute({
    id: data._id,
    type: data._type,
  })

  return (
    <NavigationMenuPrimitive.Root {...props}>
      <NavigationMenuPrimitive.List className="scrollbar-hidden flex h-16 items-center overflow-x-auto border-b border-black/20 lg:justify-center">
        <div className="mr-2 font-sans-wide text-[10px] uppercase leading-snug sm:hidden">
          Quick shop
        </div>
        {navigation?.map((menuItem) => {
          if (menuItem?.children) {
            return (
              <NavigationMenuPrimitive.Item key={menuItem._key} className="h-full">
                <NavigationMenuPrimitive.Trigger
                  className="h-full whitespace-nowrap px-4 font-serif uppercase transition-colors hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-off-white"
                  data-sanity={attr(`navigation[_key=="${menuItem._key}"]`)}
                >
                  {menuItem.title || menuItem.link?.title}
                </NavigationMenuPrimitive.Trigger>
                <NavigationMenuPrimitive.Content className="absolute left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                  <div className="scrollbar-hidden container grid auto-cols-[200px] grid-flow-col gap-8 overflow-x-auto py-8 lg:justify-center">
                    {menuItem.children.map((childItem) => {
                      if (childItem._type === 'imageItem') {
                        const imageItem = childItem as ImageItem

                        return (
                          <ImageItem
                            key={imageItem._key}
                            data={imageItem}
                            data-sanity={attr(
                              `navigation[_key=="${menuItem._key}"].children[_key=="${imageItem._key}"]`,
                            )}
                          />
                        )
                      }

                      if (childItem._type === 'listItem') {
                        const listItem = childItem as ListItem

                        return (
                          <ListItem key={childItem._key} data={childItem}>
                            {(listItem?.links?.length || 0) > 0 && (
                              <ul>
                                {listItem?.links?.map((link) => {
                                  const computedTitle = link.title || link.link?.title
                                  const computedHref =
                                    link.url || resolveHref(link.link?._type, link.link?.slug) || ''

                                  return (
                                    <li key={link._key}>
                                      <NavigationMenuLink
                                        href={computedHref}
                                        className="-mx-2 block rounded-sm px-2 py-0.5 hover:bg-sand/50"
                                        data-sanity={attr(
                                          `navigation[_key=="${menuItem._key}"].children[_key=="${listItem._key}"].links[_key=="${link._key}"]`,
                                        )}
                                      >
                                        {computedTitle}
                                      </NavigationMenuLink>
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
                          </ListItem>
                        )
                      }
                    })}
                  </div>
                </NavigationMenuPrimitive.Content>
              </NavigationMenuPrimitive.Item>
            )
          } else {
            return (
              <NavigationMenuPrimitive.Item key={menuItem._key} className="h-full">
                <NavigationMenuLink
                  href={menuItem.url || menuItem.link?.slug || ''}
                  className="grid h-full place-items-center whitespace-nowrap px-4 font-serif uppercase transition-colors hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-off-white"
                >
                  {menuItem.title || menuItem.link?.title}
                </NavigationMenuLink>
              </NavigationMenuPrimitive.Item>
            )
          }
        })}
      </NavigationMenuPrimitive.List>

      <NavigationMenuPrimitive.Viewport className="absolute inset-x-0 h-[var(--radix-navigation-menu-viewport-height)] bg-white transition-all data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn" />
    </NavigationMenuPrimitive.Root>
  )
}

type ImageItemProps = React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & {
  data: ImageItem
}

function ImageItem({ data: { image, title, url, link }, ...props }: ImageItemProps) {
  const computedTitle = title || link?.title
  const computedHref = url || resolveHref(link?._type, link?.slug) || ''

  return (
    <NavigationMenuLink {...props} href={computedHref}>
      {image && (
        // eslint-disable-next-line
        <img
          className="aspect-square object-cover"
          src={urlForImage(image)?.size(200, 200).auto('format').fit('crop').url()}
          alt=""
        />
      )}
      {computedTitle && <p className="mt-1 text-sm">{computedTitle}</p>}
    </NavigationMenuLink>
  )
}

type ListItemProps = React.ComponentPropsWithoutRef<'div'> & {
  data: ListItem
}

function ListItem({ children, data: { _key, title } }: ListItemProps) {
  return (
    <div key={_key} className="border-l pl-4">
      {title && <div className="mb-2 font-sans-wide text-xs uppercase text-brass">{title}</div>}
      {children}
    </div>
  )
}

type NavigationMenuLinkProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Link
> & {
  href: string
}

function NavigationMenuLink({ href, ...props }: NavigationMenuLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuPrimitive.Link active={isActive} {...props} />
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
