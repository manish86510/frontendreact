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

class Login extends React.Component {

  
    render() {
        return ( <div className = "Login" >
            <h3 align="center" > WELCOME TO ENERGE</h3>
            <h6 align="center">You have signed up successfully. Please, proceed to login page</h6>
            <center>
            <p><a href = "/login" >Login Page!</a></p>  
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