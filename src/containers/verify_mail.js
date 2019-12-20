import React from "react";
import '../styles/Login.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { withRouter } from 'react-router-dom'; 
// import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const image = require("../img/login_image.png");
const styles = theme => ({});

class Login extends React.Component {
    render() {
        return ( <div className = "Login" >

            <h5 align = "center"
            id = "title" > Email sent successfully, please check your mail to verify. </h5>
            <div>
            <img src = { image }
            style = {
                { width: "100%", height: "fit-content", bottom: 0, position: "absolute" }
            }
            alt=""/>  
            </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Login));