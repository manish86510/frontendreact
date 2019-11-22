import React from 'react';
import NotificationTopics from './../components/notifications/notification-topics';
import Grid from '@material-ui/core/Grid';
import NotificationTabs from './../components/notifications/notification-tab'
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Notifications extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
                    <Grid item xs={8}>
                        <NotificationTabs />
                        {/* hello */}
                    </Grid>
                    <Grid item xs={4}>
                        {/* <NotificationTopics /> */}
                        hello
                    </Grid>
                </Grid>
            </div>
        );
    }
}
Notifications.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Notifications);
