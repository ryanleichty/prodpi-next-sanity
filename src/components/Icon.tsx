import { cx } from '@/utils'

type Props = React.ComponentPropsWithoutRef<'svg'> & {
  size?: 'base' | 'sm'
}

function Icon({ children, className, size = 'base', ...props }: Props) {
  const sizeStyles = {
    sm: 'h-5 w-5',
    base: 'h-6 w-6',
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className={cx(sizeStyles[size], className)}
    >
      {children}
    </svg>
  )
}

export function IconMenu() {
  return (
    <Icon>
      <path d="M3 12H21" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M3 6H21" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M3 18H21" strokeLinecap="square" strokeLinejoin="round" />
    </Icon>
  )
}

export function IconClose({ ...props }: Props) {
  return (
    <Icon {...props}>
      <path d="M18 6L6 18" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M6 6L18 18" strokeLinecap="square" strokeLinejoin="round" />
    </Icon>
  )
}

export function IconPlus({ ...props }: Props) {
  return (
    <Icon {...props}>
      <path d="M12 5V19" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M5 12H19" strokeLinecap="square" strokeLinejoin="round" />
    </Icon>
  )
}
