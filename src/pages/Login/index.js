import * as React from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { SafeArea, Logo, Box, Text } from '~/components/atoms'
import { useAuth } from '~/components/providers'

import { Form } from './Form'
import { login } from '~/services/sdk'

const Screen = ({
  bg = 'raisinBlack',
  barStyle = 'light-content',
  children,
  ...props
}) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box {...props} bg={bg} flex={1}>
      {children}
    </Box>
  </SafeArea>
)

export const Login = () => {
  const navigation = useNavigation()
  const [, { login: setAuth }] = useAuth()

  const onSubmit = async values => {
    try {
      const data = await login(values)
      setAuth(data)
    } catch (error) {
      console.log({ error })
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
        <Form onSubmit={onSubmit} onSignupPress={onSignupPress} />
      </Box>

      <Box flex={1.55} />
    </Screen>
  )
}
