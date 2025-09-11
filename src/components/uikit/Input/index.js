import * as React from 'react'
import { TextInput } from 'react-native'
import styled, { css, useTheme } from '~/lib/styled-native'

import { th } from '~/components/Theme/styled'

const StyledInput = styled(TextInput)`
  background: transparent;
  border: 1px solid #fff;
  border-radius: 200px;
  color: ${props => th.color(props.color || 'white')(props)};
  padding: ${th.space(2)}px ${th.space(3)}px;

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
  `}

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${th.color('red')};
    `}
`

export const Input = ({ placeholderTextColor = 'gray', ...props }) => {
  const theme = useTheme()
  const color = th.color(placeholderTextColor)({ theme })

  return <StyledInput {...props} placeholderTextColor={color} />
}
