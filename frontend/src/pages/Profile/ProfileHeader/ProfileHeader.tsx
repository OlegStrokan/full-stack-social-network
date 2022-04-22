import React, { ChangeEvent } from "react";
import { Button, Grid, Typography } from "@mui/material";
// @ts-ignore
import styles from "../Profile.module.css";
import { ProfileDto } from "../../../types/profile/profile.dto";
import { ProfileStatus } from "./ProfileStatus";
import { useDispatch } from "react-redux";
import { fetchedAvatar } from "../../../redux/ducks/profile/profile.slice";


interface ProfileInfo {
	profile: ProfileDto;
	isOwner: boolean;
}

export const ProfileHeader: React.FC<ProfileInfo> = ({ profile, isOwner }) => {

	const dispatch = useDispatch();

	const onAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length) {
			dispatch(fetchedAvatar({ id: profile.id, avatar: event.target.files[0] }));
		}
	};

return (
	<Grid>
		{!profile?.activated &&
        <Grid className={styles.activateProfile}><Typography variant="h6">Please activate your
          account</Typography></Grid>}
		<img src={profile.avatar} className={styles.profileBackground} />
		<Grid className={styles.profileMainInfo}>
			<img src={"http://localhost:8000/" + profile.avatar} className={styles.profileAvatar} />
			{isOwner && <Button variant="contained" component="label" color="primary" sx={{ ml: -5, mr: 2 }}>Change avatar
				<input type="file" hidden onChange={onAvatarChange} />
			</Button>}
			<Grid>
				<Typography variant="h5" >{profile.fullname}</Typography>
				<ProfileStatus isOwner={isOwner} status={profile.status} id={profile.id} />
			</Grid>
		</Grid>
	</Grid>
);
}
;
