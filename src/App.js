import React from 'react';
import './App.css';
import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
//import './Routes';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Login from './containers/login';
import Register from './containers/register';
import ForgotPassword from './containers/forgot_password'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#43a047',
    },
    secondary: Colors.pink,
  },
});

console.log(theme);

function App() {
  return (
    <div>
        <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Route path="/login" component={Login} />
            <Route path="/home" component={MainContainer} />
            <Route path="/register" component={Register} />
            <Route path="/forgetpass" component={ForgotPassword} />
          </div>
        </Router>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
