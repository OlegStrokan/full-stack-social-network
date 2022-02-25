import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	title: Yup.string()
		.required("Title is required")
		.min(10, "Title must be at least 10 characters")
		.max(40, "Title must not exceed 40 characters"),
	content: Yup.string()
		.required("Content is required")
		.min(50, "Content must be at least 50 characters")
		.max(1000, "Content must not exceed 1000 characters"),
	userId: Yup.string()
});
