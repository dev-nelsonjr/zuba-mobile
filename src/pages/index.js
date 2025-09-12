import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useAuth } from '~/components/modules/Auth/index'

import { Login } from './Login'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'

const Stack = createStackNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="/login" component={Login} />
    <Stack.Screen name="/signup" component={Signup} />
  </Stack.Navigator>
)

const LoggedInStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="/dashboard" component={Dashboard} />
  </Stack.Navigator>
)

export const App = () => {
  const [auth] = useAuth()

  return (
    <NavigationContainer>
      {auth?.user ? <LoggedInStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
