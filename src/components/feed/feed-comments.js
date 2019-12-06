import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import '../../styles/main.css';
import endpoints from "../../api/endpoints";
import axios from 'axios';
import { Button } from '@material-ui/core';

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
            comments:[]
        };
        this.postComments = this.postComments.bind(this);
        // this.handleToggle = this.handleToggle.bind(this)
            // post_type : this.props.post_type
        }

        componentDidMount() {
            var getToken = localStorage.getItem('access');
            // axios.get(
            //     endpoints.user_comments, { post:this.props.pid }, 
            //     {
            //         headers: {
            //             Authorization: 'Bearer ' + getToken,
            //         }
            //     }
            // ).then(res => {
            //     if (res.status == 200) {
            //         this.setState({
            //             comments: res.data
            //         })
            //         console.log(res.data);
            //     }
            // })
        }

    postComments = (post_id) => { 
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

    handleComment = (tile) => {
        this.setState({
            comment: tile.target.value,
        });
    }

    render() {
        const { classes, comments, pid } = this.props;
        return (
            <div>
                {(comments!=null && comments!=undefined)?(comments.map(comment=> (<p>{comment.comment}</p>))): undefined}
                 <form onSubmit={this.handleSubmit}
                        bsSize="small"
                        className="padb10">
                            <textarea className="textarea"                                                        
                            placeholder="Write a comment..."                                                   
                            value={this.state.comment}
                            onChange={this.handleComment}
                            type="text"></textarea>                                                   
                                <Button variant="contained"  block bsSize="Large"
                                    // onClick={this.postComments.bind(this, pid)}
                                    className="commentbtn" 
                                    type="submit">
                                    Post
                                </Button>                                                                                                                                                                    
                    </form>
            </div>
        );
    }
}

FeedComments.propTypes = {
    pid: PropTypes.object.isRequired
};

export default withStyles(styles)(FeedComments);