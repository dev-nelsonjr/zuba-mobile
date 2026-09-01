import { useState } from 'react'
import { useNavigation, type NavigationProp } from '@react-navigation/native'

import { Screen, Logo, Box, Text } from '~/components/atoms'
import { useAuth } from '~/components/providers'

import { Form } from './Form'
import { login } from '~/services/sdk'
import type { Credentials } from '~/services/sdk/modules/auth'
import type { AuthStackParamList } from '../routes'

export const Login = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
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
