import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .max(40, 'Email must not exceed 40 characters'),
  username: Yup.string()
    .required('User name is required')
    .min(6, 'User name must be at least 6 characters')
    .max(20, 'User name must not exceed 20 characters'),
  fullname: Yup.string()
    .required('Full name is required')
    .min(6, 'Full name must be at least 6 characters')
    .max(20, 'Full name must not exceed 20 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
});
