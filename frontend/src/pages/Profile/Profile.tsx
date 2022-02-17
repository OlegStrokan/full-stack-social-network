import React from "react";
import { ProfilePosts } from "./ProfilePosts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedProfile } from "../../redux/ducks/profile/profile.slice";
import { useNavigate, useParams } from "react-router-dom";

interface ProfileInterface {
	isAuth: boolean;
	userId: number | null
}

export const Profile: React.FC<ProfileInterface> = ({ isAuth, userId }) => {


	let navigate = useNavigate();
	const { profile } = useSelector((state: RootState) => state.profileReducer);
	let id = useParams<string>();
	const dispatch = useDispatch();

	React.useEffect(() => {
		debugger
		if (!isAuth) {
			return navigate("/login");
		}
		dispatch(fetchedProfile(userId!));
	}, [id]);


	return (
		<div>
			{profile?.email}
			Profile page
			<ProfilePosts />
		</div>
	);
};
