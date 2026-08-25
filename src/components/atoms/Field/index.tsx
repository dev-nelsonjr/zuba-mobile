import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'
import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components/native'

import { Box, type BoxProps } from '~/components/atoms/Box'
import { Text } from '~/components/atoms/Text'
import { Label } from '~/components/atoms/Label'
import { Input } from '~/components/atoms/Input'

const ErrorMessage = styled(Text)`
  color: ${themeGet('colors.red')};
  padding: ${themeGet('space.0')}px ${themeGet('space.3')}px;
  font-size: ${themeGet('fontSizes.2')}px;
`

export type FieldProps = Omit<BoxProps, 'children'> & {
  type?: 'text' | 'password'
  label: ReactNode
  placeholder?: string
  placeholderTextColor?: string
  error?: ReactNode
  disabled?: boolean
  value?: string
  onChangeText?: (value: string) => void
  onBlur?: TextInputProps['onBlur']
}

export const Field = ({
  type: textContentType,
  label,
  placeholder,
  placeholderTextColor,
  error,
  disabled,
  value,
  onChangeText,
  onBlur,
  ...props
}: FieldProps) => (
  <Box {...props} display="flex" flexDirection="column">
    <Label>{label}</Label>
    <Input
      secureTextEntry={textContentType === 'password'}
      textContentType={textContentType === 'password' ? 'password' : undefined}
      placeholderTextColor={placeholderTextColor}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChangeText={onChangeText}
      onBlur={onBlur}
      hasError={!!error}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Box>
)
