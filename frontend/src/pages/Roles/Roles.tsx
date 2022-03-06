import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedRoles } from "../../redux/ducks/role/role.slice";
import { RootState } from "../../redux/store";
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddRole } from "./AddRole";


interface RolesInterface {
	isAuth: boolean;
}


export const Roles: React.FC<RolesInterface> = ({ isAuth}) => {
	let navigate = useNavigate();
	const { roles, loading } = useSelector((state: RootState) => state.roleReducer)
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
			dispatch(fetchedRoles())
	},[])

	if (loading) return <div>....loading</div>

	return (
		<Card>
			<AddRole/>
			{roles?.map((role	) => <Typography variant="h6">{role.value}</Typography>)}
			Roles page
		</Card>
	);
};

