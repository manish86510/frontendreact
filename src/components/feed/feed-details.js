import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { PropTypes } from 'prop-types';
import {List, IconButton} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import FeedComments from './feed-comments';
import YoutubePlayer from './youtube-player';
import CardAction from './card_action';
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
        this.setState({open_drawer: !this.state.open_drawer});
        this.props.onDrawerClose();
    }
    // toggleDrower =()=>{
    //     this.setState({
    //         open_drawer:!this.state.open_drawer
    //     });
    // }

    render(){
        const { classes, post } = this.props;
        var markup = {__html: this.props.post.about_post.replace(/(?:\r\n|\r|\n)/g, '<br />')};

        return (
            <Drawer onClose={this.closeDrawer} anchor="right" open={this.state.open_drawer} className={"post-detail"} transitionDuration={{enter: 2000, exit: 1000}}>
                <IconButton size='small' onClick={this.closeDrawer} style={{position:'absolute', top: 5, right: 10}}>
                    <CloseOutlinedIcon/>
                </IconButton>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={post.user.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={post.user.username} secondary={"@"+post.user.username+ " "+post.user.followers_count+" followers"}></ListItemText>
                    </ListItem>
                </List>
                {
                    post.post_media.length>0?(
                        (post.post_media[0].media_type==='youtube' && post.post_media[0].media_url!=null)?(
                            <YoutubePlayer video_url={post.post_media[0].media_url}/> 
                        ):(
                            <CardMedia
                                className={classes.cardMedia}
                                height="220"
                                image={post.post_media[0].file}
                            />
                        )
                    ):(
                        <CardMedia
                            className={classes.cardMedia}
                            height="220"
                            image="https://picsum.photos/seed/picsum/690/388"
                        />
                    )
                }
                <Typography variant="body2" color="textSecondary" component="div" dangerouslySetInnerHTML={markup} style={{padding: '5px 12px'}}/>

                <CardAction post={post}/>
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
    onDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(FeedDetail);