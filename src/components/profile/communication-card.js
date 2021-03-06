import React from 'react';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {
    Typography, IconButton, Divider, Button
 } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import 'isomorphic-fetch';
import AddIcon from '@material-ui/icons/Add';

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
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
        width: '100%',
    },
    button: {
        margin: "0px 4px 0px 8px",
    },

})

class CommunicationCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isPhone: false,
            isEmail: false,
            isEdit: false,
            isSave: false,
            mobile: ''
        }
    }

    togglePhoneEdit = () => {
        this.setState({
            isPhone: !this.state.isPhone
        });
    }

    handleMobile = (e) => {
        this.setState({
            mobile: e.target.value,
        });
    }

    toggleEmailEdit = () => {
        this.setState({
            isEmail: !this.state.isEmail
        });
    }

    saveEmailAddress = () => {
        //start code for save email
    }

    saveMobile = () => {
    //     var getToken = localStorage.getItem('access');
    //     if(this.state.isEdit==true){
    //         var data = {'mobile': this.state.name};
    //         var url = endpoints.+this.state.social_id+'/';
    //         axios.put(url, data, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer ' + getToken,
    //         }
    //         }).then(res => {
    //         this.setState({ isAdd: false });
    //         this.setState({ isEdit: false });
    //         this.getSocialLinks();
    //         }).catch(error => {
    //         console.log(error);
    //         });
    //     }else{
    //     var data = {'name': this.state.name, 'url': this.state.url}
    //     axios.post(endpoints.profile_social_links, data, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer ' + getToken,
    //     }
    //     }).then(res => {
    //     this.setState({ isAdd: false });
    //     this.setState({ isEdit: false });
    //     this.getSocialLinks();
    //     }).catch(error => {
    //     console.log(error);
    //     });
    //   }
    }

    render() {
        const { classes } = this.props;
        console.log("enmai", this.state.isEmail);

        return (
            <div className={classes.root}>
                <Typography className={classes.heading}>{this.props.title ? this.props.title : " "}</Typography>
                <div>
                {this.state.isPhone ?
                <div style={{padding:"10px 0px"}}>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                        Mobile
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                    <TextField
                                        label="Mobile Number"
                                        id="mobile"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        className={classes.textField}
                                        value={this.state.mobile}
                                        onChange={this.handleMobile}
                                    />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Button className={classes.button} color="secondary" variant="contained" onClick={this.saveMobile} >
                                            Save Changes
                                        </Button>
                                        <Button className={classes.button} variant="contained" onClick={this.togglePhoneEdit}>Cancel</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>:
                 <div>
                    <IconButton aria-label="add" color="primary" onClick={this.togglePhoneEdit}>
                        <AddIcon fontSize="large" />
                    </IconButton>
                    <span style={{ paddingLeft: "10px" }}>Add Phone Number</span>
                </div>}
                </div>
                <Divider />
                <div>
                {this.state.isEmail ?
                <div style={{padding:"10px 0px"}}>
                    <form>
                        <Grid container spacing={3}>
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
                                        className={classes.textField}
                                    />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Button className={classes.button} color="secondary" variant="contained" onClick={this.saveEmailAddress} >
                                            Save Changes
                                        </Button>
                                        <Button className={classes.button} variant="contained" onClick={this.toggleEmailEdit}>Cancel</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>:
                 <div>
                    <IconButton aria-label="add" color="primary" onClick={this.toggleEmailEdit}>
                        <AddIcon fontSize="large" />
                    </IconButton>
                    <span style={{ paddingLeft: "10px" }}>Add Email Address</span>
                </div>}
                </div>
                <Divider />                
            </div>
        )
    }
}

CommunicationCard.propTypes = {
    title: PropTypes.string,
};

export default withStyles(styles)(CommunicationCard);