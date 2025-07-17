import * as yup from 'yup'
import { useFormik } from 'formik'

import { Box, Field, Button, Text} from '~/components'

const  validationSchema = yup.object().shape({
  email: yup.string().required('Email is required.').email('Enter a valid email address.'),
  password: yup.string().required('A password is required.')
})

export const Form =({ onSubmit, onSignupPress }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid } = useFormik({
    onSubmit,
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    }
  })
  return(
    <>
      <Field
        type="text"
        name="email"
        label="E-mail"
        placeholder="Enter your email"
        value={values.email}
        error={touched.email && errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        mb={3}
      />

      <Field
        type="password"
        name="password"
        label="Password"
        placeholder={"Enter your password"}
        value={values.password}
        error={touched.password && errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        mb={3}
      />

      <Box center>
        <Button
            label="Sign In"
            loading={isSubmitting}
            disabled={!isValid}
            onPress={handleSubmit}
            m={1}
           />

        <Box m={1} fontSize={1} color="gray">
          <Text>Don't have an account?{' '}
         <Text color="gray" fontWeight="bold" onPress={onSignupPress}>Sign Up!</Text>
         </Text>
        </Box>
      </Box>
    </>
  )
}
