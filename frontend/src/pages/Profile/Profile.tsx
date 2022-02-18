import React from "react";
import { ProfilePosts } from "./ProfilePosts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedProfile } from "../../redux/ducks/profile/profile.slice";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Grid } from "@mui/material";
// @ts-ignore
import style from './Profile.module.css';

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


	return (
		<Card>
			<Grid justifyContent="center">
			<img src={profile?.avatar} className={style.profileAvatar}/>
			</Grid>
			{isOwner && <div>updateProfile</div>}
			Profile page
			<ProfilePosts />
		</Card>
	);
};
