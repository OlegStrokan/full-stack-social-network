import React from 'react';
import { Card } from '@mui/material';
// @ts-ignore
import styles from './Login.module.css'
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Navigate } from "react-router-dom";

interface LoginInterface {
  isAuth: boolean
}

export const Login:React.FC<LoginInterface> = ({ isAuth }) => {
  const [register, setRegister] = React.useState<boolean>(true);

  if (isAuth) {
    return <Navigate to="/profile" />;
  }
  const onModelChange = () => {
    setRegister(!register);
  };

  return (
    <Card className={styles.root}>
      {!register ? <SignUp onModelChange={onModelChange} /> : <SignIn onModelChange={onModelChange} />}
    </Card>
  );
}
