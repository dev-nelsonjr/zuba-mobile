import {
  Text as BaseText,
  type TextProps as NativeTextProps,
} from 'react-native'
import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components/native'

import {
  color,
  space,
  typography,
  type ColorProps,
  type SpaceProps,
  type TypographyProps,
} from 'styled-system'

export type TextProps = NativeTextProps &
  ColorProps &
  SpaceProps &
  TypographyProps

export const Text = styled(BaseText)<TextProps>`
  color: ${themeGet('colors.white')};
  ${color}
  ${space}
  ${typography}
`
