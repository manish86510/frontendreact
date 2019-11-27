import React from 'react';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { ListItem, Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import { Button, Avatar } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
    searchBox: {
        display: 'flex',
        width: "100%",
        borderRadius: 30
    },
    readOnlyfield: {
        paddingLeft: '10px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        backgroundColor: "#fbb7b7",
        borderRadius: 30
    },
    input: {
        marginLeft: theme.spacing * 1,
        flex: 1,
    },
    icon: {
        padding: 10,
        bordeRadius: "0px 30px 30px 0px",
        backgrounColor: "#da1111",
    },
    msg_avater: {
        height: 30,
        width: 30
    },
    chatBox: {
        padding: "2%",
        height: 500,
        overflow: "scroll",
        overflowX: "hidden"
}
})

class MessagesBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: [
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 2,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hello",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "thanks",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 2,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hello",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "thanks",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 2,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hello",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "thanks",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 2,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hello",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "thanks",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
                {
                    id: 2,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hello",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "thanks",
                    seen_status: false
                },
                {
                    id: 1,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "hii..",
                    seen_status: false
                },
            ]
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ minHeight: "100vh" }}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.Paper} style={{ textAlign: "end", padding: 20 }}>
                            <Fab
                                variant="extended"
                                size="medium"
                                color="primary"
                                aria-label="add"
                                className={classes.margin}
                            >
                                Hot topics
                            </Fab>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={{ position: "relative", bottom: 0 }}>
                        <Paper className={classes.chatBox}>
                            {/* <List component="nav" aria-label="main mailbox folders"> */}
                            {this.state.userMessage.map((data, index) => (

                                data.id == 1 ?
                                    <Box component="div" m={3} button style={{ padding: 0, width: "100%" }}>
                                        <Grid container spacing={1} alignItems="center">
                                            <Grid item xs={1}>
                                                <Avatar
                                                    className={classes.msg_avater}
                                                    src={data.avatar}>
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={11}>
                                                <div style={{ fontSize: 12 }}>{data.message}</div>
                                            </Grid>
                                        </Grid>
                                    </Box> :
                                    <Box component="div" m={3} button style={{ padding: 0 }}>
                                        <Grid container spacing={1} direction="row-reverse" alignItems="center">
                                            <Grid item xs={1} >
                                                <Avatar
                                                    className={classes.msg_avater}
                                                    src={data.avatar}>
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={11} style={{ textAlign: "end" }}>
                                                <div style={{ fontSize: 12 }}>{data.message}</div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                            ))}
                            {/* </List> */}
                            <Grid item xs={12} style={{ position: "absolute", bottom: 15, width: "90%" }}>
                                <Paper component="form" className={classes.searchBox}>
                                    <IconButton className={classes.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Search Messages/Groups"
                                        inputProps={{ 'aria-label': 'Search Messages/Groups' }}
                                    />
                                    <IconButton className={classes.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

MessagesBox.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(MessagesBox);