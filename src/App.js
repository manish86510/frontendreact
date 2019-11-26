import React from 'react';
import './App.css';
import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Login from './containers/login';
import Register from './containers/register';
import ForgotPassword from './containers/forgot_password'
import Profile from './components/profile/profile'
import Wallet from './components/wallet/wallet'
import WalletCoins from './components/wallet/coins/WalletCoins'
import MoreCoins from './components/wallet/coins/MoreCoins'
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <Route path="/profile" component={Profile} /> 
            <Route path="/wallet" component={Wallet} /> 
            <Route path="/walletcoins" component={WalletCoins} />
            <Route path="/morecoins" component={MoreCoins} />

            
          </div>


          
        </Router>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
