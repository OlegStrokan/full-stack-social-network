import React from "react";
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
// @ts-ignore
import styles from './Login.module.css';
import { validationSchema } from "../../utils/validators/forgotPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedSendEmail, fetchedSetPassword, fetchedVerifyCode } from "../../redux/ducks/auth/auth.slice";

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

	const { forgotPassword, loading } = useSelector((state: RootState) => state.authReducer);
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
			<Grid className={styles.forgotRoot}>
				<Grid className={(!forgotPassword.isSendedMail || !forgotPassword.isVerifiedCode || !forgotPassword.isSetPassword) ? styles.modal : `${styles.modal} ${styles.modal_active}`}>
					<Grid className={(!forgotPassword.isSendedMail || !forgotPassword.isVerifiedCode || !forgotPassword.isSetPassword) ? styles.alert : `${styles.alert} ${styles.alert_active}`}>
						<Typography variant="h5">Success!</Typography>
						<Grid>
							<Typography variant="h6" sx={{ mt: 1, mb: 4 }}>Your password has been updated.</Typography>
							<Grid className={styles.logInButton}>
								<Button
									onClick={() => {
										// eslint-disable-next-line no-restricted-globals
										location.reload();
									}}
									variant="contained"
								>
									Log in
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
				<Grid container spacing={2} className={styles.inputs}>
					{forgotPassword.isSendedMail && <Grid sx={{ mt: 4 }}><Typography variant="h6">Digit code was sent to your email!</Typography></Grid>}
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
					<Grid item xs={12} className={styles.logInButton}>
						<Button variant="contained" type="submit" disabled={loading} fullWidth>
							{!loading && !forgotPassword.isSendedMail && !forgotPassword.isVerifiedCode && !forgotPassword.isSetPassword && 'Send Code'}
							{!loading && forgotPassword.isSendedMail && !forgotPassword.isVerifiedCode && !forgotPassword.isSetPassword && 'Set code'}
							{!loading && forgotPassword.isSendedMail && forgotPassword.isVerifiedCode && !forgotPassword.isSetPassword && 'Set password'}
							{loading && 'Loading...'}
						</Button>
					</Grid>
					<Grid item xs={12} textAlign="center">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<Link variant="body1" style={{ color: '#707070', cursor: 'pointer' }} onClick={() => setForgotPassword(!forgotPassword)}>
							<Button variant="contained">Log in</Button>
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};
