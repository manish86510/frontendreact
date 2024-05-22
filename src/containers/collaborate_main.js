import React from 'react';
import NotificationTopics from './../components/notifications/notification-topics';
import Grid from '@material-ui/core/Grid';
import Collaborate from './../components/collaborate'
import { withStyles } from '@material-ui/styles';
import RightTab from '../components/rightTab/RightTab';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class CollaborateMain extends React.Component {

    render() {
        // const { classes } = this.props;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={8}>
                        <Collaborate />
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

export default withStyles(styles)(CollaborateMain);
