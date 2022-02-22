import React from "react";
import { Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "../Profile.module.css";
import { ProfileDto } from "../../../types/profile/profile.dto";
import { ProfileStatus } from "./ProfileStatus";


interface ProfileInfo {
	profile: ProfileDto | null;
}

export const ProfileHeader: React.FC<ProfileInfo> = ({ profile }) => {

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
					<ProfileStatus status={profile?.status} id={profile?.id}/>
				</Grid>
			</Grid>
		</Grid>
	);
};
