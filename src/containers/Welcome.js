import React from "react";
import '../styles/Login.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { withRouter } from 'react-router-dom'; 
// import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const image = require("../img/login_image.png");
const styles = theme => ({});

class Login extends React.Component {
    constructor(props) {
        super(props);
        // this.props.match.params.id
        this.state={};
    }
    render() {
        return ( <div className = "Login" >
            <h3 align="center"
            id = "title" > WELCOME TO ENERGE</h3>
            {/* <h6 align="center">You have signed up successfully!. Please, proceed to login page</h6> */}
            <h6 align="center">Mail verified successfully!. Please, proceed to login page</h6>
            <center>
            <p><a href = "/login" >Login Page!</a></p>  
            </center> 
            <div>
            <img src = { image }
            style = {
                { width: "100%", height: "fit-content", bottom: 0, position: "absolute" }
            }
            alt=""
            />  
            </div>
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(Login));