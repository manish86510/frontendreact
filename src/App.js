import React, { useState } from 'react';
import './App.css';
import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Login from './containers/login';
import Register from './containers/register';
import ForgotPassword from './containers/forgot_password';
import Profile from './components/profile/profile';
import EditProfile from './components/profile/edit-profile';
import Wallet from './components/wallet/wallet';
import WalletCoins from './components/wallet/coins/WalletCoins';
import MoreCoins from './components/wallet/coins/MoreCoins';

import Home from './containers/home';
import SideNav from './containers/nav';
import Message from './components/message';
import Notifications from './containers/Notifications';
// import Bookmark from './components/bookmark';
import CollaboarateMain from './containers/collaborate_main';
import Events from './containers/Events';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bookmark from './components/bookmark';
import { Switch } from 'react-router-dom';
import Welcome from './containers/Welcome';
import Verify_mail from './containers/verify_mail'

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
    const [authTokens, setAuthTokens] = useState();
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    return ( <div>
        <MuiThemeProvider theme = { theme }>
        <Router>
        <Switch>
        <Route exact path = "/" component = { Login }/>
        <Route exact path = "/login" component = { Login }/> 
        <Route path = "/register" component = { Register }/> 
        <Route path = "/forgetpass" component = { ForgotPassword }/>
        <Route path = "/verify" component = { Verify_mail }/>
        <Route path = "/verify_mail/:id" component = { Welcome }/>
        <SideNav>
        <Route path = "/home" component = { Home }/> 
        <Route path = "/message" component = { Message }/> 
        <Route path = "/bookmark" component = { Bookmark }/> 
        <Route path = "/notifications" component = { Notifications }/> 
        <Route path = "/profile" component = { Profile }/> 
        <Route path = "/edit-profile" component = { EditProfile }/> 
        <Route path = "/collaborate" component = { CollaboarateMain }/> 
        <Route path = "/events" component = { Events }/> 
        <Route path = "/wallet" component = { Wallet }/> 
        <Route path = "/walletcoins" component = { WalletCoins }/> 
        <Route path = "/morecoins" component = { MoreCoins }/> 
        </SideNav> 
        </Switch> 
        </Router > 
        </MuiThemeProvider> 
        </div>
    );
}

export default App;