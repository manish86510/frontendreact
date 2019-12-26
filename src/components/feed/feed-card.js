import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { PropTypes } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import YoutubePlayer from './youtube-player';
import CardAction from './card_action';
import FeedDetail from './feed-details';

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

class FeedCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open_post_details: false
        };
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
            <Card className={classes.card}>
                {
                    (post.post_media.length>0)?(
                        (post.post_media[0].media_type==='youtube' && post.post_media[0].media_url!==null)?(
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
                <CardContent className={classes.cardContent}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={post.user.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={post.user.first_name+" "+post.user.last_name} secondary={"@"+post.user.username+" "+ post.user.followers_count +" followers"}></ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton size='small'>
                                <AttachMoneyOutlinedIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Typography variant="body2" color="textSecondary" component="div" style={{padding: '5px 12px'}}>
                        <div dangerouslySetInnerHTML={markup}></div>
                        {
                            post.about_post.length>150?(
                                <Button color="primary" onClick={this.postDetail} >Show More</Button>
                            ):undefined
                        }
                        {
                            this.state.open_post_details?(<FeedDetail onDrawerClose={this.onDrawerClose} post={post} open_drawer={true}/>):undefined
                        }
                    </Typography>
                </CardContent>
                <CardAction post={post}/>
            </Card>
        );
    }
}

FeedCard.propTypes = {
    post: PropTypes.object.isRequired
};

export default withStyles(styles)(FeedCard);