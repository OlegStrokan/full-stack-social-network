import React from 'react';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
// @ts-ignore
import styles from './Login.module.css';
import { validationSchema } from '../../utils/validators/forgotPassword';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchedSendEmail, fetchedSetPassword, fetchedVerifyCode } from '../../redux/ducks/auth/auth.slice';
import { ForgotModalWindow } from '../../components/ForgotModalWindow/ForgotModalWindow';

interface IForgotPassword {
	password: boolean;
	setForgotPassword: (state: boolean) => void;
}

export const ForgotPassword: React.FC<IForgotPassword> = ({ password, setForgotPassword }) => {
	const {
		register, handleSubmit, formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const { forgotPassword, loading, error } = useSelector((state: RootState) => state.authReducer);
	const dispatch = useDispatch();

	const onSubmit = (event: any) => {
		if (event.email && !event.code && !event.password) {
			dispatch(fetchedSendEmail(event.email));
		} else if (event.email && event.code && !event.password) {
			dispatch(fetchedVerifyCode({ email: event.email, code: event.code }));
		} else if (event.email && event.code && event.password) {
			dispatch(fetchedSetPassword({ email: event.email, code: event.code, password: event.password }));
		}
	};

	return (
		<Grid>
			<ForgotModalWindow forgotPassword={forgotPassword}/>
			<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
				<Grid container spacing={2} className={styles.inputs}>
					<Grid item xs={12} style={{ textAlign: 'center' }} sx={{ mt: 3, mb: -2 }}>
						{forgotPassword.isSendedMail
							?
							<Grid><Typography variant="h6">Digit code was sent to your
								email!</Typography></Grid>
							: <Typography variant="subtitle2">
								We will send activation code on your email
							</Typography>}
					</Grid>
					<Grid item xs={12}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="E-mail"
							autoComplete="E-mail"
							autoFocus
							{...register('email')}
							error={!!errors.email}
						/>
						<Typography variant="subtitle2" color="error">
							{errors.email?.message}
						</Typography>
					</Grid>
					{forgotPassword.isSendedMail
					&& (
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="code"
								label="Code"
								autoComplete="Code"
								autoFocus
								{...register('code')}
								error={!!errors.code}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.code?.message}
							</Typography>
						</Grid>
					)}
					{forgotPassword.isVerifiedCode && (
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="password"
								label="Password"
								autoComplete="Password"
								autoFocus
								{...register('password')}
								error={!!errors.password}
							/>
							<Typography variant="subtitle2" color="error">
								{errors.password?.message}
							</Typography>
						</Grid>
					)}
					<Grid item xs={12}>
						{error && <Typography variant="h6" color="error">{error}</Typography>}
					</Grid>
					<Grid item xs={12} className={styles.logInButton}>
						<Button
							variant="contained"
							type="submit"
							disabled={loading}
							fullWidth
							sx={{ mt: 1, mb: 2, p: 2 }}
						>
							{!loading && !forgotPassword.isSendedMail && !forgotPassword.isVerifiedCode && !forgotPassword.isSetPassword && 'Send Email'}
							{!loading && forgotPassword.isSendedMail && !forgotPassword.isVerifiedCode && !forgotPassword.isSetPassword && 'Set code'}
							{!loading && forgotPassword.isSendedMail && forgotPassword.isVerifiedCode && !forgotPassword.isSetPassword && 'Set password'}
							{forgotPassword.isSendedMail && forgotPassword.isVerifiedCode && !forgotPassword.isSetPassword && 'Log in'}
							{loading && 'Loading...'}
						</Button>
					</Grid>
					<Grid item xs={12} textAlign="center">
						<Button className={styles.link}
									onClick={() => setForgotPassword(!password)}>
							Back
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};
