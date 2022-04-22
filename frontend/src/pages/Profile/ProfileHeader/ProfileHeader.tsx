import React, { ChangeEvent } from 'react';
import { Button, Grid, Typography } from '@mui/material';
// @ts-ignore
import styles from './ProfileHeader.module.css';
import { ProfileDto } from '../../../types/profile/profile.dto';
import { ProfileStatus } from './ProfileStatus';
import { useDispatch } from 'react-redux';
import { fetchedAvatar } from '../../../redux/ducks/profile/profile.slice';


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
			<Grid className={styles.root}>
				{!profile?.activated &&
                <Grid className={styles.activateProfile}><Typography variant="h6">Please activate your account!</Typography></Grid>}
				<img src={'http://localhost:8000/' + profile.avatar} className={styles.profileBackground}/>
				<Grid className={styles.profileMainInfo}>
					<div className={styles.profileAvatar}>
							<img src={'http://localhost:8000/' + profile.avatar} className={styles.profileAvatarImg}/>
						{isOwner &&
                        <Button variant="contained" component="label" color="primary" sx={{ mt: 2 }}>Change avatar
                            <input type="file" hidden onChange={onAvatarChange}/>
                        </Button>}
					</div>
					<Grid>
						<Typography variant="h5">{profile.fullname}</Typography>
						<ProfileStatus isOwner={isOwner} status={profile.status} id={profile.id}/>
					</Grid>
				</Grid>
			</Grid>
		);
	}
;
