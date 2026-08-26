import { currency } from 'remask'
import { Text, type TextProps } from '~/components/atoms/Text'

interface CurrencyProps extends TextProps {
  value?: string | number | null
}

export const Currency = ({ value, color, ...props }: CurrencyProps) => {
  const moneyValue = Number(value || 0)

  return (
    <Text {...props} color={color || (moneyValue < 0 ? 'red' : 'green')}>
      {currency.mask({
        locale: 'en-US',
        currency: 'USD',
        value: moneyValue,
      })}
    </Text>
  )
}
