import * as React from 'react'
import { StatusBar, Alert } from 'react-native'

import { SafeArea, Logo, Box, Text } from '~/components/uikit'
import { useAuth } from '~/components/modules'

import { Form } from './Form'
import { signup } from '~/services/sdk'

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

export const Signup = ({ navigation }) => {
  const [, { login: setAuth }] = useAuth()

  const onSubmit = async values => {
    try {
      const data = await signup(values)
      setAuth(data)
    } catch (err) {
      Alert.alert(
        'Signup Error',
        'Unable to create your account. Please check your data and server connection.',
        [{ text: 'OK' }]
      )
      console.log(err.toJSON ? err.toJSON() : err)
    }
  }

  return (
    <Screen p={3} justifyContent="center">
      <Logo flex={0.45} center />

      <Box flex={1}>
        <Text fontSize={6} textAlign="center">
          Create your zuba Account
        </Text>
        <Form
          onSubmit={onSubmit}
          onSigninPress={() => navigation.navigate('/login')}
        />
      </Box>

      <Box flex={1.55} />
    </Screen>
  )
}
