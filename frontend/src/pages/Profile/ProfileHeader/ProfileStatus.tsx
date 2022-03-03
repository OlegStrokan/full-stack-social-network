import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "../Profile.module.css";
import { useDispatch } from "react-redux";
import { fetchedStatus } from "../../../redux/ducks/profile/profile.slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/validators/status";
import TextField from "@mui/material/TextField";


interface ProfileInfo {
	id?: number;
	status?: string;
}

export const ProfileStatus: React.FC<ProfileInfo> = ({ status, id }) => {

	const dispatch = useDispatch();

	const [editMode, setEditMode] = React.useState(false);

	const onSubmit = (event: any) => {
		setEditMode(false);
		dispatch(fetchedStatus({ id, status: event.status }));
	};
	const {
		register, control, handleSubmit, formState: { errors }
	} = useForm({
		resolver: yupResolver(validationSchema)
	});


	return (
		<Grid>
			{!editMode
				? <Grid className={styles.flex}>
					<Grid className={styles.status}>
						<Typography variant="subtitle2">{status}</Typography>
					</Grid>
					<Button className={styles.button} variant="contained" size="small" onClick={() => setEditMode(true)}>Change status</Button>
				</Grid>
				:
				<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
					<Grid className={styles.flex}>
						<Button className={styles.button} variant="contained"
								onClick={() => setEditMode(false)}>Back</Button>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="status"
								label="Status"
								autoComplete="Status"
								{...register("status")}
								error={!!errors.status}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.status?.message}
							</Typography>
						</Grid>
						<Button className={styles.button} type="submit" size="small" variant="contained">Submit</Button>
					</Grid>
				</Box>
			}
		</Grid>
	);
};
