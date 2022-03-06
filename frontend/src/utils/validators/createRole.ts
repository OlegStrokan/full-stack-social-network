import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	value: Yup.string()
		.required("Value is required")
		.min(5, "Value must be at least 5 characters")
		.max(20, "Value must not exceed 20 characters"),
	description: Yup.string()
		.required("Description is required")
		.min(10, "Description must be at least 10 characters")
		.max(30, "Description must not exceed 30 characters"),
});
