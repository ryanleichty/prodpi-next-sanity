import { useCallback } from 'react'
import { Stack, Text, TextArea } from '@sanity/ui'
import { set, unset } from 'sanity'

export default function CustomTextInput(props) {
  const { elementProps, onChange, value = '' } = props

  console.log(props.renderDefault(props))

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  return (
    <Stack space={2}>
      <TextArea {...elementProps} onChange={handleChange} value={value} />
      <Text>Characters: {value.length}</Text>
    </Stack>
  )
}
