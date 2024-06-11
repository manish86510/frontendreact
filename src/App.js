import React,{useState} from 'react';
import './App.css';
// import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
// import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, createTheme, useScrollTrigger } from '@material-ui/core';
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
import GovernmentSchemesTab from './components/governmentschemes/GovernmentSchemesTab';
import MainPage from './Admin/components/MainPage';
import CardCall from './components/commoncomponent/cardCall';
import CarouselCall from './components/carousel/carouselCall';
import CommonComponent from './components/commoncomponent/commonComponent';
import GovernmentDescription from './components/governmentschemes/governmentDescription';
import MyWorkTab from './components/myWork/MyWorkTab';
import Chapter from './components/chapter/chapter';
import UserSubscription from './Admin/components/subscription/UserSubscription';
import Logout from './containers/logout';
import Industry from './Admin/components/industry/Industry';
import MyWorkDetail from './components/myWork/MyWorkDetail';


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

// console.log('theme', theme);

export default function App() {
    const [selectedId, setSelectedId] = useState("");
    const [schemes,setSchemes] = useState("");
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


                    {/* <Route path="/admin" component={AdminLayout} />
                    <Route path="/news" component={News} />
                    <Route path="/event" component={AdminEvents} />
                    <Route path="/schemes" component={Schemes} />
                    <Route path="/companies" component={AdminCompanies} /> */}

                    <Route path="/admin">
                        <div>
                            <Navbar />
                            <Switch>
                                <Route path="/admin/dashboard" component={MainPage} />
                                <Route path="/admin/news" component={News} />
                                <Route path="/admin/event" component={AdminEvents} />
                                <Route path="/admin/schemes" component={Schemes} />
                                <Route path="/admin/companies" component={AdminCompanies} />
                                <Route path="/admin/subscription" component={UserSubscription} />
                                <Route path="/admin/industry" component={Industry} />
                            </Switch>
                        </div>
                    </Route>

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
                        <Route path="/my_work" >
                        <MyWorkTab selectedId={selectedId}/>
                        </Route>
                        <Route path="/carousel-call" component={CarouselCall} />
                        <Route path="/chapter" component={Chapter} />
                        <Route path="/company-tabs" component={CompanyTab} />
                        {/* <Route path="/company-detail" component= {CompanyDetailTab}/> */}
                        <Route path="/company-detail">
                            <CompanyDetailTab   selectedId={selectedId}/>
                        </Route>
                        <Route path="/governmentSchemes-tab" component={GovernmentSchemesTab} />

                        {/* <Route path="/governmentSchemes-tab">
                         <GovernmentSchemesTab>
                             <CommonComponent selectedId={selectedId} card={card} />
                         </GovernmentSchemesTab>
                            </Route> */}
                        <Route path="/govt-description" component={GovernmentDescription} />
                        <Route path="/wallet" component={Wallet} />
                        {/* <Route path="/cardCall" component={ CardCall} /> */}
                        <Route path="/cardCall">
                            <CardCall setSelectedId={setSelectedId} />
                        </Route>
                        <Route path="/walletcoins" component={WalletCoins} />
                        <Route path="/morecoins" component={MoreCoins} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/workdetail" component={MyWorkDetail} />
                        {/* <Route path="/logout" component={() => {
                            localStorage.clear();
                            window.location.href = '/';
                        }} /> */}
                    </SideNav>



                </Switch>
            </Router>
        </MuiThemeProvider>
    </div>
    );
}

// export default App;