import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Email is required')
    .min(10, 'Email must be at least 10 characters')
    .max(40, 'Email must not exceed 40 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
});
