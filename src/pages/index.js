import * as React from 'react'
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useAuth, Menu } from '~/components/'

import { Login } from './Login'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="/login" component={Login} />
    <Stack.Screen name="/signup" component={Signup} />
  </Stack.Navigator>
)

const LoggedInStack = () => (
  <Drawer.Navigator
    drawerContent={props => <Menu {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: '#000',
        width: 'auto',
      },
    }}
  >
    <Drawer.Screen
      name="/dashboard"
      component={Dashboard}
      options={{
        drawerIcon: 'dash',
      }}
    />
  </Drawer.Navigator>
)

export const App = () => {
  const [auth] = useAuth()

  return (
    <NavigationContainer>
      {auth?.user ? <LoggedInStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
