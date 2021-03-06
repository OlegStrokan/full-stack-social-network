import React from "react";
import { ProfilePosts } from "./ProfilePosts/ProfilePosts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedProfile } from "../../redux/ducks/profile/profile.slice";
import {  useNavigate, useParams, useSearchParams } from "react-router-dom";

// @ts-ignore
import styles from "./Profile.module.css";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileHeader } from "./ProfileHeader/ProfileHeader";
import { ProfileEntities } from "./ProfileEntities";
import { ProfileGallery } from "./ProfileGallery/ProfileGallery";
import { Grid } from '@mui/material';

interface ProfileInterface {
	isAuth: boolean;
	userId: number | null;
}

export const Profile: React.FC<ProfileInterface> = ({ isAuth, userId }) => {
	let navigate = useNavigate();
	const { profile, error, loading } = useSelector((state: RootState) => state.profileReducer);
	let url = useParams<string>();
	const [searchParams, setSearchParams] = useSearchParams();
	const params = searchParams.get('gallery')
	const dispatch = useDispatch();
	const isOwner = +url.id! === userId
	const [gallery, setGallery] = React.useState(false);

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		if (params) {
			setGallery(true);
		}
		dispatch(fetchedProfile(+url.id!));
	}, [url, isAuth]);

	if (!profile) {
		return <div>...loading</div>
	}


	return (
		<Grid className={styles.root}>
			{gallery && <ProfileGallery gallery={gallery} setGallery={setGallery} userId={profile.id} images={profile.photos}/>}
			<Grid className={styles.profileHeader}>
				<ProfileHeader isOwner={isOwner} profile={profile} userId={userId!}/>
			</Grid>
			<Grid className={styles.profileInfo}>
				<ProfileInfo isOwner={isOwner} profile={profile} error={error} />
			</Grid>
			<Grid className={styles.profilePosts}>
				<ProfilePosts isOwner={isOwner} userId={userId} posts={profile?.posts} />
			</Grid>
			<Grid className={styles.profileEntities}>
				<ProfileEntities profile={profile} />
			</Grid>

		</Grid>
	);
};
