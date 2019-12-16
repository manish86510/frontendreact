import React from 'react';
import NotificationTopics from './../components/notifications/notification-topics';
import Grid from '@material-ui/core/Grid';
import MyAccountTab from '../components/my-account/my_account_tab';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class MyAccount extends React.Component {
    render() {
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={8}>
                        <MyAccountTab />
                    </Grid>
                    <Grid item xs={4}>
                        { <NotificationTopics /> }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MyAccount);
