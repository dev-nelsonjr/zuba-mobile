import * as React from 'react'

import styled from '~/lib/styled-native'

import { DrawerContentScrollView } from '@react-navigation/drawer'

import { th } from '~/components/Theme'
import { Box, Icon } from '~/components/uikit'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Container = styled(Box)`
  padding: ${th.space(2)}px;
  border-bottom-color: ${th.color('jet')};
  border-bottom-width: 1px;
`

const Item = ({ onPress, children, ...props }) => (
  <Container {...props}>
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  </Container>
)

export const Menu = ({ navigation, descriptors }) => {
  return (
    <DrawerContentScrollView>
      <Item>
        {Object.values(descriptors).map(item => (
          <Item
            key={item.route.key}
            onPress={() => navigation.navigate(item.route.name)}
          >
            <Icon name={item.options.drawerIcon} />
          </Item>
        ))}
      </Item>
    </DrawerContentScrollView>
  )
}
