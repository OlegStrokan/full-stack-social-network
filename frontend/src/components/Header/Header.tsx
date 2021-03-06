import React from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Navigate, useLocation } from "react-router-dom";
import { fetchedLogout } from "../../redux/ducks/auth/auth.slice";
import { useDispatch } from "react-redux";

interface IHeader {
	isAuth: boolean;
	username: string | null;
	navbar: boolean;
	setNavbar: (value: boolean) => void;
}

export const Header: React.FC<IHeader> = ({ isAuth, username, navbar, setNavbar }) => {

	const { pathname } = useLocation();

	const dispatch = useDispatch();

	const containLogin = pathname.includes('login');
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="primary">
				<Toolbar>
					{!containLogin &&
						<IconButton
							onClick={() => setNavbar(!navbar)}
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<Menu/>
						</IconButton>
					}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{pathname.slice(1)}
					</Typography>
					{!isAuth && !containLogin
						&& <Button color="inherit" onClick={() => <Navigate to="/login" />}>Login</Button>
					}
					{isAuth && <>
						<Typography sx={{ mr: 2 }}>{username}</Typography>
						<Button color="inherit" variant="outlined" onClick={() => dispatch(fetchedLogout())}>Logout</Button>
					</>}
				</Toolbar>
			</AppBar>
		</Box>
	);
};
