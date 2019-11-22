import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Box } from '@material-ui/core';
import TextArea from '../textarea'
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { Button, Avatar, Grow, Divider, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShareAlt, faTag, faCoins, faUsers } from '@fortawesome/free-solid-svg-icons'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    conButton: {
        float: "right",
    },
    imgBack: {
        height: 300,
        borderRadius: "5%",
        backgroundImage: `url("https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60")`
    },
    // contents:{
    //     marginTop:100
    // }
});

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper>
                            <TextArea />
                            <Box component="div" m={1} className={classes.conButton}>
                                <Fab
                                    variant="extended"
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                    className={classes.margin}
                                >
                                    {/* <NavigationIcon className={classes.extendedIcon} /> */}
                                    Post
                            </Fab>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box component="div" m={2}>
                            <b>. Feed .</b>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.imgBack}>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Feed.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Feed);