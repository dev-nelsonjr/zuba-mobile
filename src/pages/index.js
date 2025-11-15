import 'react-native-gesture-handler'

import * as React from 'react'
import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  getMessaging,
  requestPermission,
  AuthorizationStatus,
  getToken,
  onTokenRefresh,
} from '@react-native-firebase/messaging'

import { useAuth } from '~/components/providers/Auth'
import { Menu } from '~/components/molecules/Menu'
import { Header } from '~/components/atoms/Header'

import { Login } from './Login'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'
import { TransactionForm } from './Transactions'

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
      header: Header,
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

    <Drawer.Screen
      name="/transaction"
      component={TransactionForm}
      options={{
        drawerIcon: 'graph',
      }}
    />
  </Drawer.Navigator>
)

async function requestUserPermission() {
  const authStatus = await requestPermission(getMessaging())
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL

  console.log('Authorization status:', authStatus)

  return enabled
}

export const App = () => {
  const [auth] = useAuth()

  useEffect(() => {
    const messaging = getMessaging()

    const registerForNotifications = async () => {
      const enabled = await requestUserPermission()

      if (!enabled) return

      const token = await getToken(messaging)
      console.log('FCM token:', token)
    }

    registerForNotifications()

    return onTokenRefresh(messaging, token => {
      console.log('FCM token atualizado:', token)
    })
  }, [])

  return (
    <NavigationContainer>
      {auth?.user ? <LoggedInStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
