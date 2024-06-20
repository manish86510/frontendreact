import React,{useState,useEffect} from 'react';
import './App.css';
// import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
// import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, createTheme, useScrollTrigger } from '@material-ui/core';
import {generateToken,messaging} from './containers/firebase/Firebase';
import {onMessage} from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';
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
import MyWork from './components/myWork/MyWork';
import Chapter from './components/chapter/chapter';
import UserSubscription from './Admin/components/subscription/UserSubscription';
import Logout from './containers/logout';
import Industry from './Admin/components/industry/Industry';
import MyWorkDetailGetting from './components/myWork/MyWorkDetailGetting';
import MyWorkDetailPosted from './components/myWork/MyWorkDetailPosted';
import my_account_tab from './components/my-account/my_account_tab';
import Subscription from './components/my-account/Subscription';
import  Help  from './components/help/Help';
import Tickets from './Admin/components/tickets/Tickets';


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
    const [id,setId] = useState("");
    const [idPost,setIdPost] = useState("");
    // const setTokens = (data) => {
    //     localStorage.setItem("tokens", JSON.stringify(data));
    //     setAuthTokens(data);
    // }
    useEffect(()=>{
        generateToken()
        onMessage(messaging,(payload)=>{
          console.log(payload.notification,"here is payload")
          toast.success(payload.notification.title)
        
        const { title, body, image } = payload.notification;
    
    toast.custom((t) => (
        <div
          style={{
            maxWidth: '100%',
            width: 'auto',
            backgroundColor: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderRadius: '0.5rem',
            pointerEvents: 'auto',
            display: 'flex',
            ring: '1px solid black',
            opacity: '0.9',
            transition: t.visible ? 'transform 0.2s ease-out, opacity 0.2s ease-out' : 'transform 0.2s ease-in, opacity 0.2s ease-in',
          }}
        >
          <div style={{ flex: '1 0 auto', width: 'auto', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'start' }}>
              <div style={{ flexShrink: 0, paddingTop: '0.125rem' }}>
                {image && <img style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%' }} src={image} alt="" />}
              </div>
              <div style={{ marginLeft: '0.75rem', flex: '1' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1F2937' }}>{title}</p>
                <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#6B7280' }}>{body}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', borderLeft: '1px solid #E5E7EB' }}>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '0 0.5rem 0.5rem 0',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#4F46E5',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                outline: 'none',
                transition: 'color 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#4338CA')}
              onMouseLeave={(e) => (e.target.style.color = '#4F46E5')}
            >
              Close
            </button>
          </div>
        </div>
      ));
        //   toast.success(payload.notification.body)
          // setData(payload.notification)
          // setData((prevData) => [...prevData, payload.notification]);
        })
      },[])


    return (<div>
        
        <Toaster
     position="top-right" />
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
                                <Route path="/admin/tickets" component={Tickets} />
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
                        <Route path="/help" component={Help} />
                        <Route path="/my_work" >
                        <MyWork myWorkId={setId} myPostId={setIdPost}/>
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
                        <Route path="/my_account" component={Subscription} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/workdetailgetting">
                            <MyWorkDetailGetting idWorkGetting={id} />
                        </Route>
                        {/* <Route path="/workdetailgetting" component={MyWorkDetailGetting} /> */}
                        <Route path="/workdetailposting">
                            <MyWorkDetailPosted idWorkPosting={idPost} />
                        </Route>
                        {/* <Route path="/workdetailposting" component={MyWorkDetailPosted} /> */}
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