import React from 'react';
// import PostHotTopics from './hot-topics/hot-topic';
import Grid from '@material-ui/core/Grid';
import BookmarkTabs from './bookmark-tab'
import { withStyles } from '@material-ui/styles';
import RightTab from './rightTab/RightTab';



const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Bookmark extends React.Component {
    // constructor(props) {
    //     super(props);
    // };

    render() {
        // const { classes } = this.props;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={8}>
                        <BookmarkTabs />
                    </Grid>
                    <Grid item xs={4}>
                        <RightTab />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(Bookmark);
