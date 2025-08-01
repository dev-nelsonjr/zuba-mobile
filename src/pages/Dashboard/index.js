import * as React from 'react'
import { StatusBar } from 'react-native'

import { SafeArea, Box, Text } from '~/components/uikit'

const Screen = ({
  bg = 'raisinBlack',
  barStyle = 'light-content',
  children,
  ...props
}) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box {...props} bg={bg} flex={1}>
      {children}
    </Box>
  </SafeArea>
)

export const Dashboard = () => (
  <Screen>
    <Box>
      <Text>Dash</Text>
    </Box>
  </Screen>
)
