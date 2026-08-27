import { TouchableOpacity } from 'react-native'
import type { DrawerHeaderProps } from '@react-navigation/drawer'
import { SafeArea } from '~/components/atoms/SafeArea'
import { Box } from '~/components/atoms/Box'
import { Icon } from '~/components/atoms/Icon'
import { Text } from '~/components/atoms/Text'

export const Header = ({ navigation, options }: DrawerHeaderProps) => {
  return (
    <SafeArea bg="raisinBlack" p={2}>
      <Box bg="raisinBlack" flexDirection="row" alignItems="center">
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          onPress={() => navigation.toggleDrawer()}
        >
          <Icon name="menu" width={40} height={40} />
        </TouchableOpacity>

        <Text fontSize={6} ml={2}>
          {options.title}
        </Text>
      </Box>
    </SafeArea>
  )
}
