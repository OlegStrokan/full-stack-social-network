import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "./ProfileHeader.module.css";
import { useDispatch } from "react-redux";
import { fetchedStatus } from "../../../redux/ducks/profile/profile.slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/validators/updateStatus";
import TextField from "@mui/material/TextField";


interface ProfileInfo {
	id?: number;
	status?: string;
	isOwner: boolean;
}

export const ProfileStatus: React.FC<ProfileInfo> = ({ status, id, isOwner }) => {

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
		<Grid className={styles.statusWithButton}>
			{!editMode
				? <Grid className={styles.flex}>
					<Grid>
						<Typography variant="h6">{status}</Typography>
					</Grid>
					{isOwner && <Button  variant="contained" sx={{ ml: 3 }} onClick={() => setEditMode(true)}>Change</Button>}
				</Grid>
				:
				<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
					<Grid className={styles.flex}>
						{isOwner && <Button  variant="contained"
								onClick={() => setEditMode(false)}>Back</Button>}
						<Grid item xs={12}>
							<TextField
								required
								defaultValue={status}
								fullWidth
								sx={{ width: '500px', ml: 1, mr: 1 }}
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
						{isOwner && <Button type="submit" variant="contained">Submit</Button>}
					</Grid>
				</Box>
			}
		</Grid>
	);
};
