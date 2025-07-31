import * as React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import '@testing-library/jest-native'

import { Theme } from '~/components/Theme'
import { AuthProvider } from '~/components/Modules'

import { App } from './'

jest.mock('axios')

beforeEach(async () => {
  await AsyncStorage.clear()
})

test('should show login form', async () => {
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
  const signupLink = screen.getByText('Sign Up!')

  expect(emailInput).toBeTruthy()
  expect(passwordInput).toBeTruthy()
  expect(submitBtn).toBeTruthy()
  expect(signupLink).toBeTruthy()
})

test('should login user and redirect when API return success', async () => {

    const credentials = {
    email: 'n2test@gmail.com',
    password: '123456',
  }

 axios.post.mockImplementation(() =>
  Promise.resolve({
  data:{
  user: {
  id: 1,
  name: 'n2test 123',
  email: credentials.email,
},
token: '123',
}},
)
)

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

expect(submitBtn).toBeDisabled()

await waitFor(() => { expect(axios.post).toHaveBeenCalledWith( "http://10.0.2.2:9901/login", null, {auth: { password: credentials.password, username: credentials.email}}, )
})

  const dashboardText = screen.getByText('Dash')
  expect(dashboardText).toBeTruthy()
})

test('should not redirect user when API returns error' , async() => {
  const credentials = {
    email: 'error@gmail.com',
    password: '123456',
  }

  axios.post.mockImplementation(() =>
    Promise.reject({
      data:{},
    })
  )

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

  expect(submitBtn).toBeDisabled()

  await waitFor(() => { expect(axios.post).toHaveBeenCalledWith( "http://10.0.2.2:9901/login", null, {auth: { password: credentials.password, username: credentials.email}}, )
})

  expect(submitBtn).toBeEnabled()

})
