import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import FeedComments from './feed-comments';
import endpoints from "../../api/endpoints";
import axios from 'axios';
import { blue } from '@material-ui/core/colors';

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
    iconActive:{
        color:blue,
    }
});

class FeedCard extends React.Component {
    
    handleLike = (tile) => {
        var my_data={
          post:tile,
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
            console.log("Working");
        })
      }

    render() {
        const { classes, post } = this.props;
        return (
            <Card className={classes.card}>
                {
                    post.post_media.length>0?(
                        <CardMedia
                            // component="img"
                            className={classes.cardMedia}
                            height="220"
                            image={post.post_media[0].file}
                        />
                    ):(
                        <CardMedia
                            // component="img"
                            className={classes.cardMedia}
                            height="220"
                            image="https://picsum.photos/seed/picsum/690/388"
                        />
                    )
                }
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.about_post}
                    </Typography>
                </CardContent>
                <CardActions>
                    
                    {
                        post.like_count>0?(
                            <IconButton size='small' style={{ color: 'blue' }}>
                            <ThumbUpAltOutlinedIcon onClick={this.handleLike.bind(this, post.id)}/>
                            </IconButton>
                        ):(
                            <IconButton size='small'>
                            <ThumbUpAltOutlinedIcon onClick={this.handleLike.bind(this, post.id)}/>
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
                </CardActions>
                <CardActions>
                    <FeedComments pid={post.id} />
                </CardActions>
            </Card>
        );
    }

}

FeedCard.propTypes = {
    post: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedCard);