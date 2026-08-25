import InputCurrency, {
  type CurrencyInputProps as NativeCurrencyInputProps,
} from 'react-native-currency-input'
import type { SpaceProps } from 'styled-system'

export interface CurrencyInputProps
  extends
    Omit<NativeCurrencyInputProps, 'onChangeText' | 'onChangeValue' | 'value'>,
    SpaceProps {
  value?: string
  error?: string | false
  onChangeText: (value: string) => void
}

export const CurrencyInput = ({
  onChangeText,
  prefix = '$',
  value = '',
  ...props
}: CurrencyInputProps) => {
  const numericValue = value === '' ? null : Number(value)
  const handleChange = (nextValue: number | null) =>
    onChangeText(nextValue === null ? '0.00' : `${nextValue}`)

  return (
    <InputCurrency
      {...props}
      prefix={prefix}
      value={Number.isNaN(numericValue) ? null : numericValue}
      onChangeValue={handleChange}
    />
  )
}
