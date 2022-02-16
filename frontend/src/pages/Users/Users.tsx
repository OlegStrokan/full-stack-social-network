import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedUsers } from "../../redux/ducks/user/user.slice";
import { RootState } from "../../redux/store";

export const Users = () => {

	const { users, loading } = useSelector((state: RootState) => state.userReducer)
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(fetchedUsers())
	},[]);

	if (loading) {
		return <div>...loading</div>
	}
	return (
		<div>
			{users?.map((user) => <div>{user.fullname}</div>)}
			Users page
		</div>
	);
};
