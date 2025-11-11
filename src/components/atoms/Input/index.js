import * as React from 'react'
import { TextInput } from 'react-native'
import { themeGet } from '@styled-system/theme-get'
import styled, { css, useTheme } from 'styled-components/native'

const StyledInput = styled(TextInput)`
  background: transparent;
  border: 1px solid #fff;
  border-radius: 200px;
  color: ${props =>
    themeGet(
      `colors.${props.color || 'white'}`,
      props.color || 'white'
    )(props)};
  padding: ${themeGet('space.2')}px ${themeGet('space.3')}px;

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
  `}

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${themeGet('colors.red')};
    `}
`

export const Input = ({ placeholderTextColor = 'gray', ...props }) => {
  const theme = useTheme()
  const color = themeGet(
    `colors.${placeholderTextColor}`,
    placeholderTextColor
  )({ theme })

  return <StyledInput {...props} placeholderTextColor={color} />
}
