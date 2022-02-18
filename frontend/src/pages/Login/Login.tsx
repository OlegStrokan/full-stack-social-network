import React from 'react';
import { Card } from '@mui/material';
// @ts-ignore
import styles from './Login.module.css'
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { useNavigate } from "react-router-dom";

interface LoginInterface {
  isAuth: boolean,
  userId: number | null;
}

export const Login:React.FC<LoginInterface> = ({ isAuth, userId }) => {
  const [register, setRegister] = React.useState<boolean>(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) {
      return navigate(`/profile/${userId}`);
    }
  },[isAuth])

  const onModelChange = () => {
    setRegister(!register);
  };

  return (
    <Card className={styles.root}>
      {!register ? <SignUp onModelChange={onModelChange} /> : <SignIn onModelChange={onModelChange} />}
    </Card>
  );
}
