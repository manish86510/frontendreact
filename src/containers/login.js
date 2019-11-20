import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../styles/Login.css'
import axios from 'axios';
import { useAuth } from "../context/auth";
import { Link, Redirect } from "react-router-dom";


export default function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const { setAuthTokens } = useAuth();

  function postLogin() {
    axios.post("https://energeapi.do.viewyoursite.net/api/token/", {
      username,
      password
    }).then(result => {
      if (result.status === 200) {
        //setAuthTokens(result.data);
        setLoggedIn(true);
      } else {                
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
        <h4 align="center">Login in to</h4>
        <h4 align="center">Energe</h4>
        <center>
      <form onSubmit={handleSubmit}>
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
        <p>Forgot your password? Reset!</p>
        <Button block bsSize="large" type="submit">
          Log in
        </Button>
      </form>
      <p>Don't have an account? Sign up!</p>
      </center>
    </div>
  );
}