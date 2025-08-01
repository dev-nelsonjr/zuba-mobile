import * as React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'

import { Theme } from '~/components/Theme'
import { SignIn } from '.'

test('should validate and show error in email field on blur', async () => {
  const emailValue = 'abc'

  const screen = render(
    <Theme>
      <SignIn />
    </Theme>
  )

  const emailInput = screen.getByText('E-mail')
  const submitBtn = screen.getByText('Sign In')

  //execute /act
  await fireEvent.changeText(emailInput, emailValue)
  await fireEvent.press(submitBtn)

  // assert
  await waitFor(() =>
    expect(screen.getByText('Enter a valid email address')).toBeTruthy()
  )
})

test('should validate and show error in password field on blur', async () => {
  const screen = render(
    <Theme>
      <SignIn />
    </Theme>
  )

  const passwordInput = screen.getByText('Password')
  const submitBtn = screen.getByText('Sign In')

  //execute /act
  fireEvent.changeText(passwordInput, '')
  fireEvent.press(submitBtn)

  // assert
  await waitFor(() =>
    expect(screen.getByText('A password is required')).toBeTruthy()
  )
})

test('should show required field errors on submit with empty form', async () => {
  const screen = render(
    <Theme>
      <SignIn />
    </Theme>
  )

  const submitButton = screen.getByText('Sign In')

  //execute /act
  await waitFor(() => fireEvent.press(submitButton))

  // assert
  const emailError = screen.getByText('Email is required')
  const passwordError = screen.getByText('A password is required')

  expect(emailError).toBeTruthy()
  expect(passwordError).toBeTruthy()
  expect(submitButton).toBeDisabled()
})

test('should re-enable form button and hide errors when form is valid', async () => {
  const emailValue = 'test@test.com'
  const passwordValue = '123456'

  const screen = render(
    <Theme>
      <SignIn />
    </Theme>
  )

  const submitButton = screen.getByText('Sign In')
  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')

  //execute /act
  await fireEvent.press(submitButton)

  // Digite os valores nos campos
  await fireEvent.changeText(emailInput, emailValue)
  await fireEvent.changeText(passwordInput, passwordValue)

  await waitFor(() => {
    expect(submitButton).toBeEnabled()
  })

  expect(screen.queryByText('Email is required')).not.toBeTruthy()
  expect(screen.queryByText('A password is required')).not.toBeTruthy()
})
