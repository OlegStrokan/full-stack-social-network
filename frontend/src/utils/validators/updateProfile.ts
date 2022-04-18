import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email()
		.min(6, 'Email be at least 6 characters')
		.max(40, 'Email must not exceed 40 characters'),
	fullname: Yup.string()
		.min(6, 'Full name must be at least 6 characters')
		.max(30, 'Full name must not exceed 30 characters'),
	location: Yup.string()
		.min(5, 'Location must be at least 5 characters')
		.max(50, 'Location must not exceed 50 characters'),
	job: Yup.string()
		.min(6, 'Job\'s name must be at least 6 characters')
		.max(100, 'Job\'s name must not exceed 100 characters'),
	birth: Yup.string()
		.min(10, 'Date of birth must be at least 10 characters')
		.max(20, 'Date of birth must not exceed 20 characters'),
	info: Yup.string()
		.min(10, 'Info about you must be at least 10 characters')
		.max(100, 'Password must not exceed 100 characters'),
	interests: Yup.string()
		.min(3, 'Password must be at least 3 characters')
		.max(100, 'Password must not exceed 100 characters'),
});
