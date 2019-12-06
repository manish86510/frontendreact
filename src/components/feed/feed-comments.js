import React from 'react';
import Card from '@material-ui/core/Card';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import '../../styles/main.css';
import endpoints from "../../api/endpoints";
import axios from 'axios';

const styles = theme => ({
    card:{
        marginBottom: 30
    }
});

class FeedComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            value: 0,
            like_status: false,
            isError: '',
            show:false,
            comment: '',
            parent: '',
            comment_id:0,
        };
        this.postComments = this.postComments.bind(this);
        // this.handleToggle = this.handleToggle.bind(this)
            // post_type : this.props.post_type
        }
    postComments = (post_id) => { 
        debugger;
        if(this.state.comment_id == post_id){
            this.setState({show: !this.state.show});    
        }else{
            this.setState({show: true});
        }       
        this.setState( { comment_id: post_id } )
        let self = this;
        var url = endpoints.user_comments;
        var getToken = localStorage.getItem('access');
        axios.post(url, {
            post: post_id,
            comment: self.state.comment,
        },
            {
                headers: {
                    Authorization: 'Bearer ' + getToken
                }
        }).then(res => {
                this.componentDidMount();
        }).catch(res => {
            this.setState({
                isError: "Data not found!"
            });
        });
    }

    render() {
        const { classes, comments, pid } = this.props;
        return (
            <div>
                { comments.map(comment=> (
                <p>{comment.comment}</p>
                ))}
                 <form onSubmit={this.handleSubmit}
                        bsSize="small"
                        className="padb10">                                                       
                            <textarea className="textarea"                                                        
                            placeholder="Write a comment..."                                                   
                            value={this.state.comment}
                            onChange={this.handleComment}
                            type="text"></textarea>                                                   
                                <button block bsSize="Large"
                                    onClick={this.postComments.bind(this, pid)}
                                    className="commentbtn" 
                                    type="submit">
                                    Post
                                </button>                                                                                                                                                                    
                    </form>
            </div>
        );
    }
}

FeedComments.propTypes = {
    comments: PropTypes.object.isRequired,
    pid: PropTypes.object.isRequired
};

export default withStyles(styles)(FeedComments);