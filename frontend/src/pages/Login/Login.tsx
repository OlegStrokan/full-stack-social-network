import React from 'react';
import { Card } from '@mui/material';
// @ts-ignore
import styles from './Login.module.css'
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Navigate } from 'react-router-dom';

export const Login:React.FC = () => {
  const [register, setRegister] = React.useState<boolean>(true);

  /*if () {
    return <Navigate to='/profile' />;
  }*/

  const onModelChange = () => {
    setRegister(!register);
  };

  return (
    <Card className={styles.root}>
      {!register ? <SignUp onModelChange={onModelChange} /> : <SignIn onModelChange={onModelChange} />}
    </Card>
  );
}
