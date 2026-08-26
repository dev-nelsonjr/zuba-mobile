import styled from 'styled-components/native'

import {
  background,
  border,
  space,
  color,
  flexbox,
  layout,
} from 'styled-system'
import type {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
} from 'styled-system'
import { View, type ViewProps } from 'react-native'

export type BoxProps = ViewProps &
  BackgroundProps &
  BorderProps &
  SpaceProps &
  ColorProps &
  FlexboxProps &
  LayoutProps & {
    center?: boolean
  }

export const Box = styled(View)<BoxProps>`
  ${background}
  ${border}
  ${space}
  ${color}
  ${flexbox}
  ${layout}
`
