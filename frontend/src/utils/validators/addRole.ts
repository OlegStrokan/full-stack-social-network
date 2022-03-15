import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	role: Yup.string()
		.required("Role is required")
		.min(5, "Ban Reason must be at least 5 characters")
		.max(20, "Ban Reason must not exceed 20 characters"),
	userId: Yup.number(),
});
