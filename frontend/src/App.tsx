import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Posts } from "./pages/Posts/Posts";
import { Users } from "./pages/Users/Users";
import { Roles } from "./pages/Roles/Roles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchedInitialize } from "./redux/ducks/initialize/initialize.slice";
import { Typography } from "@mui/material";

export const App = () => {
    const dispatch = useDispatch();
    const { isAuth, userId } = useSelector((state: RootState) => state.authReducer)
    const { initialized } = useSelector((state: RootState) => state.initializeReducer)

    React.useEffect(() => {
        dispatch(fetchedInitialize())
    },[isAuth])

    if  (!initialized) {
     return <div>...Loading</div>
    }

    return (
        <div>
            <ul>
                <li>
                    <Link to="/login"><Typography variant="h5">login</Typography></Link>
                </li>
                <li>
                    <Link to="/posts"><Typography variant="h5">posts</Typography></Link>
                </li>
                <li>
                    <Link to={`profile/${userId}`}><Typography variant="h5">profile</Typography></Link>
                </li>
                <li>
                    <Link to="/users"><Typography variant="h5">users</Typography></Link>
                </li>
                <li>
                    <Link to="/roles"><Typography variant="h5">roles</Typography></Link>
                </li>
            </ul>

            <Routes>
                <Route path="/login" element={<Login userId={userId} isAuth={isAuth} />} />
                <Route path="/" element={<Navigate to={`/profile/${userId}`} />} />
                <Route path="/profile/:id" element={<Profile isAuth={isAuth} />} />
                <Route path="/posts" element={<Posts isAuth={isAuth}/>} />
                <Route path="/users" element={<Users />} />
                <Route path="/roles" element={<Roles />} />
            </Routes>
        </div>
    );
};

