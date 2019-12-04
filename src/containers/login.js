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
import { Icon, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
// import { green } from "@material-ui/core/colors";

const image = require("../img/login_image.png");
const styles = theme => ({
    username: {
        borderRadius: 100,
        border: '1px solid #00b894',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: 40
    },
    password: {
        borderRadius: 100,
        border: '1px solid #00b894',
        alignItems: 'center',
        display: 'flex',
        height: 40
    },
    iconButton: {
        fontSize: 15       
      },
});
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
        const { classes } = this.props;
        return (<div className="Login" >
            <h4 align="center" > Login in to </h4>
            <h4 align="center"
                id="title" > Energe </h4><br></br>
            <center>
                <p>{this.state.isError}</p>
                <form onSubmit={this.handleSubmit}
                    method="post">
                    
                    <FormGroup
                        bsSize="small"
                        className="padb10"
                    >
                        <Paper component="form" className={classes.username}>
                            <IconButton type="submit" className={classes.iconButton} aria-label="user" disabled>
                                <FontAwesomeIcon icon={faUser}/>
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder="username"
                                value={this.state.username}
                                onChange={this.handleUserName}
                                inputProps={{ 'aria-label': 'user' }}
                            />
                        </Paper>
                    </FormGroup >
                    {/* <br></br> */}
                    <FormGroup controlId="password"
                        bsSize="large"
                        className="padb10" >
                        {/* <FormControl value={this.state.password}
                            placeholder="password"
                            onChange={this.handlePassword}
                            type="password" /> */}
                        <Paper component="form" className={classes.password}>
                            <IconButton type="submit" className={classes.iconButton} aria-label="password" disabled>
                                <FontAwesomeIcon icon={faLock} />
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder="password"
                                onChange={this.handlePassword}
                                type="password"
                                inputProps={{ 'aria-label': 'password' }}
                            />
                        </Paper>
                    </FormGroup>

                    <br></br><p className="padb10"> <a href="/forgetpass"> Forgot your password ? Reset! </a></p>
                    <br></br>
                    <Button block bsSize="large"
                        type="submit"
                        onClick={this.postLogin}
                        className="padb10" >
                        Log in
            </Button><br></br>
                </form>
                <p><a href="/register" > Don 't have an account? Sign up!</a></p>
            </center>
            <div>
                <img src={image}
                    style={
                        { width: "100%", height: "fit-content", bottom: 0, position: "absolute" }
                    } />
            </div>
        </div>
        );
    }
}
Login.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withRouter(withStyles(styles)(Login));