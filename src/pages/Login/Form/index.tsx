import * as yup from 'yup'
import { useFormik, type FormikConfig } from 'formik'

import { Box, Field, Button, Text } from '~/components'
import type { Credentials } from '~/services/sdk/modules/auth'

interface FormProps {
  onSubmit: FormikConfig<Credentials>['onSubmit']
  onSignupPress: () => void
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: yup.string().required('A password is required'),
})

export const Form = ({ onSubmit, onSignupPress }: FormProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<Credentials>({
    onSubmit,
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
  })
  return (
    <>
      <Field
        type="text"
        label="E-mail"
        placeholder="Enter your email"
        value={values.email}
        error={touched.email && errors.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        disabled={isSubmitting}
        mb={3}
      />

      <Field
        type="password"
        label="Password"
        placeholder={'Enter your password'}
        value={values.password}
        error={touched.password && errors.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        disabled={isSubmitting}
        mb={3}
      />

      <Box center>
        <Button
          label="Sign In"
          loading={isSubmitting}
          disabled={!isValid}
          onPress={() => handleSubmit()}
          m={1}
        />

        <Box m={1}>
          <Text>
            Don&apos;t have an account?{' '}
            <Text color="gray" fontWeight="bold" onPress={onSignupPress}>
              Sign Up!
            </Text>
          </Text>
        </Box>
      </Box>
    </>
  )
}
