import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
// @ts-ignore
import styles from '../../components/ForgotModalWindow/ForgotModalWindow.module.css';


interface IRegistrationSuccess {
  isRegister: boolean;
}

export const RegisterSuccess:React.FC<IRegistrationSuccess> = ({ isRegister}) => {
  return (
    <Grid className={styles.forgotRoot}>
      <Grid
        className={!isRegister ? styles.modal : `${styles.modal} ${styles.modal_active}`}>
        <Grid
          className={!isRegister ? styles.alert : `${styles.alert} ${styles.alert_active}`}>
          <Typography variant="h5">Success!</Typography>
          <Grid>
            <Typography variant="h6" sx={{ mt: 1, mb: 4 }}>Registration was successful</Typography>
            <Grid>
              <Button
                onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  location.reload();
                }}
                variant="contained"
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
