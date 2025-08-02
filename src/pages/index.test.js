import * as React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import '@testing-library/jest-native'

import { Theme } from '~/components/Theme'
import { AuthProvider } from '~/components/Modules'

import { App } from './'

import * as sdk from '~/services/sdk'
jest.mock('~/services/sdk', () => ({
  login: jest.fn(),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

test('should show login form', () => {
  const screen = render(
    <Theme>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Theme>
  )

  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByText('Sign In')

  expect(emailInput).toBeTruthy()
  expect(passwordInput).toBeTruthy()

  expect(submitBtn).toBeTruthy()
})

test('should login user and redirect when API return success', async () => {
  const credentials = {
    email: 'n2test@gmail.com',
    password: '123456',
  }

  const responseData = {
    user: {
      id: 1,
      name: 'n2test 123',
      email: credentials.email,
    },
    token: '123',
  }

  sdk.login.mockImplementationOnce(() => Promise.resolve(responseData))

  const screen = render(
    <Theme>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Theme>
  )

  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByText('Sign In')

  fireEvent.changeText(emailInput, credentials.email)
  fireEvent.changeText(passwordInput, credentials.password)
  fireEvent.press(submitBtn)

  await waitFor(() => expect(submitBtn).toBeDisabled())

  await waitFor(() => {
    expect(sdk.login).toHaveBeenCalledWith({
      email: credentials.email,
      password: credentials.password,
    })
  })
})

test('should not redirect user when API returns error', async () => {
  const credentials = {
    email: 'error@gmail.com',
    password: '123456',
  }

  sdk.login.mockImplementationOnce(() => Promise.reject(new Error('API Error')))
  const screen = render(
    <Theme>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Theme>
  )

  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByText('Sign In')

  fireEvent.changeText(emailInput, credentials.email)
  fireEvent.changeText(passwordInput, credentials.password)
  fireEvent.press(submitBtn)

  await waitFor(() => expect(submitBtn).toBeDisabled())

  await waitFor(() => {
    expect(sdk.login).toHaveBeenCalledWith({
      email: credentials.email,
      password: credentials.password,
    })
  })
  expect(submitBtn).toBeEnabled()
})
