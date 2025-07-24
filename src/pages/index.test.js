import * as React from 'react';
import { render, screen} from '@testing-library/react-native';

import { Theme } from '../components/Theme';
import { AuthProvider } from '../components/Modules';

import { App } from './';

test('should show login form', async () => {
  render(
    <Theme>
     <AuthProvider>
        <App />
      </AuthProvider>
    </Theme>
  )

  const emailInput = await screen.findByText('E-mail');

  expect(emailInput).toBeTruthy()
})
