import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedRoles } from "../../redux/ducks/role/role.slice";
import { RootState } from "../../redux/store";

export const Roles = () => {

	const { roles } = useSelector((state: RootState) => state.roleReducer)
	const dispatch = useDispatch()

	React.useEffect(() => {
			dispatch(fetchedRoles())
	},[])

	return (
		<div>
			{roles?.map((role) => <div>role.value</div>)}
			Roles page
		</div>
	);
};

