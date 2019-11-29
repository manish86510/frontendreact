import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Button, Avatar, Grow, Divider, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShareAlt, faTag, faCoins, faUsers, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
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
import axios from 'axios';
import AddPost from '../popup/add_post';
import '../../styles/main.css';
import MyResult from '../../api/utility';
import endpoints from '../../api/endpoints';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    conButton: {
        float: "right",
    },
    gridList: {
        listStyleType: "none",
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
});

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            value: 0,
            like_status: false
        }
    }
    componentDidMount() {
        // var postData = null;
        // var result = MyResult(endpoints.create_post, postData, "get");
        // if (result.status == 200) {
        //     this.setState({
        //         postList: result.data,
        //     });
        // }

        var url = "https://energeapi.do.viewyoursite.net/api/v1/post/";
        var getToken = localStorage.getItem('access');
        axios.get(
            url,
            {
                headers: {
                    Authorization: 'Bearer ' + getToken,
                }
            }
        ).then(res => {
            if (res.status == 200) {
                console.log(res.data)
                this.setState({
                    postList: res.data,
                });
            }
        })
        // this.getPostList();
    }

    handleLike = () => {
        var like = 0
        if(this.state.postList.like_count==0){
            like+=1
        }else{
            like=-+1
        }
        return like;
    }
    render() {
        const { classes } = this.props;
        console.log(this.state.like_status);
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <AddPost/>
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
                            <Grid className={classes.gridList} style={{ borderRadius: 30 }}>
                                {this.state.postList.map(tile => (
                                    <div>
                                        <GridListTile key={tile.user} style={{ width: "100%", height: 300, borderRadius: 30 }}>
                                            <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ borderRadius: 30 }} />
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
                                                {tile.about_post}
                                            </div>

                                            <div style={{ paddingLeft: '2%' }}>
                                                <IconButton size='small' color="inherit" onClick={this.handleLike}>
                                                    <FontAwesomeIcon icon={faThumbsUp} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>{tile.like_count}</span>
                                                <IconButton size='small' style={{ marginLeft: '5%' }} color="inherit" uaria-label="Close">
                                                    <FontAwesomeIcon icon={faComment} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>{tile.comment_count}</span>
                                                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                                                    <FontAwesomeIcon icon={faShareAlt} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>{tile.share_count}</span>
                                            </div>
                                        </Paper>
                                    </div>
                                ))}
                            </Grid>
                        </div>
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