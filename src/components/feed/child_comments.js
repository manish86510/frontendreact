import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import '../../styles/main.css';
// import endpoints from "../../api/endpoints";
// import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
import { ListItem, Avatar } from '@material-ui/core';

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
    
    // loadComments = ()=>{
    //     var getToken = localStorage.getItem('access');
    //     var url = endpoints.post_comments + "?post_id=" + this.props.post.id;
    //     axios.get(
    //         url,
    //         {
    //             headers: {
    //                 Authorization: 'Bearer ' + getToken,
    //             }
    //         }
    //     ).then(res => {
    //         if (res.status == 200) {
    //             this.setState({ comments: res.data });
    //         }
    //         console.log("this.state", this.state);
    //     })
    // }

        // const {childComments} = this.props.childComments;

        // const {childComments} = this.props.childComments;

        // const {childComments} = this.props.childComments;

        // const {childComments} = this.props.childComments;
    // onCommented = (newComment)=>{
    //     this.loadComments();
    //     // debugger;
    //     // let comments = this.state.comments;
    //     // comments.results.splice(0, 0, newComment);
    //     // this.setState({ comments: comments });
    // }

    replyComment = (comment_id)=>{
        this.setState({comment_on_post: comment_id});
        this.setState({childComment:false});
    }

    cancelReply = () =>{
        this.setState({childComment:true});
        this.setState({comment_on_post:45});
    }


    render() {
        return (
            <div style={{width: '100%'}}>
                {
                    this.state.childComments.length>0?(this.state.childComments.map(child_comment=>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={child_comment.user.username} src={"https://energeapi.do.viewyoursite.net/"+child_comment.user.avatar}></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"@"+child_comment.user.username} secondary={
                                <React.Fragment>
                                <Typography>{child_comment.comment}</Typography>
                                {
                                    this.state.comment_on_post===child_comment.id?<CreateComment parent={child_comment.id} cancelReply={this.cancelReply} post={this.state.post}/>:undefined
                                }
                                <ChildComments post={this.state.post} childComments={child_comment.children}/>
                            </React.Fragment>
                            }>
                            </ListItemText>
                            {
                                (this.state.comment_on_post!==child_comment.id && this.state.comment_on_post>-1)?(
                                    <ListItemSecondaryAction>
                                        <Button color="primary" onClick={this.replyComment.bind(this, child_comment.id)}> Reply</Button>
                                    </ListItemSecondaryAction>
                                ): undefined
                            }
                        </ListItem>
                        )):undefined
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