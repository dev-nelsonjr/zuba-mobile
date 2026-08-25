import styled from 'styled-components/native'

import { background, space, color, flexbox, layout } from 'styled-system'
import type {
  BackgroundProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
} from 'styled-system'
import { View, type ViewProps } from 'react-native'

export type BoxProps = ViewProps &
  BackgroundProps &
  SpaceProps &
  ColorProps &
  FlexboxProps &
  LayoutProps & {
    center?: boolean
  }

export const Box = styled(View)<BoxProps>`
  ${background}
  ${space}
  ${color}
  ${flexbox}
  ${layout}
`
