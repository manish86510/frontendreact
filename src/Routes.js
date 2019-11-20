import MainContainer from './containers/main-container';
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Login from "./containers/login";
import Register from './containers/register';

const routing = (
  <Router>
    <div>
      <Route path="/login" component={Login} />
      <Route path="/home" component={MainContainer} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))