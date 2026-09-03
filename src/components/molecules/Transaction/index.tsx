import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { themeGet } from '@styled-system/theme-get'
import { Box, Currency, Text } from '../../atoms'
import type { TransactionType } from '~/services/sdk'

const Container = styled(Box)`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${themeGet('colors.jet')};
  border-bottom-width: 1px;
`

const StatusButton = styled(TouchableOpacity)`
  min-width: 0px;
  flex: 1;
  flex-direction: row;
  padding: ${themeGet('space.2')}px;
  align-items: center;
`

const DeleteButton = styled(TouchableOpacity)`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet('colors.red')};
  padding: ${themeGet('space.2')}px;
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
  onDelete: () => void
}

export const Transaction = ({
  value,
  title,
  type,
  resolved,
  disabled,
  onToggle,
  onDelete,
}: TransactionProps) => (
  <Container>
    <StatusButton
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
    </StatusButton>
    <DeleteButton
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Delete ${title}`}
      onPress={onDelete}
    >
      <Text color="white" fontSize={6}>
        ×
      </Text>
    </DeleteButton>
  </Container>
)
