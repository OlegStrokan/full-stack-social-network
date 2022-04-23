import React from 'react';
// @ts-ignore
import styles from './ForgotModalWindow.module.css';
import { Button, Grid, Typography } from '@mui/material';

interface IModalWindow {
	forgotPassword: {
		isSendedMail: boolean,
		isVerifiedCode: boolean,
		isSetPassword: boolean,
	}

}
export const ForgotModalWindow:React.FC<IModalWindow> = ({ forgotPassword }) => {
	return (
		<Grid className={styles.forgotRoot}>
			<Grid
				className={(!forgotPassword.isSendedMail || !forgotPassword.isVerifiedCode || !forgotPassword.isSetPassword) ? styles.modal : `${styles.modal} ${styles.modal_active}`}>
				<Grid
					className={(!forgotPassword.isSendedMail || !forgotPassword.isVerifiedCode || !forgotPassword.isSetPassword) ? styles.alert : `${styles.alert} ${styles.alert_active}`}>
					<Typography variant="h5">Success!</Typography>
					<Grid>
						<Typography variant="h6" sx={{ mt: 1, mb: 4 }}>Your password has been updated.</Typography>
						<Grid>
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
	);
};
