import * as React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import axios from 'axios'
import '@testing-library/jest-native'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onRehydrateAuthMiddleware } from '~/components/providers/Auth'

import { Theme } from '~/components/providers/Theme'
import { StorageProvider } from '~/components/providers/Storage'
import * as asyncStorage from '~/components/providers/Storage/persistence-adapter/async-storage'

import { App } from './'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderApp = () =>
  render(
    <Theme>
      <QueryClientProvider client={queryClient}>
        <StorageProvider
          persistenceAdapter={asyncStorage}
          onRehydrate={onRehydrateAuthMiddleware}
        >
          <App />
        </StorageProvider>
      </QueryClientProvider>
    </Theme>
  )

jest.mock('axios')
jest.mock('./Dashboard', () => ({
  Dashboard: () => null,
}))

beforeEach(async () => {
  await asyncStorage.clear()
})

test('should show login form', () => {
  const screen = renderApp()

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

  axios.mockResolvedValueOnce({ data: responseData })

  const screen = renderApp()

  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByText('Sign In')

  fireEvent.changeText(emailInput, credentials.email)
  fireEvent.changeText(passwordInput, credentials.password)
  fireEvent.press(submitBtn)

  await waitFor(() => expect(submitBtn).toBeDisabled())

  await waitFor(() => {
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/login',
        auth: {
          username: credentials.email,
          password: credentials.password,
        },
      })
    )
  })
})

test('should not redirect user when API returns error', async () => {
  const credentials = {
    email: 'error@gmail.com',
    password: '123456',
  }

  axios.mockRejectedValueOnce({ data: {} })

  const screen = renderApp()

  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByText('Sign In')

  fireEvent.changeText(emailInput, credentials.email)
  fireEvent.changeText(passwordInput, credentials.password)
  fireEvent.press(submitBtn)

  await waitFor(() => {
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/login',
        auth: {
          username: credentials.email,
          password: credentials.password,
        },
      })
    )
  })

  await waitFor(() => expect(submitBtn).toBeEnabled())
})
