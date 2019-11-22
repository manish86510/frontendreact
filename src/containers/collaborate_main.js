import React from 'react';
import NotificationTopics from './../components/notifications/notification-topics';
import Grid from '@material-ui/core/Grid';
import Collaborate from './../components/collaborate'
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class CollaborateMain extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
                    <Grid item xs={8}>
                        <Collaborate />
                        {/* hello */}
                    </Grid>
                    <Grid item xs={4}>
                        { <NotificationTopics /> }
                    </Grid>
                </Grid>
            </div>
        );
    }
}
CollaborateMain.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(CollaborateMain);
