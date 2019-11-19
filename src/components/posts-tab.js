import React from 'react';
import Typography from '@material-ui/core/Typography';
// import TextArea from '../components/textarea';
import Feed from './feed/feed';
import HotTopic from './hot-topics/hot-topic';
import Grid from '@material-ui/core/Grid';
import BookmarkTabs from './bookmark-tab'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';



const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class PostTab extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="center" spacing={16}>
                    <Grid item xs={8}>
                        <BookmarkTabs />
                    </Grid>
                    <Grid item xs={4}>
                        <HotTopic />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
PostTab.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(PostTab);
