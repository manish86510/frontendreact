import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../styles/Login.css'

export default function ForgotPassword(props) {
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
        <h4 align="center">Reset Your Password</h4>
        <center>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large" className="padb10">
          <FormControl
            autoFocus
            type="text"
            placeholder="username/email"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <Button block bsSize="large" type="submit" className="padb10">
          Reset Password
        </Button>
      </form>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="password" bsSize="large" className="padb10">
          <FormControl
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="cpassword" bsSize="large" className="padb10">
          <FormControl
            placeholder="Confirm PasswoSet New Password"
            value={confirm_password}
            onChange={e => setcPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Set Password
        </Button>
      </form>
      </center>
    </div>
  );
}