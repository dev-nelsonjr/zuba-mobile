import { useState } from 'react'
import { useNavigation, type NavigationProp } from '@react-navigation/native'

import { Screen, Logo, Box, Text } from '~/components/atoms'
import { useAuth } from '~/components/providers'

import { Form } from './Form'
import { signup } from '~/services/sdk'
import type { SignupData } from '~/services/sdk/modules/auth'
import type { AuthStackParamList } from '../routes'

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
