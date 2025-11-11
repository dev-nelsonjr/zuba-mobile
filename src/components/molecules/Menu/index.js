import * as React from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import styled from 'styled-components/native'
import { themeGet } from '@styled-system/theme-get'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Box, Icon } from '~/components/atoms'

const Container = styled(Box)`
  padding: ${themeGet('spaces.2')}px;
  border-bottom-color: ${themeGet('colors.jet')};
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
            <Icon name={item.options.drawerIcon} width={24} height={24} />
          </Item>
        ))}
      </Item>
    </DrawerContentScrollView>
  )
}
