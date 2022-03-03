import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Posts } from "./pages/Posts/Posts";
import { Users } from "./pages/Users/Users";
import { Roles } from "./pages/Roles/Roles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchedInitialize } from "./redux/ducks/initialize/initialize.slice";
import { Card } from "@mui/material";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
// @ts-ignore
import styles from "./App.module.css";

export const App = () => {
	const dispatch = useDispatch();
	const { isAuth, username, userId } = useSelector((state: RootState) => state.authReducer);
	const { initialized } = useSelector((state: RootState) => state.initializeReducer);
	const [navbar, setNavbar] = React.useState<boolean>(false);

	React.useEffect(() => {
		dispatch(fetchedInitialize());
	}, [isAuth]);

	if (!initialized) {
		return <div>...Loading</div>;
	}

	return (
		<Card className={navbar ? styles.rootOpen : styles.rootClose}>
			<div className={styles.header}><Header isAuth={isAuth} username={username} navbar={navbar}
												   setNavbar={setNavbar} /></div>
			{navbar && <div className={styles.navbar}><Navbar isAuth={isAuth} userId={userId} /></div>}
			<div className={styles.content}>
				<Routes>
					<Route path="/login" element={<Login userId={userId} isAuth={isAuth} />} />
					<Route path="/" element={<Navigate to={`/profile/${userId}`} />} />
					<Route path="/profile/:id" element={<Profile userId={userId} isAuth={isAuth} />} />
					<Route path="/posts" element={<Posts isAuth={isAuth} isOwner={false} />} />
					<Route path="/users" element={<Users isAuth={isAuth} />} />
					<Route path="/roles" element={<Roles isAuth={isAuth} />} />
				</Routes>
			</div>
		</Card>
	);
};

