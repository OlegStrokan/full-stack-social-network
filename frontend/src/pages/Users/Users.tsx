import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedUsers } from "../../redux/ducks/user/user.slice";
import { RootState } from "../../redux/store";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";


interface UsersInterface {
	isAuth: boolean;
}


export const Users: React.FC<UsersInterface> = ({ isAuth}) => {
	let navigate = useNavigate();
	const { users, loading } = useSelector((state: RootState) => state.userReducer)
	const dispatch = useDispatch();
	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		dispatch(fetchedUsers())
	},[]);

	if (loading) {
		return <div>...loading</div>
	}
	return (
		<Card>
			{users?.map((user) => <div>{user.fullname}</div>)}
			Users page
		</Card>
	);
};
