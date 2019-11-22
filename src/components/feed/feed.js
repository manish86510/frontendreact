import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import TextArea from '../textarea'
import IconButton from '@material-ui/core/IconButton';
import { Button, Avatar, Grow, Divider, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShareAlt, faTag, faCoins, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { height } from 'dom-helpers';
import { maxHeight, borderRadius } from '@material-ui/system';
import { white } from 'ansi-colors';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    conButton: {
        float: "right",
    },
    gridList: {
        listStyleType:"none",
        width: '100%',
        borderRadius: 30
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    content: {
        position: "relative",
        width: "100%",
        top: -50,
        borderRadius: 15,
        paddingBottom: 24
    }
    // imgStyle:{
    //     width:"100%",
    //     maxHeight:400,
    //     borderRadius:10
    // }
});

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            tileData: [
                {
                    img: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
                    title: 'test',
                    author: 'author',
                },
                {
                    img: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
                    title: 'test',
                    author: 'author',
                },
            ]
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        {/* <Paper> */}
                            <TextArea />
                            
                        {/* </Paper> */}
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box component="div" m={2}>
                            <b>. Feed .</b>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid className={classes.gridList} style={{ borderRadius:30 }}>
                                {this.state.tileData.map(tile => (
                                    <div>
                                        <GridListTile key={tile.img} style={{ width: "100%", height: 300, borderRadius:30}}>
                                            <img src={tile.img} alt={tile.title} style={{ borderRadius:30 }}/>
                                        </GridListTile>
                                        <Paper className={classes.content}>
                                            <ListItem>
                                                <Avatar
                                                    src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                                                </Avatar>

                                                <span style={{ padding: 20 }}>
                                                    <div><b>Awosome Project</b></div>
                                                    <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                                                </span>

                                            </ListItem>

                                            <div style={{ paddingLeft: '2%' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </div>

                                            <div style={{ paddingLeft: '2%' }}>
                                                <IconButton size='small' color="inherit" uaria-label="Close">
                                                    <FontAwesomeIcon icon={faComment} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>51</span>
                                                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                                                    <FontAwesomeIcon icon={faShareAlt} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>51</span>
                                                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                                                    <FontAwesomeIcon icon={faTag} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>251</span>
                                            </div>
                                        </Paper>
                                    </div>


                                ))}
                            </Grid>

                        </div>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <div style={{ padding: "0px 50px 0px 50px", borderRadius: "10px" }}>
                            <GridList cellHeight={180} className={classes.gridList}>
                                {this.state.tileData.map(tile => (
                                    <GridListTile key={tile.img} style={{ width: "100%", height: 300, borderRadius: 50 }}>
                                        <img src={tile.img} alt={tile.title} />
                                    </GridListTile>
                                ))}
                            </GridList>
                            <div className={classes.conContent}>
                                <Paper className={classes.content}>
                                    <ListItem>
                                        <Avatar
                                            src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                                        </Avatar>

                                        <span style={{ padding: 20 }}>
                                            <div><b>Awosome Project</b></div>
                                            <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                                        </span>

                                    </ListItem>

                                    <div style={{ paddingLeft: '2%' }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </div>

                                    <div style={{ paddingLeft: '2%' }}>
                                        <IconButton size='small' color="inherit" uaria-label="Close">
                                            <FontAwesomeIcon icon={faComment} />
                                        </IconButton>
                                        <span style={{ fontSize: 12 }}>51</span>
                                        <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                                            <FontAwesomeIcon icon={faShareAlt} />
                                        </IconButton>
                                        <span style={{ fontSize: 12 }}>51</span>
                                        <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                                            <FontAwesomeIcon icon={faTag} />
                                        </IconButton>
                                        <span style={{ fontSize: 12 }}>251</span>
                                    </div>
                                </Paper>
                            </div>
                        </div>
                    </Grid> */}
                </Grid>
            </div>
        );
    }
}

Feed.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Feed);