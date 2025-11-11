import * as React from 'react'
import InputCurrenty from 'react-native-currency-input'

export const CurrencyInput = ({ onChangeText, prefix = '$', ...props }) => {
  const handleChange = value => onChangeText(value ? `${value}` : '0.00')
  return (
    <InputCurrenty {...props} prefix={prefix} onChangeValue={handleChange} />
  )
}
