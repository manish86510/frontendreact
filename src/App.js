import React from 'react';
import './App.css';
import MainContainer from './containers/main-container';
import * as Colors from '@material-ui/core/colors';
import './Routes';


import { MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Login from './containers/login';
import Register from './containers/register';

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
            <MainContainer/>
        </MuiThemeProvider>
      </div>
  );
}

export default App;
