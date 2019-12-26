import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import '../../styles/main.css';
// import endpoints from "../../api/endpoints";
// import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
import { ListItem, Avatar, List } from '@material-ui/core';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CreateComment from '../Posts/create-comment';
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
        paddingLeft: theme.spacing * 4
    }
});

class ChildComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            comment_on_post: 45,
            childComment: true,
            post: props.post,
            childComments: this.props.childComments,
            openNestedChildList: {
                id: 0,
                status: false
            }
        };
    }
    state = {
        childComments: [],
    };
    // componentDidMount() {
    //     this.setState({
    //         childComments: this.props.childComments
    //     });
    // }
    replyComment = (comment_id) => {
        this.setState({
            comment_on_post: comment_id,
            childComment: false
        });
    }

    cancelReply = () => {
        this.setState({
            childComment: true,
            comment_on_post: 45
        });
    }

    onChildCommented = (newChildComment) => {
        this.setState({
            childComment: true,
            comment_on_post: 45
        });
        this.props.onCommented();
    }
    // handleExpandMoreClick = (id) => {
    //     console.log("id :", id);
    //     var childCommentexpandMore = {
    //         id: id,
    //         status: true
    //     }
    //     this.setState({
    //         openNestedChildList: childCommentexpandMore
    //     });
    // }

    // handleExpandLessClick = (id) => {
    //     console.log("id :", id);
    //     var childCommentexpandless = {
    //         id: id,
    //         status: false
    //     }
    //     this.setState({
    //         openNestedChildList: childCommentexpandless
    //     });
    // }

    render() {
        console.log(this.state.childComments);
        return (
            <div style={{ width: '100%' }}>
                {
                    this.state.childComments && this.state.childComments !== undefined ? (this.state.childComments.map((child_comment, index) =>
                        <div key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={child_comment.user.username} src={"https://energeapi.do.viewyoursite.net/" + child_comment.user.avatar}></Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{ paddingRight: "6%" }} primary={"@" + child_comment.user.username} secondary={
                                    <React.Fragment>
                                        <Typography component={'span'} variant={'body2'}>{child_comment.comment}</Typography>
                                        {
                                            this.state.comment_on_post === child_comment.id ? <CreateComment parent={child_comment.id} cancelReply={this.cancelReply} post={this.state.post} onChildCommented={this.onChildCommented} /> : undefined
                                        }

                                    </React.Fragment>
                                }>
                                </ListItemText>
                                {
                                    (this.state.comment_on_post !== child_comment.id && this.state.comment_on_post > -1) ? (
                                        <ListItemSecondaryAction>
                                            <Button color="primary" onClick={this.replyComment.bind(this, child_comment.id)}> Reply</Button>
                                            
                                            {/* {
                                                (child_comment.children.length > 0) ?
                                                   this.state.openNestedChildList.id === child_comment.id 
                                                   && 
                                                   this.state.openNestedChildList.status ?
                                                        <IconButton size="small" onClick={this.handleExpandLessClick.bind(this, child_comment.id)}>
                                                            <ExpandLess />
                                                        </IconButton> :
                                                        <IconButton size="small" onClick={this.handleExpandMoreClick.bind(this, child_comment.id)}>
                                                            <ExpandMore />
                                                        </IconButton> :
                                                    <IconButton disabled size="small" onClick={this.handleExpandLessClick.bind(this, child_comment.id)}>
                                                        <ExpandMore />
                                                    </IconButton>
                                            } */}
                                        </ListItemSecondaryAction>
                                    ) : undefined
                                }
                            </ListItem>
                            <List disablePadding>
                                {/* <Collapse
                                    in={
                                        this.state.openNestedChildList.id === child_comment.id ?
                                            this.state.openNestedChildList.status : false
                                    }
                                    timeout="auto"
                                    unmountOnExit
                                > */}
                                    <ListItem style={{ paddingLeft: "8%" }} alignItems="flex-start">
                                        <ChildComments post={this.state.post} onCommented={this.onChildCommented} childComments={child_comment.children} />
                                    </ListItem>
                                {/* </Collapse> */}

                            </List>
                        </div>
                    )) : undefined
                }
            </div>
        );
    }
}

ChildComments.propTypes = {
    childComments: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    onCommented: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChildComments);