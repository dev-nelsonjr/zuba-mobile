import * as React from 'react'
import { StatusBar, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from '~/lib/styled-native'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { saveTransactions } from '~/components/modules'

import { th } from '../../components/Theme'
import { SafeArea, Box, Text, Field, Button } from '~/components/uikit'

const validationSchema = yup.object().shape({
  value: yup.number().required(),
  description: yup.string().required('put your description'),
})

const Screen = ({
  bg = 'raisinBlack',
  barStyle = 'light-content',
  children,
  ...props
}) => (
  <SafeArea bg={bg} flex={1}>
    <StatusBar barStyle={barStyle} />
    <Box {...props} bg={bg} flex={1}>
      {children}
    </Box>
  </SafeArea>
)

const CurrencyContainer = styled(Box)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ValueInput = styled(TextInput)`
  font-size: ${th.size(10)}px;
  color: ${props => (props.value > 0 ? th.color('blue')(props) : th.color('red')(props))};
  text-align: center;
`

const CurrencyInput = props => (
  <CurrencyContainer>
    <Text fontSize={10} color={Number(props.value) > 0 ? 'blue' : 'red'}>
      R$
    </Text>

    <ValueInput {...props} />
  </CurrencyContainer>
)

export const TransactionForm = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: saveTransactions,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['Transactions'] })
      navigation.navigate('/dashboard')
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
  } = useFormik({
    onSubmit: formValues => mutation.mutateAsync(formValues),
    validationSchema,
    initialValues: {
      value: '',
      description: '',
    },
  })
  return (
    <Screen>
      <Box px={4} py={7} textAlign="center">
        <CurrencyInput
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
          Value of {values.value > 0 ? 'receita' : 'despesa'}
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

        <Button
          label="Save"
          loading={isSubmitting}
          disabled={!isValid}
          onPress={handleSubmit}
          m={1}
        />
      </Box>
    </Screen>
  )
}
