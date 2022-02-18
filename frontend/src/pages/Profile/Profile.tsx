import React from "react";
import { ProfilePosts } from "./ProfilePosts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedProfile } from "../../redux/ducks/profile/profile.slice";
import { useNavigate, useParams } from "react-router-dom";

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
	}, [url.id]);


	return (
		<div>
			{profile?.email}
			{isOwner && <div>updateProfile</div>}
			Profile page
			<ProfilePosts />
		</div>
	);
};
