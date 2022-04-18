import React from "react";
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { ProfileDto } from "../../types/profile/profile.dto";
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../utils/validators/updateProfile';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

interface ProfileInfoInterface {
	profile: ProfileDto;
}

export const ProfileInfo: React.FC<ProfileInfoInterface> = ({ profile }) => {


	const {
		register, handleSubmit, formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});


	const dispatch = useDispatch();

	const [editMode, setEditMode] = React.useState(false);

	const onSubmit = () => {

	}

	return (
		<Grid>
			{!editMode ?
			<>
				<Typography variant="subtitle1">{profile.email}</Typography>
				<Typography variant="subtitle1">About: {profile.about}</Typography>
				<Typography variant="subtitle1">Interests: {profile.interests}</Typography>
				<Typography variant="subtitle1">Date of birth: {profile.birth}</Typography>
				<Typography variant="subtitle1">Job: {profile.job}</Typography>
				<Typography variant="subtitle1">Location: {profile.location}</Typography>
			</>
			: <>

					<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email"
									autoComplete="email"
									autoFocus
									{...register('email')}
									error={!!errors.email}
								/>
								<Typography variant="subtitle2" color="error">
									{errors.username?.message}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									label="Full name"
									id="fullname"
									autoComplete="Full name"
									{...register('fullname')}
									error={!!errors.fullname}
								/>
								<Typography variant="subtitle2" color="error">
									{errors.fullname?.message}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="location"
									label="Location"
									autoComplete="Location"
									autoFocus
									{...register('location')}
									error={!!errors.location}
								/>
								<Typography variant="subtitle2" color="error">
									{errors.location?.message}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="job"
									label="Job"
									autoComplete="Job"
									autoFocus
									{...register('job')}
									error={!!errors.job}
								/>
								<Typography variant="subtitle2" color="error">
									{errors.job?.message}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="birth"
									label="Birth"
									autoComplete="Birth"
									autoFocus
									{...register('birth')}
									error={!!errors.birth}
								/>
								<Typography variant="subtitle2" color="error">
									{errors.birth?.message}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="info"
									label="Info about yourself"
									autoComplete="Info about yourself"
									autoFocus
									{...register('info')}
									error={!!errors.info}
								/>
								<Typography variant="subtitle2" color="error">
									{errors.info?.message}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="interests"
									label="Interests"
									autoComplete="Interests"
									autoFocus
									{...register('interests')}
									error={!!errors.interests}
								/>
								<Typography variant="subtitle2" color="error">
									{errors.interests?.message}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
								>
									Log in
								</Button>
							</Grid>
							<Grid item xs={12} textAlign="center">
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
								<Link variant="body1" style={{ color: '#707070', cursor: 'pointer' }} onClick={() => setEditMode(!editMode)}>
									<Button variant="outlined">Back</Button>
								</Link>
							</Grid>
						</Grid>
					</Box>
				</>
			}

		</Grid>
	);
};
