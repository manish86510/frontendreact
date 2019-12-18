import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { PropTypes } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import endpoints from "../../api/endpoints";
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import FeedDetail from './feed-details';
import YoutubePlayer from './youtube-player';

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
    },
    iconColor:{
        color: '#2D3986'
    }
});

class CardAction extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open_post_details: false
        };
    }
    
    handleLike = (post_data) => {
        var my_data={
          post:post_data,
        }
        var url = endpoints.user_like;
        var getToken = localStorage.getItem('access');
        axios.post(
          url, my_data,
          {
            headers: {
              Authorization: 'Bearer ' + getToken,
            }
          }
        ).then(res => {
            // this.props.onLike(this.props.post);
        })
    }

    postDetail = ()=>{
        this.setState({open_post_details: !this.state.open_post_details});
    }

    onDrawerClose = ()=>{
        this.setState({open_post_details: !this.state.open_post_details});
    }

    render() {
        const { classes, post } = this.props;
        var markup = {__html: post.about_post.slice(0, 250).replace(/(?:\r\n|\r|\n)/g, '<br />')+"..."};
        return (
            <div>
            <CardActions style={{padding: '8px 25px'}}>
                    {
                        post.is_like==true?(
                            <IconButton size='small' onClick={this.handleLike.bind(this, post.id)} color="primary">
                                <ThumbUpAltOutlinedIcon/>
                            </IconButton>
                        ):(
                            <IconButton size='small' onClick={this.handleLike.bind(this, post.id)}>
                                <ThumbUpAltOutlinedIcon />
                            </IconButton>
                        )
                    }
                    <span style={{ fontSize: 12 }}>{post.like_count}</span>
                    <IconButton size='small' onClick={this.postDetail}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                    <span style={{ fontSize: 12 }}>{post.comment_count}</span>
                    <IconButton size='small'>
                        <ShareOutlinedIcon />
                    </IconButton>
                    <span style={{ fontSize: 12 }}>{post.share_count}</span>
            </CardActions>
            {
                this.state.open_post_details?(<FeedDetail onDrawerClose={this.onDrawerClose} post={post} open_drawer={true}/>):undefined
            }
            </div>
        );
    }

}

CardAction.propTypes = {
    post: PropTypes.object.isRequired
};

export default withStyles(styles)(CardAction);