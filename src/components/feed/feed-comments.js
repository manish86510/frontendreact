import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import '../../styles/main.css';
import endpoints from "../../api/endpoints";
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
import { ListItem, Avatar, List } from '@material-ui/core';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CreateComment from '../Posts/create-comment';
import ChildComments from './child_comments';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    card: {
        marginBottom: 30
    },
    left5: {
        marginLeft: 5
    },
    nested: {
        padding: 0
    }
});

class FeedComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            comment_on_post: 45,
            parentComment: true,
            openChildCommetList: {
                id: 0,
                status: false
            }
        };
    }

    loadComments = () => {
        var getToken = localStorage.getItem('access');
        var url = endpoints.post_comments + "?post_id=" + this.props.post.id;
        axios.get(
            url,
            {
                headers: {
                    Authorization: 'Bearer ' + getToken,
                }
            }
        ).then(res => {
            if (res.status === 200) {
                this.setState({ comments: res.data });
            }
            console.log("this.state", this.state);
        })
    }
    componentDidMount() {
        this.loadComments();
    }

    onCommented = (newComment) => {
        this.loadComments();
        // debugger;
        // let comments = this.state.comments;
        // comments.results.splice(0, 0, newComment);
        // this.setState({ comments: comments });
    }

    replyComment = (comment_id) => {
        this.setState({
            comment_on_post: comment_id,
            parentComment: false
        });
    }

    cancelReply = () => {
        this.setState({
            parentComment: true,
            comment_on_post: 45
        });
    }
    handleExpandMoreClick = (id) => {
        var childCommentexpandMore = {
            id: id,
            status: true
        }
        this.setState({
            openChildCommetList: childCommentexpandMore
        });
    }

    handleExpandLessClick = (id) => {
        var childCommentexpandless = {
            id: id,
            status: false
        }
        this.setState({
            openChildCommetList: childCommentexpandless
        });
    }

    render() {
        const { post, classes } = this.props;
        return (
            <div style={{ width: '100%' }}>
                <List>
                    {(this.state.comments !== null && this.state.comments !== undefined) ? (this.state.comments.results.map(comment => (
                        <div>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={comment.user.username} src={comment.user.avatar}></Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{ paddingRight: "6%" }} primary={"@" + comment.user.username} secondary={

                                    <React.Fragment>
                                        <Typography>{comment.comment}</Typography>
                                        {
                                            this.state.comment_on_post === comment.id ? <CreateComment parent={comment.id} cancelReply={this.cancelReply} post={post} /> : undefined
                                        }
                                        {/* <ChildComments post={post} childComments={comment.children} /> */}
                                    </React.Fragment>
                                }>

                                </ListItemText>
                                {
                                    (this.state.comment_on_post !== comment.id && this.state.comment_on_post > -1) ? (
                                        <ListItemSecondaryAction >
                                            <Button color="primary" onClick={this.replyComment.bind(this, comment.id)}> Reply</Button>
                                            {this.state.openChildCommetList.id === comment.id && this.state.openChildCommetList.status ?
                                                <IconButton size="small" onClick={this.handleExpandLessClick.bind(this, comment.id)}>
                                                    <ExpandLess />
                                                </IconButton> :
                                                <IconButton size="small" onClick={this.handleExpandMoreClick.bind(this, comment.id)}>
                                                    <ExpandMore />
                                                </IconButton>
                                            }
                                        </ListItemSecondaryAction>
                                    ) : undefined
                                }
                            </ListItem>
                            {/* <List className={classes.nested} disablePadding>
                                <ListItem style={{ paddingLeft: "6%" }}>
                                    <ChildComments post={post} childComments={comment.children} />
                                </ListItem>
                            </List> */}
                            <Collapse
                                in={
                                    this.state.openChildCommetList.id === comment.id ?
                                        this.state.openChildCommetList.status : false
                                }
                                timeout="auto"
                                unmountOnExit
                            >
                                <List className={classes.nested} disablePadding>
                                    <ListItem style={{ paddingLeft: "6%" }}>
                                        <ChildComments post={post} childComments={comment.children} />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </div>
                    ))) : undefined
                    }
                </List>
                {
                    this.state.parentComment ? (
                        <CreateComment parent={-1} post={post} onCommented={this.onCommented} />
                    ) : (undefined)
                }
            </div>
        );
    }
}

FeedComments.propTypes = {
    post: PropTypes.object.isRequired
};

export default withStyles(styles)(FeedComments);