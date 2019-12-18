import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { Box, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import '../../styles/main.css';
import FeedCard from './feed-card';
import endpoints from '../../api/endpoints';
import PostTextArea from '../post_textarea';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    conButton: {
        float: "right",
    },
    gridList: {
        listStyleType: "none",
        width: '100%',
        borderRadius: 30
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    content: {
        position: "relative",
        width: "100%",
        top: -50,
        borderRadius: 15,
        paddingBottom: 24
    },

});

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: null,
            value: 0,
            like_status: false,
            isError: '',
            show: false,
            comment: '',
            parent: '',
            comment_id: 0,
            loading: false
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    loadFeed = () =>{
        this.setState({loading: true});
        var url = endpoints.create_post;
        if(this.state.postList!=null){
            url = this.state.postList.next;
        }
        var getToken = localStorage.getItem('access');
        axios.get(
            url,
            {
                headers: {
                    Authorization: 'Bearer ' + getToken,
                }
            }

        ).then(res => {
            if (res.status == 200) {
                var data = this.state.postList;
                if(data!=null){
                    for(var i=0;i<res.data.results.length;i++){
                        data.results.push(res.data.results[i]);
                    }
                    data.count = data.count + res.data.count;
                    data.next = res.data.next;
                    data.previous = res.data.previous;
                    this.setState({
                        postList: data,
                    });
                    window.addEventListener('scroll', this.handleScroll);
                }
                else{
                    this.setState({
                        postList: res.data,
                    });   
                }
                this.setState({loading: false});
            }
        });
    }
    componentDidMount() {
        this.loadFeed();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    onPostCreated = (newPost)=>{
        var posts = this.state.postList;
        posts.results.splice(0, 0, newPost);
        this.setState({postList: posts});
    }

    handleScroll(event) {
        var totalHeight = document.body.scrollHeight;
        var scrollPosition = window.pageYOffset+328;
        var x = (scrollPosition*100)/totalHeight;
        if(x>80){
            this.loadFeed();
            window.removeEventListener('scroll', this.handleScroll);
        }
    };

    retrivePost = (post_id)=>{
        var token = localStorage.getItem('access');
        axios.get(endpoints.POST+post_id, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }).then(res => {
            if (res.status == 200) {
                var data = this.state.postList;
                for(var i=0;i<data.results.length;i++){
                    if(data.results[i].id==post_id){
                        data.results[i] = res.data;
                        break;
                    }
                }
                this.setState({postList: data});
            }
        });
      }
    onLike = (post)=>{
        this.retrivePost(post.id);
    }

    render() {
        const { classes } = this.props;
        return (
            <div id="feed_content" ref={this.handleScroll}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        {/* <AddPost/> */}
                        <PostTextArea onPostCreated={this.onPostCreated} />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box component="div" m={2}>
                            <b>. Feed .</b>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid className={classes.gridList} style={{ borderRadius: 30 }}>
                                {
                                    (this.state.postList != null && this.state.postList != undefined) ? (
                                        this.state.postList.results.map(post => (
                                            <FeedCard post={post} onLike={this.onLike} />
                                        ))
                                    ) : undefined
                                }
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                {
                  this.state.loading?(<center><CircularProgress size={40}/></center>):undefined
                }
            </div>
        );
    }
}


export default withStyles(styles)(Feed);