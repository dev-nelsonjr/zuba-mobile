import * as React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import axios from 'axios'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Theme } from '~/components/providers/Theme'
import { TransactionForm } from '.'

const mockGoBack = jest.fn()

jest.mock('axios')
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}))
jest.mock('react-native-currency-input', () => {
  const { TextInput } = jest.requireActual('react-native')

  const MockCurrencyInput = ({ onChangeValue, value, ...props }) => (
    <TextInput
      {...props}
      value={value === null ? '' : String(value)}
      onChangeText={nextValue => onChangeValue(Number(nextValue))}
    />
  )

  return MockCurrencyInput
})

const renderTransaction = queryClient =>
  render(
    <Theme>
      <QueryClientProvider client={queryClient}>
        <TransactionForm />
      </QueryClientProvider>
    </Theme>
  )

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
        gcTime: Infinity,
      },
    },
  })

beforeEach(() => {
  jest.clearAllMocks()
})

test('should wait for transaction creation before returning', async () => {
  let resolveRequest
  const request = new Promise(resolve => {
    resolveRequest = resolve
  })
  const queryClient = createQueryClient()
  const invalidateQueries = jest.spyOn(queryClient, 'invalidateQueries')

  axios.mockReturnValueOnce(request)

  const screen = renderTransaction(queryClient)

  fireEvent.changeText(screen.getByPlaceholderText('0.00'), '100')
  fireEvent.changeText(
    screen.getByPlaceholderText('Describe the transaction'),
    'Salary'
  )
  fireEvent.press(screen.getByText('Save'))

  await waitFor(() =>
    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/transactions',
        data: {
          description: 'Salary',
          value: '100',
        },
      })
    )
  )
  expect(mockGoBack).not.toHaveBeenCalled()

  await act(async () => {
    resolveRequest({ data: { id: 'transaction-id' } })
    await request
  })

  await waitFor(() => {
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['dashboard'],
    })
    expect(mockGoBack).toHaveBeenCalledTimes(1)
  })

  screen.unmount()
  queryClient.clear()
})

test('should keep form values and show error when transaction fails', async () => {
  axios.mockRejectedValueOnce(new Error('Request failed'))
  const queryClient = createQueryClient()
  const screen = renderTransaction(queryClient)

  fireEvent.changeText(screen.getByPlaceholderText('0.00'), '100')
  fireEvent.changeText(
    screen.getByPlaceholderText('Describe the transaction'),
    'Salary'
  )
  fireEvent.press(screen.getByRole('button', { name: 'Save' }))

  expect(
    await screen.findByText(
      'Unable to save the transaction. Check the fields and try again.'
    )
  ).toBeTruthy()
  expect(
    screen.getByPlaceholderText('Describe the transaction').props.value
  ).toBe('Salary')
  expect(mockGoBack).not.toHaveBeenCalled()

  screen.unmount()
  queryClient.clear()
})
