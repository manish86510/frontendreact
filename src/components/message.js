import React from 'react';
// import PostHotTopics from './hot-topics/hot-topic';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MyMessages from './message/my-message-tab';
import MessageBox from './message/message-box'


const styles = theme => ({
    paper: {
        padding: theme.spacing * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    message:{
        marginTop:"5%"
    }
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
                <Grid container direction="row" spacing={2}>
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
                            {value === 0 &&  <MyMessages /> }
                            {value === 1 &&  <MyMessages /> }
                        </div>
                    </Grid>
                    <Grid item xs={5} className={classes.message}>
                        <MessageBox />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Message);
