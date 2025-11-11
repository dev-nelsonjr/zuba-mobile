import * as React from 'react'

import { TouchableOpacity } from 'react-native'
import { SafeArea } from '~/components/atoms/SafeArea'
import { Box } from '~/components/atoms/Box'
import { Icon } from '~/components/atoms/Icon'

export const Header = ({ navigation, route, options, back }) => {
  return (
    <SafeArea bg="raisinBlack" p={2}>
      <Box bg="raisinBlack">
        <TouchableOpacity onPress={navigation.toggleDrawer}>
          <Icon name="menu" width={40} height={40} />
        </TouchableOpacity>
      </Box>
    </SafeArea>
  )
}
