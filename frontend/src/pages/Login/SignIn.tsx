import React from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @ts-ignore
import styles from './Login.module.css';
import { validationSchema } from '../../utils/validators/signIn';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedLogin } from "../../redux/ducks/auth/auth.slice";
import { LoginDto } from "../../types/auth/login.dto";
import { ForgotPassword } from "./ForgotPassword";
import { RootState } from '../../redux/store';

interface SignInInterface {
  onModelChange: () => void;
}

export const SignIn: React.FC<SignInInterface> = ({ onModelChange }) => {

  const { error, loading } = useSelector((state: RootState) => state.authReducer)
  const dispatch = useDispatch();
  const onSubmit = (event: any) => {
    dispatch(fetchedLogin(event))
  };
  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const [forgotPassword, setForgotPassword] = React.useState<boolean>(false);


  return (
    <Box className={styles.logIn}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        {!forgotPassword ? 'Sign in' : 'Forgot password'}
      </Typography>
      {!forgotPassword ?
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.inputs} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2} className={styles.inputs}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="Email"
              {...register('email')}
              error={!!errors.email}
            />
            <Typography variant="subtitle2" color="error">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              autoComplete="Password"
              {...register('password')}
              error={!!errors.password}
            />
            <Typography variant="subtitle2" color="error">
              {errors.password?.message}
            </Typography>
          </Grid>
         {/* {auth.error && <Grid item xs={12}><Typography variant="h6" color="error">{auth.error}</Typography></Grid>}*/}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 1, mb: 2, p: 2 }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
          {error && <Typography variant="h6" color="error">{error}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.link} variant="subtitle1" onClick={() => setForgotPassword(!forgotPassword)}>
              Forgot password?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.link} variant="subtitle1" onClick={() => onModelChange()}>
              Don't have an account? Sign Up
            </Typography>
          </Grid>
        </Grid>
      </Box>
          : <ForgotPassword password={forgotPassword} setForgotPassword={setForgotPassword} /> }
    </Box>
  );
};
