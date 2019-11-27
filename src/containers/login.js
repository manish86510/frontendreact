import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../styles/Login.css'
import axios from 'axios';
import { useAuth } from "../context/auth";
import { Link, Redirect } from "react-router-dom";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Img from "react-image";
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const image = require("../img/login_image.png");
const styles = theme => ({});
// function validateForm() {
//     return username.length > 0 && password.length > 0;
// }
class Login extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                isLoggedIn: '',
                isError: '',
                username: '',
                password: '',
            }
        }
    postLogin = (e) => {
        e.preventDefault();
        let self = this;
        axios.post("https://energeapi.do.viewyoursite.net/api/token/", {
            username: self.state.username,
            password: self.state.password
        }).then(result => {
            if (result.status === 200) {
                console.log(result.data);
                localStorage.setItem('access', result.data.access);
                localStorage.setItem('refresh', result.data.refresh);
                this.props.history.push({
                    pathname: "/home"
                });
            } else {
                this.setState({
                    isError: "User not found!"
                });
            }
        }).catch(e => {
            this.setState({
                isError: "User not found!"
            });
        });
    }
    
    handleUserName = e => {
        console.log(e.target.value);
        this.setState({
          username: e.target.value,
        });
      }
      handlePassword = e => {
        console.log(e.target.value);
        this.setState({
          password: e.target.value,
        });
      }
  
    render() {
        return ( <div className = "Login" >
            <h4 align = "center" > Login in to </h4>
            <h4 align = "center"
            id = "title" > Energe </h4>
            <center>
            <p>{ this.state.isError }</p>
            <form onSubmit = { this.handleSubmit }
            method = "post">
            <FormGroup controlId = "username"
            bsSize = "large"
            className = "padb10" >
            <FormControl autoFocus type = "text"
            placeholder = "username"
            value = { this.state.username }
            onChange = { this.handleUserName }
            />  
            </FormGroup > 
            <FormGroup controlId = "password"
            bsSize = "large"
            className = "padb10" >
            <FormControl value = { this.state.password }
            placeholder = "password"
            onChange = { this.handlePassword }
            type = "password" />
            </FormGroup>
            <p className = "padb10"> <a href = "/forgetpass"> Forgot your password ? Reset! </a></p>
            <Button block bsSize = "large"
            type = "submit"
            onClick = { this.postLogin }
            className = "padb10" >
            Log in
            </Button> 
            </form>
            <p><a href = "/register" > Don 't have an account? Sign up!</a></p>  
            </center> 
            <div>
            <img src = { image }
            style = {
                { width: "100%", height: "fit-content", bottom: 0, position: "absolute" }
            }/>  
            </div>
            </div>
        );
    }
}
Login.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(withStyles(styles)(Login));