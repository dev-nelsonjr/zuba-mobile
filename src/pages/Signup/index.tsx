import { useState, type ReactNode } from 'react'
import { StatusBar, type StatusBarStyle } from 'react-native'
import { useNavigation, type NavigationProp } from '@react-navigation/native'

import { SafeArea, Logo, Box, Text } from '~/components/atoms'
import type { BoxProps } from '~/components/atoms/Box'
import { useAuth } from '~/components/providers'

import { Form } from './Form'
import { signup } from '~/services/sdk'
import type { SignupData } from '~/services/sdk/modules/auth'
import type { AuthStackParamList } from '../routes'

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

export const Signup = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
  const [, { login: setAuth }] = useAuth()
  const [error, setError] = useState(false)

  const onSubmit = async (values: SignupData) => {
    setError(false)

    try {
      const data = await signup(values)
      setAuth(data)
    } catch {
      setError(true)
    }
  }

  const onSigninPress = () => navigation.navigate('/login')

  return (
    <Screen p={3} justifyContent="center">
      <Logo flex={0.45} center />

      <Box flex={1}>
        <Text fontSize={6} textAlign="center">
          Create your zuba Account
        </Text>
        {error && (
          <Text color="red" textAlign="center" my={2}>
            Unable to create account. Try again.
          </Text>
        )}
        <Form onSubmit={onSubmit} onSigninPress={onSigninPress} />
      </Box>

      <Box flex={1.55} />
    </Screen>
  )
}
