import * as React from 'react';
import { StatusBar } from 'react-native';

import { SafeArea, Logo, Box, Text } from '~/components/uikit';
import { useAuth } from '~/components/modules';

import { Form } from './SignIn/Form';

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

  const onSubmit = (values) => {
    //axios.post
    setAuth({
      token: 123,
      user: values
    })
  }

  return (
  <Screen p={3} justifyContent="center">
    <Logo flex={1} center />

    <Box>
    <Text fontSize={6} textAlign="center">SignIn</Text>
    <Form onSubmit={onSuccess}/>
    </Box>

    <Box flex={1} />
  </Screen>
  )
}
