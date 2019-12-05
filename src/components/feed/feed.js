import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Button, Avatar, Grow, Divider, ListItem } from '@material-ui/core';
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShareAlt, faTag, faCoins, faUsers, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import InputBase from '@material-ui/core/InputBase';
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
import TextareaAutosize from 'react-textarea-autosize';


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
    },
   
});

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            value: 0,
            like_status: false,
            isError: '',
            show:false,
            comment: '',
            parent: '',
            comment_id:0,
        };
        this.postComments = this.postComments.bind(this);
        // this.handleToggle = this.handleToggle.bind(this)
            // post_type : this.props.post_type
        }   
    componentDidMount() {
        // var postData = null;
        // var result = MyResult(endpoints.create_post, postData, "get");
        // if (result.status == 200) {
        //     this.setState({
        //         postList: result.data,
        //     });
        // }
        var url = "https://energeapi.do.viewyoursite.net/api/v1/post/get-post/";
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
                console.log(res.data);
                this.setState({
                    postList: res.data,
                });
            }
        })
        // this.getPostList();
    }

    handleLike = (tile) => {
        var my_data={
          post:tile,
        }
        var url = "https://energeapi.do.viewyoursite.net/api/v1/post/like/"
        var getToken = localStorage.getItem('access');
        axios.post(
          url, my_data,
          {
            headers: {
              Authorization: 'Bearer ' + getToken,
            }
          }
        ).then(res => {
            this.componentDidMount();
        })
      }

    postComments = (tile) => { 
        console.log(this.state.comment_id);
        if(this.state.comment_id == tile){
            this.setState({show: !this.state.show});    
        }else{
            this.setState({show: true});
        }       
        this.setState( { comment_id: tile } )
        // tile.preventDefault();
        let self = this;
        console.log(self.state.comment);
        // console.log(self.state.parent);
        var url = "https://energeapi.do.viewyoursite.net/api/v1/post/comment/"
        var getToken = localStorage.getItem('access');
        axios.post(url, {
            post: tile,
            comment: self.state.comment,
        },  
            {
                headers: {
                    Authorization: 'Bearer ' + getToken
                }
        }).then(res => {
                this.componentDidMount();
        }).catch(tile => {
            this.setState({
                isError: "Data not found!"
            });
            
        });
    }
    handleComment = (tile) => {
        console.log(tile.target.value);
        // console.log(tile.target.value);
        this.setState({
        comment: tile.target.value,
        // parent: tile.target.value,
        });
    }
    // handleToggle = (tile) => {
    //     console.log(this.state.comment_id);
    //     if(this.state.comment_id == tile){
    //         this.setState({show: !this.state.show});    
    //     }else{
    //         this.setState({show: true});
    //     }       
    //     this.setState( { comment_id: tile } )
    // }
  
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
                                        {tile.post_media.map(userMedia => (
                                            // { userMedia.file.map(mediaFile => (
                                                <img src={"https://energeapi.do.viewyoursite.net" + userMedia.file} />
                                            // ))}
                                        ))}
                                            {/* <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ border: 2, borderRadius: 2, width:'25%' }} />
                                            <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ border: 2, borderRadius: 2, width:'25%' }} />
                                            <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} alt={tile.title} style={{ border: 2, borderRadius: 2, width:'25%', opacity: 0.4 }} /> */}
                                        </GridListTile>
                                        <Paper className={classes.content}>
                                            <ListItem>
                                                <Avatar
                                                    src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                                                </Avatar>
                                                {/* {tile.user.map(userData => (
                                                <span style={{ padding: 20 }}>
                                                    <div><b>{userData.username}</b></div>
                                                    <div style={{ fontSize: 12 }}>@{userData.username} . 300 followers</div>
                                                </span>
                                                ))} */}
                                            </ListItem>
                                            <div style={{ paddingLeft: '2%' }}>
                                                {tile.about_post}
                                            </div>
                                            <div style={{ paddingLeft: '2%' }}>
                                                <IconButton size='small' color="inherit" onClick={this.handleLike.bind(this, tile.id)}>
                                                <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#0066cc' }} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>{tile.like_count}</span>

                                                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" 
                                                    onClick={this.postComments.bind(this, tile.id)}>
                                                    <FontAwesomeIcon icon={faComment} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>{tile.comment_count}</span>

                                                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                                                    <FontAwesomeIcon icon={faShareAlt} />
                                                </IconButton>
                                                <span style={{ fontSize: 12 }}>{tile.share_count}</span>
                                            </div><br></br>

                                            {this.state.show && this.state.comment_id == tile.id &&
                                                <form onSubmit={this.handleSubmit}
                                                    bsSize="small"
                                                    className="padb10">                                                       
                                                        <textarea className="textarea"                                                        
                                                        placeholder="Write a comment..."                                                   
                                                        value={this.state.comment}
                                                        onChange={this.handleComment}
                                                        type="text"
                                                        style={{paddingRight:50 , marginLeft: 95, height:29, 
                                                        width:300, border:'1px solid #d8d5d5',
                                                        backgroundColor: '#F2F4F4 ', borderRadius:6,}}></textarea>                                                   
                                                            <Button block bsSize="Large"
                                                                onClick={this.postComments.bind(this, tile.id)}
                                                                className="padb10" 
                                                                type="submit"
                                                                style={{ backgroundColor: '#0066cc', 
                                                                color: 'white', 
                                                                marginBottom:22, 
                                                                marginLeft: 2,
                                                                fontSize:10,
                                                                }}>
                                                                Post
                                                            </Button>                                                                                                                                                                    
                                                </form>
                                            }
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
