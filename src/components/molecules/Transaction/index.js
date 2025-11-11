import * as React from 'react'
import styled from 'styled-components/native'

import { themeGet } from '@styled-system/theme-get'
import { Box, Text } from '../../atoms'

const Container = styled(Box)`
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
const Currency = styled(Text)`
  color: ${props =>
    props.negative
      ? themeGet('colors.red')(props)
      : themeGet('colors.green')(props)};
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
