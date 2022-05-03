import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedAddRole, fetchedBanUser, fetchedUnbanUser, fetchedUsers } from "../../redux/ducks/user/user.slice";
import { RootState } from "../../redux/store";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import styles from "./Users.module.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validators/banUser";
import { IRoleDto } from "../../types/role/role.dto";
import { AddRole } from "./AddRole";

interface UsersInterface {
	isAuth: boolean;
	userId: number | null;
	roles: IRoleDto[] | null;
}


export const Users: React.FC<UsersInterface> = ({ isAuth, userId, roles }) => {

	let navigate = useNavigate();
	const { users, loading } = useSelector((state: RootState) => state.userReducer);
	const dispatch = useDispatch();
	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		dispatch(fetchedUsers());
	}, []);

	const {
		register, control, handleSubmit, formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	if (loading) return <div>...loading</div>;

	const onSubmitBan = (event: any) => {
		debugger;
		dispatch(fetchedBanUser({ userId: event.banReason[0].userId, banReason: event.banReason[0].banReason }))
	};

	const onSubmitRole = (event: any) => {
		dispatch(fetchedAddRole({ userId: userId as number, value: event.role }))
	};

	return (
		<Grid>
			{users?.filter((user) => user.id !== userId).map((user, i) => {
				return <Grid className={styles.user}>
					<Typography variant="h6">{user.fullname}</Typography>
					{!user.banned ?
						<Box key={user.id} component="form" onSubmit={handleSubmit(onSubmitBan)} noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2} width={400}>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id={String(i)}
										label="Ban Reason"
										autoComplete="Ban Reason"
										{...register(`banReason[${i}].banReason`)}
										sx={{ mb: -5 }}
									/>
									<Typography variant="h5">{errors.banReason}</Typography>
								</Grid>
								<Grid>
									<TextField
										style={{ visibility: 'hidden'}}
										required
										fullWidth
										id={String(i)}
										value={user.id}
										{...register(`banReason[${i}].userId`)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button variant="contained" type="submit">
										Ban
									</Button>
								</Grid>
							</Grid>
						</Box>
						:
						<Button variant="contained" onClick={() => dispatch(fetchedUnbanUser(user.id))}>Unban</Button>
					}
					{roles?.map((role) => role.value === 'admin' ) &&
						 <AddRole onSubmitRole={onSubmitRole} userId={userId}/>

					}
				</Grid>;
			})}
		</Grid>
	);
};

