import React from 'react';
import NotificationTopics from './../components/notifications/notification-topics';
import Grid from '@material-ui/core/Grid';
import NotificationTabs from './../components/notifications/notification-tab'
import { withStyles } from '@material-ui/styles';
import RightTab from '../components/rightTab/RightTab';
// import { PropTypes } from 'prop-types';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Notifications extends React.Component {
    render() {
        // const { classes } = this.props;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={8}>
                        <NotificationTabs />
                        {/* hello */}
                    </Grid>
                    <Grid item xs={4}>
                    <RightTab />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Notifications);
