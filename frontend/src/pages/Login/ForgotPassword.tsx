import React from "react";
import { Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from './Login.module.css';

interface IForgotPassword {
	forgotPassword: boolean;
	setForgotPassword: (state: boolean) => void;
}
export const ForgotPassword: React.FC<IForgotPassword> = ({ forgotPassword, setForgotPassword }) => {
	return (
		<Grid>
			<Grid item xs={12} className={styles.link}  textAlign="center">
				<Typography  onClick={() => setForgotPassword(!forgotPassword)}>
					Back
				</Typography>
			</Grid>
		</Grid>
	);
};
