import * as React from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import styled from 'styled-components/native'
import { themeGet } from '@styled-system/theme-get'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Icon, Text } from '~/components/atoms'
import { useAuth } from '~/components/providers'

const Item = styled(TouchableOpacity)`
  padding: ${themeGet('space.2')}px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${themeGet('colors.jet')};
  border-bottom-width: 1px;
`

export const Menu = ({ navigation, descriptors }) => {
  const [, { logout }] = useAuth()

  return (
    <>
      <DrawerContentScrollView>
        {Object.values(descriptors).map(item => (
          <Item
            key={item.route.key}
            onPress={() => navigation.navigate(item.route.name)}
          >
            <Icon name={item.options.drawerIcon} width={24} height={24} />
            <Text ml={2}>{item.options.drawerLabel}</Text>
          </Item>
        ))}
      </DrawerContentScrollView>

      <Item onPress={logout}>
        <Icon name="logout" width={25} height={25} />
        <Text ml={2}>Logout</Text>
      </Item>
    </>
  )
}
