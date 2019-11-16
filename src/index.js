import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './styles/Login.css'
import Login from './containers/login'
import Register from './containers/register'

ReactDOM.render(<App />, document.getElementById('root'));
//serviceWorker.unregister();