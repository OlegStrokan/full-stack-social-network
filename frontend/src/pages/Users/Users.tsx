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
import { validationSchema } from "../../utils/validators/addRole";
import { IRoleDto } from "../../types/role/role.dto";

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
		dispatch(fetchedBanUser({ userId: event.userId, banReason: event.banReason }))
	};

	const onSubmitRole = (event: any) => {
		dispatch(fetchedAddRole({ userId: event.userId, value: event.role }))
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
										{...register('banReason')}
										error={!!errors.banReason}
										sx={{ mb: -5 }}
									/>
								</Grid>
								<Grid>
									<TextField
										style={{ visibility: 'hidden'}}
										required
										fullWidth
										id={String(i)}
										value={userId}
										{...register('userId')}
									/>
									<Typography variant="subtitle2" color="error">
										{errors.banReason?.message}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Button variant="contained" type="submit">
										Ban
									</Button>
								</Grid>
							</Grid>
						</Box>
						:
						<Button variant="contained" onClick={() => fetchedUnbanUser(user.id)}>Unban</Button>
					}
					{roles?.map((role) => role.value === 'ADMIN' ) &&
						 <Grid>
                           <Box key={user.id} component="form" onSubmit={handleSubmit(onSubmitRole)} noValidate sx={{ mt: 3 }}>
                             <Grid container spacing={2} width={400}>
                               <Grid item xs={12}>
                                 <TextField
                                   required
                                   fullWidth
                                   id={String(i)}
                                   label="role"
                                   autoComplete="Role"
								   {...register('role')}
                                   error={!!errors.role}
                                   sx={{ mb: -5 }}
                                 />
                               </Grid>
                               <Grid>
                                 <TextField
                                   style={{ visibility: 'hidden'}}
                                   required
                                   fullWidth
                                   id={String(i)}
                                   value={userId}
								   {...register('userId')}
                                 />
                                 <Typography variant="subtitle2" color="error">
									 {errors.role?.message}
                                 </Typography>
                               </Grid>
                               <Grid item xs={12}>
                                 <Button variant="contained" type="submit">
                                   Add Role
                                 </Button>
                               </Grid>
                             </Grid>
                           </Box>
						</Grid>
					}
				</Grid>;
			})}
		</Grid>
	);
};

