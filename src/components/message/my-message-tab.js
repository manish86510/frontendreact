import React from 'react';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { ListItem, Button, Avatar, Fab } from '@material-ui/core';
import List from '@material-ui/core/List';


const styles = theme => ({
    searchBox: {
        padding: '2px 10px',
        display: 'flex',
        alignItems: 'center',
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


})

class MyMessages extends React.Component {
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
                    id: 3,
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg",
                    message: "thanks",
                    seen_status: false
                },
            ]
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={12}>
                        <Paper component="form" className={classes.searchBox}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Messages/Groups"
                                inputProps={{ 'aria-label': 'Search Messages/Groups' }}
                            />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.readOnlyfield} style={{ borderRadius: 20 }}>
                            <InputBase
                                xl={10}
                                className={classes.input}
                                placeholder="Search Messages/Groups"
                                inputProps={{
                                    'aria-label': 'Search Messages/Groups',
                                    readOnly: true,
                                }}
                            />
                            <Button variant="contained"  onClick={this.handle} xl={2} className={classes.icon} aria-label="search" style={{ backgroundColor: "red", borderRadius: "0px 30px 30px 0px" }}>
                                <text>Ignore all</text>
                            </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <List component="nav" aria-label="main mailbox folders">
                            {this.state.userMessage.map((data, index) => (
                                <ListItem button style={{ padding: 0 }}>
                                    <Paper style={{ width: "100%", padding: 20 }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={1}>
                                                <Avatar
                                                    src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <div><b>Awosome Project</b></div>
                                                <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {
                                                    data.seen_status === false ?
                                                        <Fab color="primary" size="small" aria-label="add">1</Fab> : ""
                                                }

                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(MyMessages);