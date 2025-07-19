import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { Theme } from './components/Theme'
import { App } from './pages'

export const Main = () => {
  return (
    <Theme>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="/signin" component={App} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Theme>
  )
}
