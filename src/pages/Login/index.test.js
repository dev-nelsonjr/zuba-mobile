import * as React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'

import { NavigationContainer } from '@react-navigation/native'

import { StorageProvider } from '~/components/providers/Storage'
import * as asyncStorage from '~/components/providers/Storage/persistence-adapter/async-storage'
import { onRehydrateAuthMiddleware } from '~/components/providers/Auth'

import { Theme } from '~/components/providers/Theme'
import { Login } from '.'

const renderLogin = () =>
  render(
    <Theme>
      <StorageProvider
        persistenceAdapter={asyncStorage}
        onRehydrate={onRehydrateAuthMiddleware}
      >
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </StorageProvider>
    </Theme>
  )

test('should validate and show error in email field on blur', async () => {
  const emailValue = 'abc'
  const screen = renderLogin()

  const emailInput = screen.getByText('Email')
  const submitBtn = screen.getByRole('button', { name: 'Sign In' })

  fireEvent.changeText(emailInput, emailValue)
  fireEvent.press(submitBtn)

  await waitFor(() =>
    expect(screen.getByText('Enter a valid email address')).toBeTruthy()
  )
})

test('should validate and show error in password field on blur', async () => {
  const screen = renderLogin()

  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByRole('button', { name: 'Sign In' })

  fireEvent.changeText(passwordInput, '')
  fireEvent.press(submitBtn)

  await waitFor(() =>
    expect(screen.getByText('A password is required')).toBeTruthy()
  )
})

test('should show required field errors on submit with empty form', async () => {
  const screen = renderLogin()

  const submitButton = screen.getByRole('button', { name: 'Sign In' })

  await waitFor(() => fireEvent.press(submitButton))

  const emailError = screen.getByText('Email is required')
  const passwordError = screen.getByText('A password is required')

  expect(emailError).toBeTruthy()
  expect(passwordError).toBeTruthy()
  expect(submitButton).toBeDisabled()
})

test('should re-enable form button and hide errors when form is valid', async () => {
  const emailValue = 'test@test.com'
  const passwordValue = '123456'

  const screen = renderLogin()

  const submitButton = screen.getByRole('button', { name: 'Sign In' })
  const emailInput = screen.getByText('Email')
  const passwordInput = screen.getByText('Password')

  fireEvent.press(submitButton)

  fireEvent.changeText(emailInput, emailValue)
  fireEvent.changeText(passwordInput, passwordValue)

  await waitFor(() => {
    expect(submitButton).toBeEnabled()
  })

  expect(screen.queryByText('Email is required')).not.toBeTruthy()
  expect(screen.queryByText('A password is required')).not.toBeTruthy()
})
