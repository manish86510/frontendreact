import React from "react";
import '../styles/Login.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { withRouter } from 'react-router-dom'; 
// import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const image = require("../img/login_image.png");

const styles = theme => ({
    footer: {
        marginTop: 63
    },
    login_img:{
        position:'fixed',
    }
});

class VerifyMail extends React.Component {
    render() {
        const { classes } = this.props;
        return ( 
            <div>
            <div className="Login" >
                <h5 align = "center" id = "title" > Email sent successfully, please check your mail to verify. </h5>
            </div>
            <div className={classes.login_img}>
                <img 
                    className={classes.footer} 
                    alt="footer" src={image}
                    style={
                        { width: "100%", height: "fit-content", bottom: 0, position: "inherit" }
                    } 
                />
            </div>
        </div>
        );
    }
}

export default withRouter(withStyles(styles)(VerifyMail));