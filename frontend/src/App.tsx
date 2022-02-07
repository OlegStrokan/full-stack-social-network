import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

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
        <Route path="/login" element={<div/>} />
        <Route path='/' element={<Navigate to={'/profile'}/>} />
        <Route path="/profile/:id" element={<div/>} />
        <Route path="/posts" element={<div/>} />
      </Routes>
    </div>
  );
}

