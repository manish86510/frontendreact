import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import axios from 'axios';
import AddPost from '../popup/add_post';
import '../../styles/main.css';
import FeedCard from './feed-card';
import endpoints from '../../api/endpoints';
import PostTextArea from '../post_textarea';
import Drawer from '@material-ui/core/Drawer';


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
            postList: [],
            value: 0,
            like_status: false,
            isError: '',
            show:false,
            comment: '',
            parent: '',
            comment_id:0,
        };
        this.handleScroll = this.handleScroll.bind(this);
        }
    componentDidMount() {
        
        var url = endpoints.create_post;
        var getToken = localStorage.getItem('access');
        axios.get(
            url,{page:1},
            {
                headers: {
                    Authorization: 'Bearer ' + getToken,
                }
            }
        ).then(res => {
            debugger;
            if (res.status == 200) {
                console.log(res.data);
                this.setState({
                    postList: res.data,
                });
            }
        })
        window.addEventListener('scroll', this.handleScroll);
    }
      
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      };
      
      handleScroll(event) {
        var feed = document.getElementById("feed_content");
        var scroll_top = feed.scrollTop;
        var windows_height = window.innerHeight;
        var scroll_height = feed.offsetHeight;
        // var scrollPercent = (scroll_height-windows_height)/100;
        var scrollPercent = (scroll_top / scroll_height) * 100;
        if(scrollPercent > 80) {
            console.log('the scroll things', event);
            // this.componentDidMount();
        }
      };

    render() {
        const { classes } = this.props;
        return (
            <div id="feed_content" ref={this.handleScroll}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        {/* <AddPost/> */}
                        <PostTextArea/>
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
                                {this.state.postList.map(post => (
                                        <FeedCard post={post}/>
                                ))}
                            </Grid>                                                     
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(Feed);
