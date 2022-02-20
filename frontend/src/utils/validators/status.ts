import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	status: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password must not exceed 100 characters'),
});
