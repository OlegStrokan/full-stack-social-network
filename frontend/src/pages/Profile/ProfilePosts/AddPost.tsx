import React, { ChangeEvent } from "react";
import { Button, FormControl, FormControlLabel, Grid } from "@mui/material";
// @ts-ignore
import styles from "../../Login/Login.module.css";
// @ts-ignore
import style from "../Profile.module.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/validators/createPost";
import { fetchedCreate } from "../../../redux/ducks/post/post.slice";

interface AddPostInterface {
	userId: number | null;
}

export const AddPost: React.FC<AddPostInterface> = ({ userId }) => {

	const dispatch = useDispatch();

	const onSubmit = (event: any) => {
		dispatch(fetchedCreate(event));
		setImage(null);
		reset({ title: '', content: ''})
	};
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(validationSchema)
	});

	const [image, setImage] = React.useState<File | null>(null);

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
							multiline
							rows={10}
							maxRows={20}
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
						<FormControl error={!!errors.file?.message}>
							<FormControlLabel
								control={(
									<Controller
										{...register('image')}
										// @ts-ignore
										inputRef={register()}
										render={({ field: { onChange } }) => (
											<Button
												variant="contained"
												component="label"
											>
												<input
													type="file"
													hidden
													value={image?.name}
													onChange={(e) => {
														onChange(e.target.files);
														// @ts-ignore
														setImage(e.target.files);
													}}
													multiple
												/>
												Upload image
											</Button>
										)}
										control={control}
									/>
								)}
								label=""
							/>
						</FormControl>
						<Typography variant="subtitle2">
							{
								// @ts-ignore
								image && image[0].name
							}
						</Typography>
						<Typography variant="subtitle2" color="error">
							{errors.file?.message}
						</Typography>
					</Grid>
					<Grid>
						<Button type="submit" variant="contained">
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};
