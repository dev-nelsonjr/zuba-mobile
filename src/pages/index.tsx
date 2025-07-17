import * as React from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';

import { Box, SafeArea, Text } from '~/components/uikit';
import { definitions } from '~/components/Theme';

interface ScreenProps {
  bg?: keyof typeof definitions.colors;
  barStyle?: StatusBarStyle;
  children: React.ReactNode;
}

const Screen = ({ bg = 'raisinBlack', barStyle = 'light-content', children }: ScreenProps) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box flex={1} p={4} center>
      {children}
    </Box>
  </SafeArea>
);

export const App = () => (
  <Screen>
    <Text>
      Welcome to the App!
    </Text>
  </Screen>
)
