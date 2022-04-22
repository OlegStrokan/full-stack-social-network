import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Users } from "./pages/Users/Users";
import { Roles } from "./pages/Roles/Roles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchedInitialize } from "./redux/ducks/initialize/initialize.slice";
import { Card, Grid } from '@mui/material';
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
// @ts-ignore
import styles from "./App.module.css";
import { MessagesPage } from "./pages/Messages/MessagesPage";

export const App = () => {
	const dispatch = useDispatch();
	const { isAuth, username, userId, roles } = useSelector((state: RootState) => state.authReducer);
	const { initialized } = useSelector((state: RootState) => state.initializeReducer);
	const [navbar, setNavbar] = React.useState<boolean>(false);

	React.useEffect(() => {
		dispatch(fetchedInitialize());
	}, [isAuth]);

	if (!initialized) {
		return <div>...Loading</div>;
	}

	return (
		<Grid className={navbar ? styles.rootOpen : styles.rootClose}>
			<div className={styles.header}><Header isAuth={isAuth} username={username} navbar={navbar}
												   setNavbar={setNavbar} /></div>
			{navbar && <div className={styles.navbar}><Navbar roles={roles}  isAuth={isAuth} userId={userId} /></div>}
			<div className={styles.content}>
				<Routes>
					<Route path="/login" element={<Login userId={userId} isAuth={isAuth} />} />
					<Route path="/" element={<Navigate to={`/profile/${userId}`} />} />
					<Route path="/profile/:id" element={<Profile userId={userId} isAuth={isAuth} />} />
					<Route path="/users" element={<Users isAuth={isAuth} userId={userId} roles={roles} />} />
					<Route path="/roles" element={<Roles isAuth={isAuth} />} />
					<Route path="/messages" element={<MessagesPage userId={userId} isAuth={isAuth} />} >
						<Route path=":id" element={<MessagesPage userId={userId} isAuth={isAuth} />}/>
					</Route>
				</Routes>
			</div>
		</Grid>
	);
};

