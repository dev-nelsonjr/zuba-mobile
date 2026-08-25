import {
  SafeAreaView,
  type SafeAreaViewProps,
} from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { background, space, color, flexbox, layout } from 'styled-system'
import type {
  BackgroundProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
} from 'styled-system'

export type SafeAreaProps = SafeAreaViewProps &
  BackgroundProps &
  SpaceProps &
  ColorProps &
  FlexboxProps &
  LayoutProps

export const SafeArea = styled(SafeAreaView)<SafeAreaProps>`
  ${background}
  ${space}
  ${color}
  ${flexbox}
  ${layout}
`
