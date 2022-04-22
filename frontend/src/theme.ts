import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main:  '#000',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: '20px',
          ':hover': {
            backgroundColor: '#464646',
          }
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderRadius: '15px',
            boxShadow: '0 1px 1px 1px #cccccc',
          },
        }
      }
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontSize: '16px',
    },
  },
});
