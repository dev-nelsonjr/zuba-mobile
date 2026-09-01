import type { ReactNode } from 'react'
import { StatusBar, type StatusBarStyle } from 'react-native'

import { Box, type BoxProps } from '../Box'
import { SafeArea } from '../SafeArea'

interface ScreenProps extends Omit<BoxProps, 'children'> {
  bg?: string
  barStyle?: StatusBarStyle
  children: ReactNode
}

export const Screen = ({
  bg = 'raisinBlack',
  barStyle = 'light-content',
  children,
  ...props
}: ScreenProps) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box {...props} bg={bg} flex={1}>
      {children}
    </Box>
  </SafeArea>
)
