import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
// @ts-ignore
import styles from './Login.module.css';
import { validationSchema } from "../../utils/validators/forgotPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedSendEmail, fetchedSetPassword } from "../../redux/ducks/auth/auth.slice";

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

	const { forgotPassword } = useSelector((state: RootState) => state.authReducer);
	const dispatch = useDispatch();

	const onSubmit = (event: any) => {
		if (event.email && !event.password) {
			dispatch(fetchedSendEmail(event));
		} else if (event.email && event.password) {
			dispatch(fetchedSetPassword(event));
		}
	};

	return (
		<Grid>
			<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
				<Grid container spacing={2} className={styles.inputs}>
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
					{forgotPassword.isSendedMail && (
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
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							{!forgotPassword.isSendedMail && !forgotPassword.isSetPassword && 'Send email'}
							{forgotPassword.isSendedMail && !forgotPassword.isSetPassword && 'Set password'}
						</Button>
					</Grid>
					<Grid item xs={12} textAlign="center">
						<Typography  onClick={() => setForgotPassword(!password)}>Back</Typography>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};
