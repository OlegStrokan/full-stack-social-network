import React from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Navigate, useLocation } from "react-router-dom";

interface IHeader {
	isAuth: boolean;
	userId: number | null;
}

export const Header: React.FC<IHeader> = ({ isAuth, userId }) => {

	const { pathname } = useLocation();


	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<Menu />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{pathname.slice(1)}
					</Typography>
					{isAuth
						? <Typography>{userId}</Typography>
						: <Button color="inherit" onClick={() => <Navigate to="/login" />}>Login</Button>
					}
				</Toolbar>
			</AppBar>
		</Box>
	);
};
