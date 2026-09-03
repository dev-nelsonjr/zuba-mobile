import { fireEvent, render, screen } from '@testing-library/react-native'

import { Theme } from '~/components/providers/Theme'
import { Transaction } from '.'

test('should expose transaction actions', () => {
  const onToggle = jest.fn()
  const onDelete = jest.fn()

  render(
    <Theme>
      <Transaction
        title="Electricity bill"
        value="-75.00"
        type="expense"
        resolved={false}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </Theme>
  )

  expect(screen.getByText('Pending')).toBeTruthy()

  fireEvent.press(
    screen.getByRole('button', {
      name: 'Mark Electricity bill as resolved',
    })
  )

  expect(onToggle).toHaveBeenCalledTimes(1)

  fireEvent.press(
    screen.getByRole('button', { name: 'Delete Electricity bill' })
  )

  expect(onDelete).toHaveBeenCalledTimes(1)
})
