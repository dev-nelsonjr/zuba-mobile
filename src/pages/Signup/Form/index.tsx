import * as yup from 'yup'
import { useFormik, type FormikConfig } from 'formik'

import { Box, Field, Button, Text } from '~/components'
import type { SignupData } from '~/services/sdk/modules/auth'

interface FormProps {
  onSubmit: FormikConfig<SignupData>['onSubmit']
  onSigninPress: () => void
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
  password: yup.string().required('A password is required'),
})

export const Form = ({ onSubmit, onSigninPress }: FormProps) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik<SignupData>({
    onSubmit,
    validationSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  return (
    <>
      <Field
        type="text"
        label="Name"
        placeholder="Enter your name"
        value={values.name}
        error={touched.name && errors.name}
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        disabled={isSubmitting}
        mb={3}
      />

      <Field
        type="text"
        label="Email"
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
          label="Create account"
          loading={isSubmitting}
          disabled={!isValid}
          onPress={() => handleSubmit()}
          m={1}
        />

        <Box m={1}>
          <Text>
            Already have an account?{' '}
            <Text color="gray" fontWeight="bold" onPress={onSigninPress}>
              Sign in
            </Text>
          </Text>
        </Box>
      </Box>
    </>
  )
}
