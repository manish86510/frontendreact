import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../styles/Login.css'
import axios from 'axios';
import { useAuth } from "../context/auth";
import { Link, Redirect } from "react-router-dom";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
// import Img from "react-image";
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const image = require("../img/login_image.png");
const styles = theme => ({});
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: '',
            isError: '',
            username: '',
            email: '',
            password: ''
        }
    }

    postRegister = (e) => {
        e.preventDefault();
        let self = this;
        console.log(self.state.username);
        console.log(self.state.email);
        console.log(self.state.password);
        axios.post("https://energeapi.do.viewyoursite.net/", {
            username: self.state.username,
            email: self.state.email,
            password: self.state.password
        }).then(result => {
            if (result.status === 200) {
                console.log(result.data);

                this.setState({
                    isSuccess:"Email sent successfully, please check your mail to verify"
                    })

                this.props.history.push({
                    pathname: "/register"
                });
            } else {
                this.setState({
                    isError: "Something went wrong!"
                });
            }
        }).catch(e => {
            this.setState({
                isError: "Something went wrong!"
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

    handleEmail = e => {
        console.log(e.target.value);
        this.setState({
            email: e.target.value,
        });
    }

    handleConfirmPassword = e => {
        console.log(e.target.value);
        this.setState({
            confirm_password: e.target.value,
        });
    }


    render() {
        return (
            <div className="Register" >
                <h4 align="center" > Sign Up
            for </h4>
                <h4 align="center"
                    id="title"> Energe </h4>
                <center>
                    <p>{ this.state.isError }</p>
                    <form onSubmit={this.handleSubmit} method = "post" >
                        <FormGroup controlId="username"
                            bsSize="large"
                            className="padb10">
                            <FormControl 
                                autoFocus 
                                type="text"
                                placholder="username"
                                onChange={this.handleUserName}
                                value={this.state.username} />
                        </FormGroup >
                        <FormGroup controlId="email"
                            bsSize="large"
                            className="padb10" >
                            <FormControl  type="email"
                                placeholder="email"
                                onChange={this.handleEmail}
                                value={this.state.email} />
                        </FormGroup>
                        <FormGroup controlId="password"
                            bsSize="large"
                            className="padb10" >
                            <FormControl placeholder="password"
                                value={this.state.password}
                                onChange={this.handlePassword}
                                type="password" />
                        </FormGroup>
                        <FormGroup controlId="cpassword"
                            bsSize="large"
                            className="padb10" >
                            <FormControl placeholder="Confirm Password"
                                value={this.state.confirm_password}
                                onChange={this.handleConfirmPassword}
                                type="password" />
                        </FormGroup>
                        <Button block bsSize="large" type="submit" onClick={this.postRegister} className="padb10"> Sign up </Button>
                    </form>
                    <p> <a href="/login" > Already have an account ? Log in ! </a></p>
                </center>
                <div>
                    <img src={image}
                        style={{ width: "100%", height: "fit-content", bottom: 0, position: "absolute" }} />
                </div >
            </div >
        );
    }
}
Register.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(withStyles(styles)(Register));