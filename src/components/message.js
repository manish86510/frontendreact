import React from 'react';
import PostHotTopics from './Posts/post-hot-topics';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import MessageTabs from './message/message-tabs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MyMessages from './message/my-message-tab';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    handleChange = (event, newValue) => {
        // console.log(newValue);
        this.setState({ value: newValue });
      };

    render() {
        const { classes } = this.props;
        var value = this.state.value;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={7}>
                        <div className={classes.root}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="My Messages" />
                                <Tab label="Requests" />
                            </Tabs>
                            {value == 0 && <TabContainer><MyMessages /></TabContainer>}
                            {value == 1 && <TabContainer>Hello1</TabContainer>}
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <PostHotTopics />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
Message.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Message);