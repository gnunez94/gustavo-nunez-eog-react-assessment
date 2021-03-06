import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Main from './main';
// import NowWhat from './components/NowWhat';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import { getMetrics } from './api';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => {
  getMetrics();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Header />
        <Main />
        <ToastContainer />
      </Wrapper>
    </MuiThemeProvider>
  );
};

export default App;
