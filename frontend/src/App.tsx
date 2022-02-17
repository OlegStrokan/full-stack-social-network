import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Posts } from "./pages/Posts/Posts";
import { Users } from "./pages/Users/Users";
import { Roles } from "./pages/Roles/Roles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchedMe } from "./redux/ducks/auth/auth.slice";

export const App = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state: RootState) => state.authReducer)

    React.useEffect(() => {
        dispatch(fetchedMe())
    },[isAuth])

    return (
        <div>
            <ul>
                <li>
                    <Link to="/login">login</Link>
                </li>
                <li>
                    <Link to="/posts">posts</Link>
                </li>
                <li>
                    <Link to="/profile/:id">profile</Link>
                </li>
                <li>
                    <Link to="/users">users</Link>
                </li>
                <li>
                    <Link to="/roles">roles</Link>
                </li>
            </ul>

            <Routes>
                <Route path="/login" element={<Login isAuth={isAuth} />} />
                <Route path="/" element={<Navigate to={"/profile"} />} />
                <Route path="/profile/:id" element={<Profile isAuth={isAuth} />} />
                <Route path="/posts" element={<Posts isAuth={isAuth}/>} />
                <Route path="/users" element={<Users />} />
                <Route path="/roles" element={<Roles />} />
            </Routes>
        </div>
    );
};

