import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { Theme } from '~/components/Theme';

import { SignIn } from './';

test('should validate and show error in email field on blur', async() => {
   const emailValue = 'abc'

  const screen = render(
    <Theme>
        <SignIn />
    </Theme>
  )

  const emailInput = screen.getByText('E-mail')
  const submitBtn = screen.getByText('Sign In')

  //execute /act
  fireEvent.changeText(emailInput, emailValue)
  fireEvent.press(submitBtn)

  // assert
  await waitFor(() => expect(screen.getByText('Enter a valid email address')).toBeTruthy())
})

test('should validate and show error in password field on blur', async() => {

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
 await waitFor(() => expect(screen.getByText('A password is required')).toBeTruthy())
})

test('should show required field errors on submit with empty form', async() => {

  const screen = render(
    <Theme>
        <SignIn />
    </Theme>
  )

  const submitBtn = screen.getByText('Sign In')

  //execute /act
  await waitFor(() => fireEvent.press(submitBtn))

  // assert
  const emailInput = screen.getByText('Email is required')
  const passwordInput = screen.getByText('A password is required')

  expect(emailInput).toBeTruthy()
  expect(passwordInput).toBeTruthy()
  expect(submitBtn).toBeDisabled()
 })

test('should re-enable form button and hide errors when form is valid', async() => {
  const emailValue = 'ntest@test.com'
  const passwordValue = '123456'

  const screen = render(
    <Theme>
        <SignIn />
    </Theme>
  )

  const submitBtn = screen.getByText('Sign In')
  const emailInput = screen.getByText('E-mail')
  const passwordInput = screen.getByText('Password')

  //execute /act
  await waitFor(() => fireEvent.press(submitBtn))
  expect(submitBtn).toBeDisabled()

  fireEvent.changeText(emailInput, emailValue)
  fireEvent.changeText(passwordInput, passwordValue)

  await waitFor(() => fireEvent.press(submitBtn))

  // assert
  expect(submitBtn).toBeEnabled()
})
