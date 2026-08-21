import * as React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
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

jest.useFakeTimers()

const renderApp = async () => {
  const screen = render(
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

  await act(async () => {
    await Promise.resolve()
  })
  await act(() => jest.runAllTimers())

  return screen
}

jest.mock('axios')
jest.mock('./Dashboard', () => ({
  Dashboard: () => null,
}))

beforeEach(async () => {
  await asyncStorage.clear()
})

test('should show login form', async () => {
  const screen = await renderApp()

  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByText('Sign In')

  expect(emailInput).toBeTruthy()
  expect(passwordInput).toBeTruthy()

  expect(submitBtn).toBeTruthy()
})

test('should login user, redirect and register notification token', async () => {
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

  axios
    .mockResolvedValueOnce({ data: responseData })
    .mockResolvedValueOnce({ data: responseData.user })

  const screen = await renderApp()

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

  await waitFor(() => {
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PUT',
        url: '/profile',
        data: {
          firebaseToken: 'test-fcm-token',
        },
        headers: {
          Authorization: `Bearer ${responseData.token}`,
        },
      })
    )
  })
})

test('should send user name when signing up', async () => {
  const user = {
    name: 'New User',
    email: 'new-user@gmail.com',
    password: '123456',
  }

  axios
    .mockResolvedValueOnce({
      data: {
        user,
        token: '123',
      },
    })
    .mockResolvedValueOnce({ data: user })

  const screen = await renderApp()

  fireEvent.press(screen.getByText('Sign Up!'))

  const nameInput = await screen.findByText('Name')
  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByText('Sign Up')

  fireEvent.changeText(nameInput, user.name)
  fireEvent.changeText(emailInput, user.email)
  fireEvent.changeText(passwordInput, user.password)
  fireEvent.press(submitBtn)

  await waitFor(() => {
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/signup',
        data: user,
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

  const screen = await renderApp()

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
  expect(
    screen.getByText('Unable to sign in. Check your credentials.')
  ).toBeTruthy()
})
