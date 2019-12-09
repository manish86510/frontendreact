import React from 'react';
import EventTopics from './../components/events/events_topic';
import Grid from '@material-ui/core/Grid';
import EventsTabs from './../components/events/event_tab'
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';



const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Events extends React.Component {
    // constructor(props) {
    //     super(props);
    // };

    render() {
        // const { classes } = this.props;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
                    <Grid item xs={8}>
                        <EventsTabs />
                    </Grid>
                    <Grid item xs={4}>
                        <EventTopics />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Events);
