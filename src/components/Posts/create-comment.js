import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import '../../styles/main.css';
import endpoints from "../../api/endpoints";
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';


class CreateComment extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            comment_model:{
                post: props.post.id,
                comment: '',
                parent: props.parent,
            }
        };
    }

    postComments = () => {
        var url = endpoints.post_comments;
        var getToken = localStorage.getItem('access');
        axios.post(url, this.state.comment_model,
            {
                headers: {Authorization: 'Bearer ' + getToken}
            }).then(res => {
                let comment_model = {
                    post: this.props.post.id,
                    comment: '',
                    parent: this.props.parent,
                };
                this.setState({comment_model: comment_model});
                this.props.onCommented(res.data);
            }).catch(res => {
                this.setState({
                    isError: "Data not found!"
                });
            });
    }
    handleComment = (event) => {
        let comment_model = this.state.comment_model;
        comment_model.comment = event.target.value;
        this.setState({comment_model: comment_model});
    }

    cancelReply = () =>{
        this.props.cancelReply();
    }
    render() {
        return (
            <div className={"text-area-container"}>
                <TextField label="Type your reply here." 
                    className={"textarea"}
                    multiline 
                    margin="normal"
                    variant="outlined"
                    value={this.state.comment_model.comment}
                    onChange={this.handleComment}
                />
                <div style={{textAlign: 'right', position: 'relative'}}>
                    {this.props.parent===-1?undefined:(
                        <Button color="primary" onClick={this.cancelReply}>Cancel</Button>
                    )}
                    <Button color="primary" disabled={this.state.comment_model.comment.length<=0} 
                    onClick={this.postComments}>Post</Button>
                </div>
            </div>
        );
    }
}

CreateComment.propTypes = {
    post: PropTypes.object.isRequired,
    parent: PropTypes.number.isRequired,
    onCommented: PropTypes.func.isRequired,
};

export default CreateComment;
