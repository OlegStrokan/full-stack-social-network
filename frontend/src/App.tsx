import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Posts } from './pages/Posts/Posts';

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
      </ul>

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path='/' element={<Navigate to={'/profile'}/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="/posts" element={<Posts/>} />
      </Routes>
    </div>
  );
}

