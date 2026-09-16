import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { themeGet } from '@styled-system/theme-get'
import styled from 'styled-components/native'
import { mask } from 'remask'
import { isValid as isValidDate, parse } from 'date-fns'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { saveTransaction } from '~/services/sdk'
import type { TransactionData } from '~/services/sdk/modules/transactions'

import {
  Screen,
  Box,
  Text,
  Field,
  Button,
  CurrencyInput,
} from '~/components/atoms'

const validationSchema = yup.object().shape({
  value: yup
    .number()
    .typeError('Enter a valid transaction value')
    .required('Transaction value is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.string().test({
    name: 'valid-date',
    message: 'Enter a valid due date',
    test: value =>
      !value ||
      (value.length === 10 &&
        isValidDate(parse(value, 'MM/dd/yyyy', new Date()))),
  }),
})

interface TransactionFormValues extends TransactionData {
  value: string
  description: string
  dueDate: string
}

const ValueInput = styled(CurrencyInput)`
  text-align: center;
  font-size: ${themeGet('fontSizes.10')}px;
  color: ${props =>
    Number(props.value) > 0
      ? themeGet('colors.blue')(props)
      : themeGet('colors.red')(props)};
`

export const TransactionForm = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: saveTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    isValid,
    handleSubmit,
  } = useFormik<TransactionFormValues>({
    onSubmit: async (formValues, form) => {
      try {
        await mutation.mutateAsync(formValues)
        form.resetForm()
        navigation.goBack()
      } catch {
        return
      }
    },
    validationSchema,
    initialValues: {
      dueDate: '',
      value: '',
      description: '',
    },
  })
  return (
    <Screen>
      <Box px={4} py={7}>
        <ValueInput
          keyboardType="numeric"
          placeholder="0.00"
          value={values.value}
          error={touched.value && errors.value}
          onChangeText={handleChange('value')}
          onBlur={handleBlur('value')}
          editable={!isSubmitting}
          mb={3}
        />
        <Text textAlign="center" p={2} fontSize={3} color="gray">
          {Number(values.value) > 0 ? 'Income amount' : 'Expense amount'}
        </Text>
      </Box>
      <Box p={4}>
        <Field
          type="text"
          label="Description"
          placeholder="Describe the transaction"
          value={values.description}
          error={touched.description && errors.description}
          onChangeText={handleChange('description')}
          onBlur={handleBlur('description')}
          disabled={isSubmitting}
          mb={3}
        />

        <Field
          type="text"
          label="Due date"
          placeholder="MM/DD/YYYY"
          value={mask(values.dueDate, '99/99/9999')}
          error={touched.dueDate && errors.dueDate}
          onChangeText={handleChange('dueDate')}
          onBlur={handleBlur('dueDate')}
          disabled={isSubmitting}
          mb={3}
        />

        <Button
          label="Save"
          loading={isSubmitting}
          disabled={!isValid}
          onPress={handleSubmit}
          m={1}
        />

        {mutation.isError && (
          <Text color="red" textAlign="center" mt={3} accessibilityRole="alert">
            Unable to save the transaction. Check the fields and try again.
          </Text>
        )}
      </Box>
    </Screen>
  )
}
