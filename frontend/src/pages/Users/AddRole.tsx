import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validators/addRole";

interface AddRoleInterface {
	onSubmitRole: (value: any) => void;
	userId: number | null;
}


export const AddRole: React.FC<AddRoleInterface> = ({ onSubmitRole, userId }) => {


	const {
		register, control, handleSubmit, formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});


	return (
		<Grid>
			<Box component="form" onSubmit={handleSubmit(onSubmitRole)} noValidate sx={{ mt: 3 }}>
				<Grid container spacing={2} width={400}>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
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
	);
};
