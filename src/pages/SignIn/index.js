import * as React from 'react';
import { StatusBar } from 'react-native';

import { Box, SafeArea } from '~/components/uikit';

import { Form } from './SignIn/Form';

const Screen = ({ bg = 'raisinBlack', barStyle = 'light-content', children, ...props }) => (
  <SafeArea  bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box {...props} bg={bg} flex={1}>
      {children}
    </Box>
  </SafeArea>
)

export const SignIn = ({}) => (
  <Screen p={3}>
    <Form/>
  </Screen>
)
