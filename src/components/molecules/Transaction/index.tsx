import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { themeGet } from '@styled-system/theme-get'
import { Box, Currency, Text } from '../../atoms'
import type { TransactionType } from '~/services/sdk'

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  padding: ${themeGet('space.2')}px;
  align-items: center;
  border-bottom-color: ${themeGet('colors.jet')};
  border-bottom-width: 1px;
`

const Title = styled(Text)`
  flex: 1;
  font-size: ${themeGet('sizes.4')};
`

const Value = styled(Box)`
  align-items: flex-end;
`

interface TransactionProps {
  value: string | number
  title: string
  type: TransactionType | null
  resolved: boolean
  disabled?: boolean
  onToggle: () => void
}

export const Transaction = ({
  value,
  title,
  type,
  resolved,
  disabled,
  onToggle,
}: TransactionProps) => (
  <Container
    disabled={disabled}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityState={{ disabled, selected: resolved }}
    accessibilityLabel={`Mark ${title} as ${resolved ? 'pending' : 'resolved'}`}
    onPress={onToggle}
  >
    <Title>{title}</Title>
    <Value>
      <Currency value={value} />
      <Text>
        {resolved
          ? type === 'revenue'
            ? 'Received'
            : type === 'expense'
              ? 'Paid'
              : 'Resolved'
          : 'Pending'}
      </Text>
    </Value>
  </Container>
)
