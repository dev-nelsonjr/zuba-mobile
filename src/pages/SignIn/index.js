import * as React from 'react';
import { StatusBar, Alert } from 'react-native';
import axios from 'axios';

import { SafeArea, Logo, Box, Text } from '~/components/uikit';
import { useAuth } from '~/components/modules';

import { Form } from './Form';

const Screen = ({ bg = 'raisinBlack', barStyle = 'light-content', children, ...props }) => (
  <SafeArea  bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box {...props} bg={bg} flex={1}>
      {children}
    </Box>
  </SafeArea>
)

export const SignIn = () => {
  const [, { login: setAuth }] = useAuth()

  const onSubmit = async (values) => {
    try{
      const res = await axios.post('http://10.0.2.2:9901/login', null, {
        auth: {
          username: values.email,
          password: values.password
        }
      })
      setAuth(res.data)
  } catch (err) {
    Alert.alert(
      'Login Error',
      'Could not log in. Please check your credentials and server connection.',
      [{ text: 'OK' }]
    )
    console.log(err.toJSON ? err.toJSON() : err);
  }
}

  return (
  <Screen p={3} justifyContent="center">
    <Logo flex={1} center />

    <Box flex={1}>
    <Text fontSize={6} textAlign="center">Access Your Zuba Account</Text>
    <Form onSubmit={onSubmit} />
    </Box>

    <Box flex={1} />
  </Screen>
  )
}
