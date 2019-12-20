import React from "react";
import { Button, FormGroup } from '@material-ui/core';
import '../styles/Login.css'
import axios from 'axios';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
// import Img from "react-image";
import { Link, withRouter } from 'react-router-dom';
// import { PropTypes } from 'prop-types';
import { IconButton, CircularProgress } from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import EndPoint from '../api/endpoints';


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
        width: 400,
        height: 40
    },
    cpassword: {
        borderRadius: 100,
        border: '1px solid #00b894',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: 40
    },
    email: {
        borderRadius: 100,
        border: '1px solid #00b894',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: 40
    },
    iconButton: {
        fontSize: 15
    },
});
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: '',
            isError: '',
            fullname: '',
            username: '',
            email: '',
            password: '',
            loading: false
        }
    }

    postRegister = (e) => {
        this.setState({loading: true});
        e.preventDefault();
        let self = this;
        var index = this.state.fullname.indexOf(" ");
        var firstName = this.state.fullname.substr(0, index);
        var lastName = this.state.fullname.substr(index + 1);
        let formData = new FormData();
        if(index===-1){
            formData.append('first_name', lastName);
            formData.append('last_name', firstName);
        }else{
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
        }
        formData.append('username', self.state.username);
        formData.append('email', self.state.email);
        formData.append('password', self.state.password);
        axios.post(EndPoint.profile_user, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            this.setState({loading: false});
            if (result.status === 200) {
                console.log(result.data);
                this.props.history.push({
                    pathname: "/verify"
                });
            } else {
                this.setState({
                    isError: "User already exists!",
                });
            }
        }).catch(e => {
            this.setState({
                isError: "Something went wrong!",
                loading: false
            });
        });
    }

    handleUserName = e => {
        this.setState({
            username: e.target.value,
        });
    }
    handlePassword = e => {
        this.setState({
            password: e.target.value,
        });
    }

    handleFullname = e => {
        this.setState({
            fullname: e.target.value,
        });
    }

    handleEmail = e => {
        this.setState({
            email: e.target.value,
        });
    }

    handleConfirmPassword = e => {
        this.setState({
            confirm_password: e.target.value,
        });
    }


    render() {
        const { classes } = this.props;
        return (
            <div className="Register" >
                <h4 align="center" > Sign Up
            for </h4>
                <h4 align="center"
                    id="title"> Energe </h4><br></br>
                <center>
                    <p>{this.state.isError}</p>
                    <form onSubmit={this.handleSubmit} method="post" >

                    <FormGroup controlId="fullname"
                            bsSize="large"
                            className="padb10">
                            <Paper component="form" className={classes.username}>
                                <IconButton type="submit" className={classes.iconButton} aria-label="user" disabled>
                                    <FontAwesomeIcon icon={faUser} />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="full name"
                                    value={this.state.fullname}
                                    onChange={this.handleFullname}
                                    type="text"
                                    inputProps={{ 'aria-label': 'fullname' }}
                                />
                            </Paper>
                        </FormGroup >

                        <FormGroup controlId="username"
                            bsSize="large"
                            className="padb10">
                            <Paper component="form" className={classes.username}>
                                <IconButton type="submit" className={classes.iconButton} aria-label="user" disabled>
                                    <FontAwesomeIcon icon={faUser} />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="user name"
                                    value={this.state.username}
                                    onChange={this.handleUserName}
                                    type="text"
                                    inputProps={{ 'aria-label': 'user' }}
                                />
                            </Paper>
                        </FormGroup >

                        <FormGroup controlId="email"
                            bsSize="large"
                            className="padb10" >
                            <Paper component="form" className={classes.email}>
                                <IconButton type="submit" className={classes.iconButton} aria-label="email" disabled>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="email"
                                    onChange={this.handleEmail}
                                    value={this.state.email}
                                    inputProps={{ 'aria-label': 'email' }}
                                />
                            </Paper>
                        </FormGroup>

                        <FormGroup controlId="password"
                            bsSize="large"
                            className="padb10" >
                            <Paper component="form" className={classes.password}>
                                <IconButton type="submit" className={classes.iconButton} aria-label="password" disabled>
                                    <FontAwesomeIcon icon={faLock} />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                    type="password"
                                    inputProps={{ 'aria-label': 'password' }}
                                />
                            </Paper>
                        </FormGroup>

                        <FormGroup controlId="cpassword"
                            bsSize="large"
                            className="padb10" >
                            <Paper component="form" className={classes.cpassword}>
                                <IconButton type="submit" className={classes.iconButton} aria-label="cpassword" disabled>
                                    <FontAwesomeIcon icon={faLock} />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="confirm password"
                                    value={this.state.confirm_password}
                                    onChange={this.handleConfirmPassword}
                                    type="password"
                                    inputProps={{ 'aria-label': 'cpassword' }}
                                />
                            </Paper>
                        </FormGroup>
                        <br></br>
                        <Button variant="contained"  
                        disabled={this.state.loading}
                        block bsSize="large" color="primary" 
                        type="submit" onClick={this.postRegister} className="padb10"> 
                        {
                            this.state.loading?(<CircularProgress size={15}/>):undefined
                        }
                        &nbsp; Sign up 
                        </Button>
                    </form><br></br>
                    <p> <Link to="/login" > Already have an account ? Log in ! </Link></p>
                </center>
                <div>
                    <img src={image}
                        style={{ width: "100%", height: "fit-content", bottom: 0, position: "inherit" }} alt="" />
                </div >
            </div >
        );
    }
}

export default withRouter(withStyles(styles)(Register));