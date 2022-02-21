import React from "react";
import { Button, Grid } from "@mui/material";
// @ts-ignore
import styles from "../Login/Login.module.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validators/createPost";
import { fetchedCreate } from "../../redux/ducks/post/post.slice";

interface AddPostInterface {
	userId: string | undefined
}

export const AddPost: React.FC<AddPostInterface> = ({ userId }) => {

	const dispatch = useDispatch();
	const onSubmit = (event: any) => {
		debugger
		dispatch(fetchedCreate(event))
	};
	const {
		register, control, handleSubmit, formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	return (
		<Grid>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				className={styles.inputs}
				noValidate
				sx={{ mt: 3 }}
			>
				<Grid container spacing={2} className={styles.inputs}>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="title"
							label="Title"
							autoComplete="Title"
							{...register("title")}
							error={!!errors.title}
						/>
						<Typography variant="subtitle2" color="error">
							{errors.title?.message}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="content"
							label="Content"
							autoComplete="Content"
							{...register("content")}
							error={!!errors.content}
						/>
						<Typography variant="subtitle2" color="error">
							{errors.content?.message}
						</Typography>
					</Grid>
					<Grid item xs={12} style={{ visibility: 'hidden'}}>
						<TextField
							required
							fullWidth
							value={userId}
							id="userId"
							label="userId"
							autoComplete="userId"
							{...register("userId")}
							error={!!errors.userId}
						/>
						<Typography variant="subtitle2" color="error">
							{errors.userId?.message}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 1, mb: 2, p: 2 }}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};
