import * as React from 'react'
import { currency } from 'remask'
import { Box } from '~/components/atoms/Box'
import { Text } from '~/components/atoms/Text'

export const Currency = ({ value, color, ...props }) => {
  const moneyValue = Number(value || 0)

  return (
    <Box {...props}>
      <Text color={color || (moneyValue < 0 ? 'red' : 'green')}>
        {currency.mask({
          locale: 'en-US',
          currency: 'USD',
          value: moneyValue,
        })}
      </Text>
    </Box>
  )
}
