import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { PropTypes } from 'prop-types';
import {List, IconButton, ListItemSecondaryAction} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import endpoints from "../../api/endpoints";
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import FeedComments from './feed-comments';


const styles = theme => ({
    card:{
        marginBottom: 30,
        borderRadius: 20
    },
    cardMedia: {
        minHeight: 240,
    },
    cardContent:{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        background: '#ffffff',
        marginTop: -20
    }
});

class FeedDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open_drawer: props.open_drawer
        };
    }

    closeDrawer = ()=>{
        this.setState({open_drawer: false});
        this.props.onDrawerClose();
    }

    render(){
        const { classes, post } = this.props;
        var markup = {__html: this.props.post.about_post.replace(/(?:\r\n|\r|\n)/g, '<br />')};

        return (
            <Drawer anchor="right" open={this.state.open_drawer} className={"post-detail"} transitionDuration={{enter: 2000, exit: 1000}}>
                <IconButton size='small' onClick={this.closeDrawer} style={{position:'absolute', top: 5, right: 10}}>
                    <CloseOutlinedIcon/>
                </IconButton>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary="Site Admin" secondary="@siteadmin &#8226; 5k followers"></ListItemText>
                    </ListItem>
                </List>
                <CardMedia
                    // component="img"
                    className={classes.cardMedia}
                    height="220"
                    image={post.post_media[0].file}
                />
                <Typography variant="body2" color="textSecondary" component="div" dangerouslySetInnerHTML={markup} style={{padding: '5px 12px'}}/>

                <CardActions style={{padding: '8px 25px'}}>
                        {
                            post.like_count>0?(
                                <IconButton size='small'>
                                <ThumbUpAltOutlinedIcon/>
                                </IconButton>
                            ):(
                                <IconButton size='small'>
                                <ThumbUpAltOutlinedIcon/>
                                </IconButton>
                            )
                        }
                        <span style={{ fontSize: 12 }}>{post.like_count}</span>
                        <IconButton size='small'>
                            <ChatBubbleOutlineOutlinedIcon />
                        </IconButton>
                        <span style={{ fontSize: 12 }}>{post.comment_count}</span>
                        <IconButton size='small'>
                            <ShareOutlinedIcon />
                        </IconButton>
                        <span style={{ fontSize: 12 }}>{post.share_count}</span>
                        
                        <IconButton size='small' style={{position:'absolute', right: 20}}>
                            <ShareOutlinedIcon />
                        </IconButton>
                </CardActions>
                <CardActions>
                    <FeedComments post={post}/>
                </CardActions>
            </Drawer>
        )
    }
}

FeedDetail.propTypes = {
    post: PropTypes.object.isRequired,
    open_drawer: PropTypes.bool.isRequired,
    onDrawerClose: PropTypes.func.isRequired
};

export default withStyles(styles)(FeedDetail);