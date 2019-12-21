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
            childComments: props.childComments,
            post: props.post
        };
    }
    componentDidMount(){
        console.log("props.childComments :", this.props.childComments);
        this.setState({
            childComments:this.props.childComments
        });
    }
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


    render() {
        const { classes } = this.props;
        return (
            <div style={{ width: '100%' }}>
                {
                    this.state.childComments.length > 0 ? (this.state.childComments.map(child_comment =>
                        <div>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={child_comment.user.username} src={"https://energeapi.do.viewyoursite.net/" + child_comment.user.avatar}></Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{paddingRight:"6%"}} primary={"@" + child_comment.user.username} secondary={
                                    <React.Fragment>
                                        <Typography>{child_comment.comment}</Typography>
                                        {
                                            this.state.comment_on_post === child_comment.id ? <CreateComment parent={child_comment.id} cancelReply={this.cancelReply} post={this.state.post} /> : undefined
                                        }

                                    </React.Fragment>
                                }>
                                </ListItemText>
                                {
                                    (this.state.comment_on_post !== child_comment.id && this.state.comment_on_post > -1) ? (
                                        <ListItemSecondaryAction>
                                            <Button color="primary" onClick={this.replyComment.bind(this, child_comment.id)}> Reply</Button>
                                        </ListItemSecondaryAction>
                                    ) : undefined
                                }
                            </ListItem>
                            <List disablePadding>
                                <ListItem style={{paddingLeft:"6%"}}>
                                    <ChildComments post={this.state.post} childComments={child_comment.children} />
                                </ListItem>
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
    post: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildComments);