/**
 * Format string to Title Case from camelCase
 */
export function toTitleCase(string: string) {
  return (
    string
      // Insert a space before all capital letters
      ?.replace(/([A-Z])/g, ' $1')
      // Uppercase the first character
      .replace(/^./, (str: string) => str.toUpperCase())
  )
}
