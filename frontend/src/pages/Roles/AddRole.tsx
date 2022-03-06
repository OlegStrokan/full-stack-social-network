import React from "react";
import { Button,  Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchedCreate } from "../../redux/ducks/role/role.slice";
// @ts-ignore
import styles from '../Login/Login.module.css';
// @ts-ignore
import style from '../Profile/Profile.module.css';
import { validationSchema } from "../../utils/validators/createRole";

export const AddRole: React.FC = () => {

	const dispatch = useDispatch();

	const onSubmit = (event: any) => {
		dispatch(fetchedCreate(event));
	};
	const {
		register,
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
					<Typography variant="h6">Create new role:</Typography>
					<Grid item xs={12}>
						<TextField
							sx={{ m: '10px 0' }}
							required
							fullWidth
							id="value"
							label="Value"
							autoComplete="Value"
							{...register("value")}
							error={!!errors.value}
						/>
						<Typography variant="subtitle2" color="error">
							{errors.value?.message}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="description"
							label="Description"
							autoComplete="Description"
							{...register("description")}
							error={!!errors.description}
						/>
						<Typography variant="subtitle2" color="error">
							{errors.content?.description}
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
