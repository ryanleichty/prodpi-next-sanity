// Inspired by Josh Comeau https://www.joshwcomeau.com/snippets/react-components/shift-by/

type Props = React.ComponentPropsWithoutRef<'div'> & {
  x?: number
  y?: number
}

export default function ShiftBy({ x = 0, y = 0, children, ...props }: Props) {
  return (
    <div
      {...props}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </div>
  )
}
