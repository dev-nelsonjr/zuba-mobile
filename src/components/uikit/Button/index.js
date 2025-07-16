import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from "styled-components/native"

import { th, margin } from '../../Theme/styled';import { Text } from '~/components/uikit/Text';

 const StyledButton = styled(TouchableOpacity)`
  background: ${th.color('white')};
  border: none;
  border-radius: 200px;
  color: ${th.color('black')};
  padding: ${th.space(2)}px ${th.space(8)}px;
  justify-content: center;
  align-items: center;

  ${({ disabled }) => disabled && 'opacity: 0.5'}

  ${margin}
`


export const Button = ({ color= 'black', label, disabled, loading, children, ...props }) =>(
<StyledButton {...props} disabled={disabled || loading}>{/*loading ? <Spinner/> : children*/}
  <Text color={color}>{label}</Text>
  {children}
</StyledButton>
)
