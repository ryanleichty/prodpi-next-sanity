import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#fcfaf7',
        sand: '#eee7dd',
        brass: '#bf955a',
        surfboard: '#a8c6ce',
        'light-surfboard': '#dee4e4',
        sage: '#93adae',
        pacific: '#09272f',
        steel: '#302d2f',
      },
      fontFamily: {
        sans: ['acumin-pro', ...defaultTheme.fontFamily.sans],
        'sans-wide': ['acumin-pro-wide', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-gtsuper)', ...defaultTheme.fontFamily.sans],
      },
      padding: {
        container: 'var(--container-padding)',
      },
      maxWidth: {
        container: 'var(--container-max-width)',
      },
      screens: {
        '2xl': '1440px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(100px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-100px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(100px)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-100px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideLeftEnter: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideLeftExit: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        slideRightEnter: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideRightExit: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'accordion-up': 'accordion-up 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'navigation-menu-down': 'navigation-menu-down 200ms ease',
        'navigation-menu-up': 'navigation-menu-up 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        slideLeftEnter: 'slideLeftEnter 300ms ease',
        slideLeftExit: 'slideLeftExit 200ms ease',
        slideRightEnter: 'slideRightEnter 300ms ease',
        slideRightExit: 'slideRightExit 200ms ease',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(({ addComponents }: { addComponents: any }) =>
      addComponents({
        '.container': {
          width: '100%',
          'max-width': 'var(--container-max-width)',
          'padding-inline': 'var(--container-padding)',
          'margin-inline': 'auto',
        },
      }),
    ),
  ],
}
export default config
