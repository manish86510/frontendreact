import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import endpoints from "../../api/endpoints";
import axios from 'axios';
import FeedDetail from './feed-details';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        marginBottom: 30,
        borderRadius: 20
    },
    cardMedia: {
        minHeight: 240,
    },
    cardContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        background: '#ffffff',
        marginTop: -20
    },
    iconColor: {
        color: '#2D3986'
    }
});

class CardAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postList: props.post,
            open_post_details: false
        };
    }

    retrivePost = (post_id) => {
        var token = localStorage.getItem('access');
        axios.get(endpoints.POST + post_id, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    postList: res.data,
                });
            }
        });
    }

    handleLike = (post_data) => {
        var my_data = {
            post: post_data,
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
            this.retrivePost(post_data);
        })
    }

    postDetail = () => {
        this.setState({ open_post_details: !this.state.open_post_details });
    }

    onDrawerClose = () => {
        this.setState({ open_post_details: !this.state.open_post_details });
    }

    render() {
        // const { classes } = this.props;
        // var markup = {__html: this.state.postList.about_post.slice(0, 250).replace(/(?:\r\n|\r|\n)/g, '<br />')+"..."};
        return (
            <div>
                <CardActions style={{ padding: '8px 25px' }}>
                    {
                        this.state.postList.is_like === true ? (
                            <IconButton size='small' onClick={this.handleLike.bind(this, this.state.postList.id)} color="primary">
                                <ThumbUpAltOutlinedIcon />
                            </IconButton>
                        ) : (
                            <IconButton size='small' onClick={this.handleLike.bind(this, this.state.postList.id)}>
                                <ThumbUpAltOutlinedIcon />
                            </IconButton>
                        )
                    }
                    <span style={{ fontSize: 12 }}>{this.state.postList.like_count}</span>
                    <IconButton size='small' onClick={this.postDetail}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                    <span style={{ fontSize: 12 }}>{this.state.postList.comment_count}</span>
                    <IconButton size='small'>
                        <ShareOutlinedIcon />
                    </IconButton>
                    <span style={{ fontSize: 12 }}>{this.state.postList.share_count}</span>
                    <Button size='small' onClick={this.props.toggleFormVisibility}>Apply</Button>
                    {/*form button*/}
                </CardActions>
                {
                    this.state.open_post_details ? (<FeedDetail onDrawerClose={this.onDrawerClose} post={this.state.postList} open_drawer={true} />) : undefined
                }
            </div>
        );
    }
}

CardAction.propTypes = {
    post: PropTypes.object.isRequired,
    toggleFormVisibility: PropTypes.func.isRequired, //form visiblity prop type
};

export default withStyles(styles)(CardAction);