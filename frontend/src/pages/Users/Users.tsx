import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedBanUser, fetchedUnbanUser, fetchedUsers } from "../../redux/ducks/user/user.slice";
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

interface UsersInterface {
	isAuth: boolean;
	userId: number | null;
}


export const Users: React.FC<UsersInterface> = ({ isAuth, userId }) => {
debugger
	const [banReason, setBanReason] = React.useState<string>('');

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

	const onSubmit = (event: any) => {
		dispatch(fetchedBanUser({ userId: event.userId, banReason: event.banReason }))
	};

	return (
		<Grid>
			{users?.filter((user) => user.id !== userId).map((user) => {
				return <Grid className={styles.user}>
					<Typography variant="h6">{user.fullname}</Typography>
					{!user.banned ?
						<Box key={user.id} component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2} width={400}>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="banReason"
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
				</Grid>;
			})}
		</Grid>
	);
};
