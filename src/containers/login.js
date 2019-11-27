import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../styles/Login.css'
import axios from 'axios';
import { useAuth } from "../context/auth";
import { Link, Redirect } from "react-router-dom";
import '../../node_modules/font-awesome/css/font-awesome.min.css';



export default function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth;

  function postLogin() {
    console.log("user Name :" ,username, "Password : ",password);
    axios.post("https://energeapi.do.viewyoursite.net/api/token/", {
      username,
      password,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token_detail')).access,
      }
    }
   
    ).then(result => {
      if (result.status === 200) {
        console.log(username);
        console.log(result.data);
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {                
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    postLogin();
  }
  
  return (
    
    <div className="Login">
        <h4 align="center">Login in to</h4>
        <h4 align="center" id="title">Energe</h4>
        <p><span className="fas fa-search"></span></p>
        <center>
      <form onSubmit={handleSubmit} method="post">
        <FormGroup controlId="username" bsSize="large" className="padb10">
          <FormControl
            autoFocus
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large" className="padb10">
          <FormControl
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>

        <p className="padb10"><a href="/forgetpass">Forgot your password? Reset!</a></p>

        <Button block bsSize="large" type="submit" className="padb10">
          Log in
        </Button>
      </form>
      <p><a href="/register">Don't have an account? Sign up!</a></p>
      </center>
    </div>
  );
}