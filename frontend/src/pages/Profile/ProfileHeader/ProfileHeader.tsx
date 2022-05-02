import React, { ChangeEvent } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
// @ts-ignore
import styles from './ProfileHeader.module.css';
import { ProfileDto } from '../../../types/profile/profile.dto';
import { ProfileStatus } from './ProfileStatus';
import { useDispatch } from 'react-redux';
import { fetchedAvatar, fetchedFollow, fetchedUnfollow } from '../../../redux/ducks/profile/profile.slice';
import ClearIcon from '@mui/icons-material/Clear';

interface ProfileInfo {
	profile: ProfileDto;
	isOwner: boolean;
	userId: number;
}

export const ProfileHeader: React.FC<ProfileInfo> = ({ profile, isOwner, userId  }) => {

		const dispatch = useDispatch();

		const onAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
			if (event.target.files && event.target.files.length) {
				dispatch(fetchedAvatar({ id: profile.id, avatar: event.target.files[0] }));
			}
		};

		const [activateProfile, setActivateProfile] = React.useState<boolean>(false);

		const isFollowed = profile.follows?.find((follow) => follow.followId === profile.id) ?? false;

		return (
			<Grid className={styles.root}>
				{!profile?.activated && !activateProfile &&
                <Grid className={styles.activateProfile}>
					<Grid style={{ display: 'flex', alignItems: 'center' }}>
					<Typography variant="h6" sx={{ mr: 1 }}>Please activate your account!</Typography>
					<ClearIcon style={{ cursor: 'pointer' }} onClick={() => setActivateProfile(!activateProfile)}/>
                    </Grid>
				</Grid>}
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
						<Typography variant="h4">{profile.fullname}</Typography>
						<ProfileStatus isOwner={isOwner} status={profile.status} id={profile.id}/>
						{!isOwner && <Button variant="contained" color="primary" onClick={() => {
							if(isFollowed) {
								dispatch(fetchedUnfollow({ userId, followId: profile.id }));
							} else {
								dispatch(fetchedFollow({ userId, followId: profile.id }))
							}}}>{isFollowed ? "Unfollow" : "Follow"}</Button>}
					</Grid>
				</Grid>
			</Grid>
		);
	};
