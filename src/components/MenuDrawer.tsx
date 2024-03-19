'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import React from 'react'
import { PRODUCT_MENU, SUB_MENU } from '@/data'
import { cx } from '@/utils'
import Button from './Button'
import { IconClose, IconPlus } from './Icon'
import ShiftBy from './ShiftBy'

export default function MenuDrawer() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="group flex gap-2">
          <span className="flex h-6 w-4 flex-col justify-center gap-1 transition-all group-hover:gap-2">
            <span className="h-px w-4 bg-black" />
            <span className="h-px w-4 bg-black" />
          </span>
          Menu
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn" />
        <Dialog.Content className="fixed bottom-0 left-0 top-0 w-full max-w-lg bg-surfboard focus:outline-none data-[state=closed]:animate-slideRightExit data-[state=open]:animate-slideRightEnter">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Description
          </Dialog.Description>
          <div className="container">
            <header className="flex h-20 items-center border-b border-black/20">
              <Dialog.Close asChild>
                <button
                  className="-ml-1 flex items-center gap-1"
                  aria-label="Close Menu"
                >
                  <IconClose />
                  <ShiftBy y={-1}>Close Menu</ShiftBy>
                </button>
              </Dialog.Close>
            </header>
            <div className="flex h-16 items-center gap-4 border-b border-black/20">
              <Button>Create Account</Button>
              <Button variant="secondary">Login</Button>
            </div>
          </div>
          <div className="container relative h-[calc(100vh-64px-80px)] overflow-y-auto py-8">
            <Accordion type="single" collapsible className="mb-12 mt-4">
              {PRODUCT_MENU.map((item, i) => {
                if (item?.children) {
                  return (
                    <AccordionItem key={item.label} value={`item-${i}`}>
                      <AccordionTrigger>{item.label}</AccordionTrigger>
                      <AccordionContent>
                        {item?.children.map((childItem) => {
                          if (childItem.type !== 'image') {
                            return (
                              <div key={childItem?.label} className="p-3">
                                <h2 className="mb-2 font-sans-wide text-xs uppercase opacity-60">
                                  {childItem?.label}
                                </h2>
                                <ul>
                                  {childItem.children.map((listChildItem) => {
                                    return (
                                      <li key={listChildItem?.label}>
                                        <Link
                                          href={listChildItem?.url}
                                          className="block py-0.5 transition-opacity hover:opacity-60"
                                        >
                                          {listChildItem?.label}
                                        </Link>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </div>
                            )
                          }
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  )
                }
              })}
            </Accordion>
            <ul>
              {SUB_MENU.map((item) => {
                return (
                  <li key={item.label}>
                    <Link href={item.url} className="inline-block py-0.5">
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ ...props }, ref) => <AccordionPrimitive.Item ref={ref} {...props} />)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cx(
        'flex flex-1 items-center justify-between py-3 font-serif text-3xl uppercase transition-colors [&[data-state=open]_path:first-child]:-rotate-90 [&_path]:origin-center [&_path]:transition-transform',
        className,
      )}
      {...props}
    >
      {children}
      <IconPlus className="-mr-1" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cx(
      'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName
