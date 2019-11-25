import React, { useState } from 'react';
import './App.css';
import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
//import './Routes';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Login from './containers/login';
import Register from './containers/register';
import ForgotPassword from './containers/forgot_password';
import Home from './containers/home';
import SideNav from './containers/nav';
import Profile from './containers/forms/Profile';
import EditProfile from './containers/forms/EditProfile';
import Notifications from './containers/Notifications';
import Bookmark from './components/bookmark';
import CollaboarateMain from './containers/collaborate_main';

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

  return (
    <div>
        <MuiThemeProvider theme={theme}>
        
        <Router>
          <div>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgetpass" component={ForgotPassword} />

         <SideNav>
            <Route path="/home" component={Home} />
            <Route path="/bookmark" component={Bookmark}/>
            <Route path="/notifications" component={Notifications}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/edit-profile" component={EditProfile}/>
            <Route path="/collaborate" component={CollaboarateMain}/>
         </SideNav>

          </div>


          
        </Router>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
