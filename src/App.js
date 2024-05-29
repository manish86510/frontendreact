import React from 'react';
import './App.css';
// import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
// import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, createTheme } from '@material-ui/core';
import Login from './containers/login';
import Register from './containers/register';
import ForgotPassword from './containers/forgot_password';
import Profile from './components/profile/profile';
import EditProfile from './components/profile/Edit-profile';
import Wallet from './components/wallet/wallet';
import WalletCoins from './components/wallet/coins/WalletCoins';
import MoreCoins from './components/wallet/coins/MoreCoins';

import Home from './containers/home';
import SideNav from './containers/nav';
import Message from './components/message';
import Notifications from './containers/Notifications';
import CollaboarateMain from './containers/collaborate_main';
import Events from './containers/Events';
import Bookmark from './components/bookmark';
import { Switch } from 'react-router-dom';
import Welcome from './containers/Welcome';
import Verify_mail from './containers/verify_mail';
import componentTabs from './components/commoncomponent/commonComponent-tab';
import CompanyTab from './components/commoncomponent/commonCompany-tab';
import CompanyDetailTab from './components/commoncomponent/companyDetail-tab';
import Navbar from './Admin/components/Navbar';
import AdminLayout from './Admin/AdminLayout';
import News from './Admin/components/news/News';
import Schemes from './Admin/components/schemes/Schemes';
import AdminEvents from './Admin/components/events/AdminEvents';
import AdminCompanies from './Admin/components/companies/AdminCompanies';



const theme = createTheme({
    palette: {
        primary: {
            main: '#F26522',
            contrastText: '#ffffff'
        },
        // secondary: Colors.pink,
        secondary: {
            main: '#2D934E'
        }
    },
});

console.log('theme', theme);

export default function App() {
    // const setTokens = (data) => {
    //     localStorage.setItem("tokens", JSON.stringify(data));
    //     setAuthTokens(data);
    // }

    return (<div>
        <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgetpass" component={ForgotPassword} />
                    <Route path="/verify" component={Verify_mail} />
                    <Route path="/verify_mail/:id" component={Welcome} />

                    <Route path="/admin" component={AdminLayout} />
                    <Route path="/news" component={News} />
                    <Route path="/event" component={AdminEvents} />
                    <Route path="/schemes" component={Schemes} />
                    <Route path="/companies" component={AdminCompanies} />

                    <SideNav>
                        <Route path="/bookmark" component={Home} />
                        <Route path="/message" component={Message} />
                        <Route path="/home" component={Bookmark} />
                        <Route path="/notifications" component={Notifications} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/Edit-profile" component={EditProfile} />
                        <Route path="/collaborate" component={CollaboarateMain} />
                        <Route path="/events" component={Events} />
                        <Route path="/component-tabs" component={componentTabs} />
                        <Route path="/company-tabs" component={CompanyTab} />
                        <Route path="/company-detail" component={CompanyDetailTab} />
                        <Route path="/wallet" component={Wallet} />
                        <Route path="/walletcoins" component={WalletCoins} />
                        <Route path="/morecoins" component={MoreCoins} />
                        <Route path="/logout" component={() => {
                            localStorage.clear();
                            window.location.href = '/';
                        }} />
                    </SideNav>



                </Switch>
            </Router>
        </MuiThemeProvider>
    </div>
    );
}

// export default App;