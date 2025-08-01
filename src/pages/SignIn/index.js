import * as React from 'react'
import { StatusBar, Alert } from 'react-native'

import { SafeArea, Logo, Box, Text } from '~/components/uikit'
import { useAuth } from '~/components/modules'

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

export const SignIn = () => {
  const [, { login: setAuth }] = useAuth()

  const onSubmit = async values => {
    try {
      const data = await login(values)
      setAuth(data)
    } catch (err) {
      Alert.alert(
        'Login Error',
        'Unable to log in. Please check your credentials and server connection.'[
          { text: 'OK' }
        ]
      )
      console.log(err.toJSON ? err.toJSON() : err)
    }
  }

  return (
    <Screen p={3} justifyContent="center">
      <Logo flex={1} center />

      <Box flex={1}>
        <Text fontSize={6} textAlign="center">
          Access your zuba Account
        </Text>
        <Form onSubmit={onSubmit} />
      </Box>

      <Box flex={1} />
    </Screen>
  )
}
