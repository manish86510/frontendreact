import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../styles/Login.css'

export default function Register(props) {
    const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setcPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Register">
        <h4 align="center">Sign Up for</h4>
        <h4 align="center" id="title">Energe</h4>
        <center>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large" className="padb10">
          <FormControl
            autoFocus
            type="text"
            hint="username"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large" className="padb10">
          <FormControl
            autoFocus
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large" className="padb10">
          <FormControl
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="cpassword" bsSize="large" className="padb10">
          <FormControl
            placeholder="Confirm Password"
            value={confirm_password}
            onChange={e => setcPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Sign up
        </Button>
      </form>
      <p>Already have an account? Log in!</p>
      </center>
    </div>
  );
}