import { useState, type ReactNode } from 'react'
import { StatusBar, type StatusBarStyle } from 'react-native'
import { useNavigation, type NavigationProp } from '@react-navigation/native'

import { SafeArea, Logo, Box, Text } from '~/components/atoms'
import type { BoxProps } from '~/components/atoms/Box'
import { useAuth } from '~/components/providers'

import { Form } from './Form'
import { login } from '~/services/sdk'
import type { Credentials } from '~/services/sdk/modules/auth'

interface AuthRoutes {
  '/login': undefined
  '/signup': undefined
}

interface ScreenProps extends Omit<BoxProps, 'children'> {
  bg?: string
  barStyle?: StatusBarStyle
  children: ReactNode
}

const Screen = ({
  bg = 'raisinBlack',
  barStyle = 'light-content',
  children,
  ...props
}: ScreenProps) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box {...props} bg={bg} flex={1}>
      {children}
    </Box>
  </SafeArea>
)

export const Login = () => {
  const navigation = useNavigation<NavigationProp<AuthRoutes>>()
  const [, { login: setAuth }] = useAuth()
  const [error, setError] = useState(false)

  const onSubmit = async (values: Credentials) => {
    setError(false)

    try {
      const data = await login(values)
      setAuth(data)
    } catch {
      setError(true)
    }
  }

  const onSignupPress = () => navigation.navigate('/signup')

  return (
    <Screen p={3} justifyContent="center">
      <Logo flex={0.45} center />

      <Box flex={1}>
        <Text fontSize={6} textAlign="center">
          Access your zuba Account
        </Text>
        {error && (
          <Text color="red" textAlign="center" my={2}>
            Unable to sign in. Check your credentials.
          </Text>
        )}
        <Form onSubmit={onSubmit} onSignupPress={onSignupPress} />
      </Box>

      <Box flex={1.55} />
    </Screen>
  )
}
