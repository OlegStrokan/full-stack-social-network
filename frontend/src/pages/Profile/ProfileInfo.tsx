import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ProfileDto } from '../../types/profile/profile.dto';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../utils/validators/updateProfile';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchedUpdate } from '../../redux/ducks/profile/profile.slice';
// @ts-ignore
import styles from './Profile.module.css';
interface ProfileInfoInterface {
	profile: ProfileDto;
	isOwner: boolean
	error: any
}

export const ProfileInfo: React.FC<ProfileInfoInterface> = ({ profile, isOwner, error }) => {

	const {
		register, handleSubmit, formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});


	const dispatch = useDispatch();

	const [editMode, setEditMode] = React.useState(false);

	const onSubmit = (event: any) => {
		dispatch(fetchedUpdate({
			email: event.email,
			fullname: event.fullname,
			location: event.location,
			job: event.job,
			birth: event.birth,
			about: event.about,
			interests: event.interests,
			id: profile.id,
		}))
		setEditMode(!editMode)
	}

	return (
		<Grid>
			{!editMode ?
				<Grid className={styles.profileInfoBlock}>
					<Typography variant="subtitle1">{profile.email}</Typography>
					<Typography variant="subtitle1"><b>About:</b> {profile.about}</Typography>
					<Typography variant="subtitle1"><b>Interests:</b> {profile.interests}</Typography>
					<Typography variant="subtitle1"><b>Date of birth:</b> {profile.birth}</Typography>
					<Typography variant="subtitle1"><b>Job:</b> {profile.job}</Typography>
					<Typography variant="subtitle1"><b>Location:</b> {profile.location}</Typography>
					{isOwner &&	<Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={() => setEditMode(!editMode)}>Edit</Button>}
				</Grid>
				: <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
					<Grid container spacing={0}>
						<Grid item xs={12} textAlign="center" sx={{ mt: 2 }}>
							<Button onClick={() => setEditMode(!editMode)} variant="contained" color="primary">Back</Button>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								id="email"
								label="Email"
								autoComplete="email"
								autoFocus
								{...register('email')}
								error={!!errors.email}
								defaultValue={profile.email}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.username?.message}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								label="Full name"
								id="fullname"
								autoComplete="Full name"
								{...register('fullname')}
								error={!!errors.fullname}
								defaultValue={profile.fullname}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.fullname?.message}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								id="location"
								label="Location"
								autoComplete="Location"
								autoFocus
								{...register('location')}
								error={!!errors.location}
								defaultValue={profile.location}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.location?.message}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								id="job"
								label="Job"
								autoComplete="Job"
								autoFocus
								{...register('job')}
								error={!!errors.job}
								defaultValue={profile.job}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.job?.message}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								id="birth"
								label="Birth"
								autoComplete="Birth"
								autoFocus
								{...register('birth')}
								error={!!errors.birth}
								defaultValue={profile.birth}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.birth?.message}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								id="about"
								label="Info about yourself"
								autoComplete="Info about yourself"
								autoFocus
								{...register('about')}
								error={!!errors.about}
								defaultValue={profile.about}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.about?.message}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								id="interests"
								label="Interests"
								autoComplete="Interests"
								autoFocus
								{...register('interests')}
								error={!!errors.interests}
								defaultValue={profile.interests}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.interests?.message}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							{error && <Typography variant="h5" color="error">{error}</Typography>}
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
							>
								Update
							</Button>
						</Grid>
					</Grid>
				</Box>
			}

		</Grid>
	);
};
