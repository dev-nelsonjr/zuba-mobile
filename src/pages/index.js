import * as React from 'react';
import { StatusBar } from 'react-native';

import { Box, SafeArea, Field, Button, Text } from '~/components/uikit';


const Screen = ({ bg = 'raisinBlack', barStyle = 'light-content', children }) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box flex={1} p={4}>
      {children}
    </Box>
  </SafeArea>
)

export const App = () => (
  <Screen>
      <Field
        type="text"
        name="email"
        label="E-mail"
        placeholder="Enter your email"
        // value={values.email}
        // error={touched.email && errors.email}
        // onChange={handleChange}
        // onBlur={handleBlur}
        // disabled={isSubmitting}
        mb={3}
      />

      {/* <Field
        type="password"
        name="password"
        label="Password"
        placeholder={"Enter your password"}
        value={values.password}
        error={touched.password && errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        mb={3}
      />
*/}
      <Box flexbox="column" center>
        <Button
        //loading={isSubmitting}
        //disabled={!isValid}
        m={1}
        >
          <Text color="black">SignIn</Text>
        </Button>

      {/* <Box m={1} fontSize={1} color="gray"> Don't have an account? {' '}
         <Link to="/signup" color="gray" fontWeight="bold">Sign Up!</Link>
        </Box>*/}
      </Box>
  </Screen>
)
