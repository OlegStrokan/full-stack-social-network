import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .min(5, 'Email must be at least 5 characters long')
        .max(20, 'Email can not exceed 20 characters'),
    code: Yup.string()
        .nullable()
        .notRequired()
        .when('code', {
            is: (value: string | any[]) => value?.length,
            then: (rule) => rule.min(5).max(40),
        }),
    password: Yup.string()
        .nullable()
        .notRequired()
        .when('password', {
            is: (value: string | any[]) => value?.length,
            then: (rule) => rule.min(6).max(20),
        }),
}, [
    ['code', 'code'],
    ['password', 'password'],
]);
