import * as React from 'react'
import styled from '~/lib/styled-native'

import { th } from '../../Theme/styled'

import { Box } from '~/components/uikit/Box'
import { Text } from '~/components/uikit/Text'
import { Label } from '~/components/uikit/Label'
import { Input } from '~/components/uikit/Input'

const ErrorMessage = styled(Text)`
  color: ${th.color('red')};
  padding: ${th.space(0)}px ${th.space(3)}px;
  font-size: ${th.size(2)}px;
`

export const Field = ({
  textContentType,
  label,
  placeholder,
  placeholderTextColor,
  error,
  disabled,
  value,
  onChangeText,
  onBlur,
  ...props
}) => (
  <Box {...props}>
    <Label>{label}</Label>
    <Input
      textContentType={textContentType}
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
