import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: "#1a748e",
      light: "#5396aa",
      lighter: "#8cb9c6",
      lightest: "#c5dce2",
      darkest: "#061d23",
      darker: "#0d3a47",
      dark: "#13576a",
    },
    secondary: {
      main: "#e4b61a",
      light: "#EAC853",
      lighter: "#F1DA8C",
      lightest: "#F8ECC5",
      dark: "#AB8813",
      darker: "#725B0D",
      darkest: "#392D06"
    },
    th_color: {
      main: "#E50043"
    }
  },
  typography: {
    h1: {
      fontSize: "2.4rem",
      mb: 2,
      mt: 2
    },
    h2: {
      fontSize: "1.8rem"
    },
    h3: {
      fontSize: "1.6rem",
      fontWeight: 300
    },
    body2: {
      fontSize: "1.4rem"
    }
  },
  shape: {
    borderRadius: 10
  }
});

theme = createTheme(theme, {
  typography: {
    h1: {
      [theme.breakpoints.down('sm')]: {
        fontSize: "1.8rem"
      }
    },
    h2: {
      [theme.breakpoints.down('sm')]: {
        fontSize: "1.4rem"
      }
    },
    h3: {
      [theme.breakpoints.down('sm')]: {
        fontSize: "1.2rem"
      }
    },
    body1: {
      // [theme.breakpoints.down('md')]: {
      //   fontSize: "0.9rem"
      // }
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
