import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	banReason: Yup.string()
		.required("Ban Reason is required")
		.min(10, "Ban Reason must be at least 10 characters")
		.max(100, "Ban Reason must not exceed 100 characters"),
	userId: Yup.number(),
});
