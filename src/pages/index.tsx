import 'react-native-gesture-handler'

import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SafeAreaProvider } from 'react-native-safe-area-context'
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
import { updateProfile } from '~/services/sdk'

import { Login } from './Login'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'
import { TransactionForm } from './Transactions'
import type { AppDrawerParamList, AuthStackParamList } from './routes'

const Stack = createStackNavigator<AuthStackParamList>()
const Drawer = createDrawerNavigator<AppDrawerParamList>()

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
        width: 200,
      },
    }}
  >
    <Drawer.Screen
      name="/dashboard"
      component={Dashboard}
      options={{
        title: 'Dashboard',
        drawerLabel: 'Dashboard',
      }}
    />

    <Drawer.Screen
      name="/transaction"
      component={TransactionForm}
      options={{
        title: 'New transaction',
        drawerLabel: 'New transaction',
      }}
    />
  </Drawer.Navigator>
)

async function requestUserPermission() {
  const authStatus = await requestPermission(getMessaging())
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL

  return enabled
}

export const App = () => {
  const [auth] = useAuth()

  useEffect(() => {
    if (!auth?.user) return undefined

    const messaging = getMessaging()
    const updateNotificationToken = (firebaseToken: string) =>
      updateProfile({ firebaseToken })

    const registerForNotifications = async () => {
      const enabled = await requestUserPermission()

      if (!enabled) return

      const token = await getToken(messaging)
      await updateNotificationToken(token)
    }

    registerForNotifications().catch(() => undefined)

    return onTokenRefresh(messaging, token => {
      updateNotificationToken(token).catch(() => undefined)
    })
  }, [auth?.user])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {auth?.user ? <LoggedInStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
