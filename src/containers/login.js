import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../styles/Login.css'

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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