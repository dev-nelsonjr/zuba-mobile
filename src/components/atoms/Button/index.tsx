import type { ReactNode } from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import styled from 'styled-components/native'

import { margin, type MarginProps } from 'styled-system'
import { themeGet } from '@styled-system/theme-get'
import { Text } from '~/components/atoms/Text'

type StyledButtonProps = TouchableOpacityProps & MarginProps

export type ButtonProps = StyledButtonProps & {
  color?: string
  label: string
  loading?: boolean
  children?: ReactNode
}

const StyledButton = styled(TouchableOpacity)<StyledButtonProps>`
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
}: ButtonProps) => (
  <StyledButton
    {...props}
    disabled={disabled || loading}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{ disabled: disabled || loading, busy: loading }}
  >
    {loading ? (
      <ActivityIndicator color="#000000" accessibilityLabel="Loading" />
    ) : (
      <>
        <Text color={color}>{label}</Text>
        {children}
      </>
    )}
  </StyledButton>
)
