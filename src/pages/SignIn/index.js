import * as React from 'react';
import { StatusBar } from 'react-native';
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
    try {const res = await axios.post("http://localhost:9901/login", {
      auth: values
    })
    setAuth(res.data)}
    catch (error) {
      console.error({ error });
    }
  }

  return (
  <Screen p={3} justifyContent="center">
    <Logo flex={1} center />

    <Box>
    <Text fontSize={6} textAlign="center">Sign in</Text>
    <Form onSubmit={onSubmit}/>
    </Box>

    <Box flex={1} />
  </Screen>
  )
}
