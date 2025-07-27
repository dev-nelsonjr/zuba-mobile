import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useAuth } from '~/components/modules/Auth/index'

import { SignIn } from './SignIn'
import { Dashboard } from './Dashboard'

const Stack = createStackNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="/signin" component={SignIn} />
  </Stack.Navigator>
)

const LoggedInStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="/dashboard" component={Dashboard} />
  </Stack.Navigator>
)

export const App = () => {
  const [authState] = useAuth()

  return (
    <NavigationContainer>
      {authState?.auth?.user ? <LoggedInStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
