import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedRoles } from "../../redux/ducks/role/role.slice";
import { RootState } from "../../redux/store";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";


interface RolesInterface {
	isAuth: boolean;
}


export const Roles: React.FC<RolesInterface> = ({ isAuth}) => {
	let navigate = useNavigate();
	const { roles } = useSelector((state: RootState) => state.roleReducer)
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
			dispatch(fetchedRoles())
	},[])

	return (
		<Card>
			{roles?.map((role) => <div>role.value</div>)}
			Roles page
		</Card>
	);
};

