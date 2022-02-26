import React from "react";
import { ProfilePosts } from "./ProfilePosts/ProfilePosts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedProfile } from "../../redux/ducks/profile/profile.slice";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";
// @ts-ignore
import styles from "./Profile.module.css";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileHeader } from "./ProfileHeader/ProfileHeader";
import { ProfileEntities } from "./ProfileEntities";

interface ProfileInterface {
	isAuth: boolean;
	userId: number | null;
}

export const Profile: React.FC<ProfileInterface> = ({ isAuth, userId }) => {
	let navigate = useNavigate();
	const { profile } = useSelector((state: RootState) => state.profileReducer);
	let url = useParams<string>();
	const dispatch = useDispatch();
	const isOwner = +url.id! === userId;

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		dispatch(fetchedProfile(+url.id!));
	}, [url.id, isAuth]);

	if (!profile) {
		return <div>...loading</div>
	}


	return (
		<Card className={styles.root}>
			<Grid className={styles.profileHeader}>
				<ProfileHeader profile={profile}/>
			</Grid>
			<Grid className={styles.profileInfo}>
				<ProfileInfo profile={profile} />
			</Grid>
			<Grid className={styles.profilePosts}>
				<ProfilePosts userId={url.id} posts={profile?.posts} />
			</Grid>
			<Grid className={styles.profileEntities}>
				<ProfileEntities profile={profile} />
			</Grid>
			{isOwner && <div>updateProfile</div>}

		</Card>
	);
};
