import React from "react";
import { Button, Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "./Profile.module.css";
import { ProfileDto } from "../../types/profile/profile.dto";
import { useDispatch } from "react-redux";
import { fetchedStatus } from "../../redux/ducks/profile/profile.slice";


interface ProfileInfo {
	profile: ProfileDto | null;
}

export const ProfileHeader: React.FC<ProfileInfo> = ({ profile }) => {

	const dispatch = useDispatch();

	const onStatusChange = () => dispatch(fetchedStatus( { id: profile?.id, status: 'The capitalist himself will sell the rope on which he will be hanged'}))

	return (
		<Grid>
			{!profile?.activated &&
            <Grid className={styles.activateProfile}><Typography variant="h6">Please activate your
              account</Typography></Grid>}
			<img src={profile?.avatar} className={styles.profileBackground} />
			<Grid className={styles.profileMainInfo}>
				<img src={profile?.avatar} className={styles.profileAvatar} />
				<Grid>
					<Typography variant="h5">{profile?.fullname}</Typography>
					<Grid className={styles.flex}>
						<Grid className={styles.status}>
							<Typography variant="subtitle2">{profile?.status}</Typography>
						</Grid>
						<Button className={styles.button} variant="contained" onClick={onStatusChange}>Change status</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
