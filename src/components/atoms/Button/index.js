import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { margin } from 'styled-system'
import { themeGet } from '@styled-system/theme-get'
import { Text } from '~/components/atoms/Text'

const StyledButton = styled(TouchableOpacity)`
  background: ${themeGet('colors.white')};
  border: none;
  border-radius: 200px;
  color: ${themeGet('colors.black')};
  padding: ${themeGet('space.2')}px ${themeGet('space.8')}px;
  justify-content: center;
  align-items: center;

  ${({ disabled }) => disabled && 'opacity: 0.5;'}

  ${margin}
`

export const Button = ({
  color = 'black',
  label,
  disabled,
  loading,
  children,
  ...props
}) => (
  <StyledButton
    {...props}
    disabled={disabled || loading}
    accessibilityRole="button"
  >
    {/*loading ? <Spinner/> : children*/}
    <Text color={color}>{label}</Text>
    {children}
  </StyledButton>
)
