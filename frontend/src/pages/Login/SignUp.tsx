import  React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm, Controller } from 'react-hook-form';
// @ts-ignore
import styles from './Login.module.css'
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../utils/validators/signUp';
import { useDispatch } from "react-redux";
import { fetchedRegistration } from "../../redux/ducks/auth/auth.slice";


interface SignUpInterface {
  onModelChange: () => void;
}

export const SignUp:React.FC<SignUpInterface> = ({ onModelChange }) => {

  const dispatch = useDispatch();

  const onSubmit = (event: any) => {
   dispatch(fetchedRegistration(event))
  };

  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2} className={styles.inputs}>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              required
              fullWidth
              id="email"
              label="Email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
            />
            <Typography variant="subtitle2" color="error">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="full-name"
              required
              fullWidth
              id="fullname"
              label="Full name"
              {...register('fullname')}
              error={!!errors.fullname}
            />
            <Typography variant="subtitle2" color="error">
              {errors.fullname?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="User Name"
              autoComplete="User name"
              {...register('username')}
              error={!!errors.username}
            />
            <Typography variant="subtitle2" color="error">
              {errors.username?.message}
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="passwordConfirmation"
              label="Confirm password"
              autoComplete="Confirm password"
              {...register('passwordConfirmation')}
              error={!!errors.passwordConfirmation}
            />
            <Typography variant="subtitle2" color="error">
              {errors.passwordConfirmation?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} className={styles.acceptTerms}>
            <FormControlLabel
              control={(
                <Controller
                  control={control}
                  defaultValue="false"
                  name="acceptTerms"
                  // @ts-ignore
                  inputRef={register()}
                  render={({ field: { onChange } }) => (
                    <Checkbox
                      className={styles.checkboxTerms}
                      color="primary"
                      sx={{ ml: 2 }}
                      onChange={((e) => onChange(e.target.checked))}
                      required
                    />
                  )}
                />
              )}
              label=""
            />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                  Terms and conditions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the standard dummy text ever since the 1500s, when
                  an unknown printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus
                  PageMaker including versions of Lorem Ipsum.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Typography sx={{ mt: 1, ml: 2 }} variant="inherit" color="textSecondary">
            {errors.acceptTerms
              ? `(${errors.acceptTerms.message})`
              : ''}
          </Typography>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, p: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography className={styles.link} variant="subtitle1" onClick={() => onModelChange()}>
              Already have an account? Sign in
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
