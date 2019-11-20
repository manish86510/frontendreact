// import MainContainer from './containers/main-container';
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Register from './containers/register';
import PostTab from './components/posts-tab';
const routing = (
  <Router>
    <div>
      {/* <Route path="/home" component={MainContainer} /> */}
      <Route path="/register" component={Register} />
      <Route path="/bookmark" component={PostTab} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))