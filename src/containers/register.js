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
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isError: false,
            username: '',
            email: '',
            password: '',
        }
    }
    postRegister = (e) => {
        e.preventDefault();
        let self = this;
        axios.post("https://energeapi.do.viewyoursite.net/api/token/", {
            username: self.state.username,
            email: self.state.email,
            password: self.state.password
        }).then(result => {
            if (result.status === 200) {
                console.log(result.data);
                localStorage.setItem('access_token', result.accessToken);
                localStorage.setItem('id_token', result.idToken);
                //setAuthTokens(result.data);
                //setLoggedIn(true);
                debugger;
                this.props.history.push({
                    pathname: "/home"
                });
            } else {
                this.setState({
                    isError: true
                });
            }
        }).catch(e => {
            this.setState({
                isError: true
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
        return ( <
            div className = "Register" >
            <
            h4 align = "center" > Sign Up
            for < /h4> <
            h4 align = "center"
            id = "title" > Energe < /h4> <
            center >
            <
            form onSubmit = { this.handleSubmit } >
            <
            FormGroup controlId = "username"
            bsSize = "large"
            className = "padb10" >
            <
            FormControl autoFocus type = "text"
            hint = "username"
            placeholder = "username"
            value = { this.state.username }
            onChange = { this.Username }
            /> < /
            FormGroup > <
            FormGroup controlId = "email"
            bsSize = "large"
            className = "padb10" >
            <
            FormControl autoFocus type = "email"
            placeholder = "Email"
            value = { this.state.email }
            onChange = { this.Email }
            /> < /
            FormGroup > <
            FormGroup controlId = "password"
            bsSize = "large"
            className = "padb10" >
            <
            FormControl placeholder = "Password"
            value = { this.state.password }
            onChange = { this.Password }
            type = "password" /
            >
            <
            /FormGroup> <
            FormGroup controlId = "cpassword"
            bsSize = "large"
            className = "padb10" >
            <
            FormControl placeholder = "Confirm Password"
            value = { this.state.confirm_password }
            onChange = { this.setcPassword }
            type = "password" /
            >
            <
            /FormGroup> <
            Button block bsSize = "large"
            type = "submit"
            onClick = { this.postRegister }
            className = "padb10" >
            Sign up <
            /Button> < /
            form > <
            p > < a href = "/login" > Already have an account ? Log in ! < /a></p >
            <
            /center> <
            div >
            <
            img src = { image }
            style = {
                { width: "100%", height: "fit-content", bottom: 0, position: "absolute" }
            }
            /> < /
            div > < /
            div >
        );
    }

}
Register.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withRouter(withStyles(styles)(Register));