import * as React from 'react'
import styled from '~/lib/styled-native'

import { th } from '../../Theme'
import { Box, Text } from '../../uikit'

const Container = styled(Box)`
  flex-direction: row;
  padding: ${th.space(2)}px;
  align-items: center;
  border-bottom-color: ${th.color('jet')};
  border-bottom-width: 1px;
`

const Title = styled(Text)`
  flex: 1;
  font-size: ${th.size(4)};
`

const Value = styled(Box)`
  align-items: flex-end;
`
const Currency = styled(Text)`
  color: ${props =>
    props.negative ? th.color('red')(props) : th.color('green')(props)};
`

const formatCurrency = value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    value
  )

export const Transaction = ({ value, title, resolved }) => (
  <Container>
    <Title>{title}</Title>
    <Value>
      <Currency negative={value < 0}>{formatCurrency(value)}</Currency>
      <Text>{resolved ? 'Paid' : 'Unpaid'}</Text>
    </Value>
  </Container>
)
