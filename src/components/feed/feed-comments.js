import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import '../../styles/main.css';
import endpoints from "../../api/endpoints";
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
import { ListItem, Avatar, TextField, List } from '@material-ui/core';

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

class FeedComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            comment_on_post: 45
        };
    }

    componentDidMount() {
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
            if (res.status == 200) {
                this.setState({ comments: res.data });
            }
            console.log("this.state", this.state);
        })
    }

    replyComment = (comment_id)=>{
        this.setState({comment_on_post: comment_id});
    }

    render() {
        const {post} = this.props;
        return (
            <div style={{width: '100%'}}>
                <List>
                    {(this.state.comments != null && this.state.comments != undefined) ? (this.state.comments.results.map(comment =>
                        (
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="@Site Admin" secondary={
                                    <React.Fragment>
                                        <Typography>{comment.comment}</Typography>
                                        {
                                            this.state.comment_on_post==comment.id?<CreateComment parent={comment.id} post={post}/>:undefined
                                        }
                                    </React.Fragment>
                                }>

                                </ListItemText>
                                {
                                    (this.state.comment_on_post!=comment.id && this.state.comment_on_post>-1)?(
                                        <ListItemSecondaryAction>
                                            <Button color="primary" onClick={this.replyComment.bind(this, comment.id)}> Reply</Button>
                                        </ListItemSecondaryAction>
                                    ): undefined
                                }
                            </ListItem>
                        )
                    )) : undefined}
                </List>
                {
                    this.state.comment_on_post<0?<CreateComment parent={-1} post={post}/>:undefined
                }

            </div>
        );
    }
}

FeedComments.propTypes = {
    post: PropTypes.object.isRequired
};

export default withStyles(styles)(FeedComments);