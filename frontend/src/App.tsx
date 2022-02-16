import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Posts } from "./pages/Posts/Posts";
import { Users } from "./pages/Users/Users";

export const App = () => {

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
                    <Link to="/profile">profile</Link>
                </li>
                <li>
                    <Link to="/users">users</Link>
                </li>
            </ul>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to={"/profile"} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </div>
    );
};

