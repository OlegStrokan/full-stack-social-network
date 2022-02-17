import React from "react";
import { ProfilePosts } from "./ProfilePosts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchedProfile } from "../../redux/ducks/profile/profile.slice";
import { useNavigate, useParams } from "react-router-dom";

interface ProfileInterface {
	isAuth: boolean;
}

export const Profile: React.FC<ProfileInterface> = ({ isAuth }) => {


	let navigate = useNavigate();
	const { profile } = useSelector((state: RootState) => state.profileReducer);
	let url = useParams<string>();
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		dispatch(fetchedProfile(+url.id!));
	}, [url.id]);


	return (
		<div>
			{profile?.email}
			Profile page
			<ProfilePosts />
		</div>
	);
};
