import React from "react";
import '../styles/Login.css';
import { Button, FormGroup } from '@material-ui/core';
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import Img from "react-image";
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';


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
    iconButton: {
        fontSize: 15       
      },
});

class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            username:"",
            password:"",
            confirm_password:""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }
    handleEmail=(e)=>{
        console.log(e.target.value);
        this.setState({
            username:e.target.value
        });
    }
    render() {
        const { classes }=this.props;
        return (<div className="Register" >
            <h4 align="center" > Reset Your Password </h4><br></br><br></br>
            <center>
                <form onSubmit={this.handleSubmit} >
                    <FormGroup controlId="username"
                        bsSize="large"
                        className="padb10" >
                        {/* <FormControl autoFocus type = "text"
                        placeholder = "username/email"
                        value = { username }
                        onChange = { e => setUsername(e.target.value) }
                        />  */}
                        <Paper component="form" className={classes.username}>
                            <IconButton type="submit" className={classes.iconButton} aria-label="username" disabled>
                                <FontAwesomeIcon icon={faUser} />
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder="username/email"
                                value={this.state.username}
                                onChange={this.handleEmail}
                                inputProps={{ 'aria-label': 'username' }}
                            />
                        </Paper>
                    </FormGroup><br></br>
                    <Button variant="contained"  block bsSize="large"
                        type="submit"
                        className="padb10" >
                        Reset Password</Button>
                
                </form><br></br>

                <form onSubmit={this.handleSubmit} >
                    <FormGroup controlId="password"
                        bsSize="large"
                        className="padb10" >
                        {/* <FormControl placeholder = "New Password"
                        value = { password }
                        onChange = { e => setPassword(e.target.value) }
                        type = "password" /> */}
                        <Paper component="form" className={classes.password}>
                            <IconButton type="submit" className={classes.iconButton} aria-label="password" disabled>
                                <FontAwesomeIcon icon={faLock} />
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder = "New Password"
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
                        {/* <FormControl placeholder = "Set New Password"
                        value = { confirm_password }
                        onChange = { e => setcPassword(e.target.value) }
                        type = "password" /> */}
                        <Paper component="form" className={classes.cpassword}>
                            <IconButton type="submit" className={classes.iconButton} aria-label="cpassword" disabled>
                                <FontAwesomeIcon icon={faLock} />
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder = "Set New Password"
                                value={this.state.confirm_password}
                                onChange={this.handleCPassword}
                                type="password"
                                inputProps={{ 'aria-label': 'cpassword' }}
                            />
                        </Paper>
                    </FormGroup><br></br>
                    <Button variant="contained"  block bsSize="large"
                        type="submit"
                        className="padb10"
>
                        Set Password </Button>
                </form>
            </center>
            <div >
                <img alt="img" src={Img}
                    style={
                        { width: "100%", height: "fit-content", bottom: 0, position: "inherit" }}
                />
            </div>
        </div>
        );
    }

}
ForgotPassword.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withRouter(withStyles(styles)(ForgotPassword));
