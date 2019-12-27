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
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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
        }
    }

    toggleNameEdit = () => {
        this.setState({
            isPhone: !this.state.isPhone
        });
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    updateName = () => {
        //start code for save email
    }

    render() {
        const { classes } = this.props;
        console.log("profile", this.props.profile);
        return (
            <div className={classes.root}>
                <Typography className={classes.heading}>{this.props.title ? this.props.title : " "}</Typography>
                <div>
                {this.props.editUsername ?
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
                                        label="Name"
                                        id="name"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        className={classes.textField}
                                        // value={this.state.mobile}
                                        onChange={this.handleName}
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
                 ''}
                </div>
            </div>
        )
    }
}

UserDetails.propTypes = {
    title: PropTypes.string,
    editUsername: PropTypes.string,
    profile: PropTypes.object,
};

export default withStyles(styles)(UserDetails);