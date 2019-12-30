import React from 'react';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {
    Typography, Button
 } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import 'isomorphic-fetch';

// const $ = require('jquery');

const styles = theme => ({
    root: {
        padding: '10px 10px'
    },
    heading: {
        fontSize: '20px',
        color: '#0f543ec7',
        fontWeight: '700'
    },
    textField: {
        marginLeft: theme.spacing,
        marginRight: theme.spacing,
        width: '100%',
    },
    button: {
        margin: "0px 4px 0px 8px",
    },

})

class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isPhone: false,
            isEditName: false,
            name:null,
            user: {
                // first_name:props.profile.first_name,
                // last_name:props.profile.last_name,
                email:props.profile.email,
                about:props.profile.about,
                fullname:props.profile.first_name + " " + props.profile.last_name ,
            },
        }
    }

    toggleCancel = () => {
        this.props.editUserNameFunc();
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    updateProfil = () => {
        
        //start code for save email
    }

    handleChange = event => {
        const user = this.state.user;
        user[event.target.name] = event.target.value;
        this.setState({user:user});
        console.log(this.state.user);
    }

    render() {
        const { classes } = this.props;
        const {user} = this.state;
        console.log("profile", this.props.profile);
        return (
            <div className={classes.root}>
                <Typography className={classes.heading}>{this.props.title ? this.props.title : " "}</Typography>
                <div>
                {this.props.isUsername ?
                <div style={{padding:"10px 0px"}}>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                        Name
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                    <TextField
                                        label="Name"
                                        id="fullname"
                                        name="fullname"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        className={classes.textField}
                                        value={user.fullname}
                                        onChange={this.handleChange}
                                    />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                        Mobile
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                    <TextField
                                        label="Mobile Number"
                                        id="mobile"
                                        name="mobile"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        className={classes.textField}
                                        // value={this.state.user.email}
                                        onChange={this.handleChange}
                                    />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                        Email
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                    <TextField
                                        label="Email Address"
                                        id="email"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        name="email"
                                        className={classes.textField}
                                        value={user.email}
                                        onChange={this.handleChange}
                                    />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                        Bio
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                    <TextField
                                        label="About"
                                        id="about"
                                        name="about"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        className={classes.textField}
                                        value={user.about}
                                        onChange={this.handleChange}
                                    />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Button className={classes.button} variant="contained" onClick={this.saveMobile} >
                                            Save Changes
                                        </Button>
                                        <Button className={classes.button} variant="contained" onClick={this.toggleCancel}>Cancel</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>:
                 ''}
                </div>
            </div>
        )
    }
}

UserDetails.propTypes = {
    title: PropTypes.string,
    isUsername: PropTypes.bool,
    editUserNameFunc: PropTypes.func,
    profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDetails);