import React from "react";
import { Button, Grid } from "@mui/material";
// @ts-ignore
import styles from "../../Login/Login.module.css";
// @ts-ignore
import style from "../Profile.module.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/validators/createPost";
import { fetchedCreate } from "../../../redux/ducks/post/post.slice";

interface AddPostInterface {
	userId: string | undefined;
}

export const AddPost: React.FC<AddPostInterface> = ({ userId }) => {
	const dispatch = useDispatch();
	const onSubmit = (event: any) => {
		dispatch(fetchedCreate(event));
	};
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(validationSchema)
	});

	return (
		<Grid className={style.addPostForm}>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				className={styles.inputs}
			>
				<Grid container>
					<Typography variant="h6">Create new post:</Typography>
					<Grid item xs={12}>
						<TextField
							sx={{ m: '10px 0' }}
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
					<Grid item xs={12} style={{ visibility: "hidden" }}>
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
					<Grid>
						<Button type="submit" sx={{ p: '10px 30px' }} variant="contained">
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};
