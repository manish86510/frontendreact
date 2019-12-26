import React from 'react';
import { TextareaAutosize, Avatar } from '@material-ui/core';
import '../styles/main.css';
import { withStyles } from '@material-ui/styles';
import { Button, Grid, CircularProgress } from '@material-ui/core'
import axios from 'axios';
import endpoints from '../api/endpoints';
import ImageIcon from '@material-ui/icons/Image';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { PropTypes } from 'prop-types';
import TagFriends from './tag-friends/tag_friends';

const styles = theme => ({
  con: {
    width: "100%",
  },
  button: {
    marginRight: 8,
    float: "right",
  }
});

class PostTextArea extends React.Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      tag_friends: false,
      loading: false,
      userProfile: JSON.parse(localStorage.getItem("userInfo")),
      postData: {
        about_post: "",
        tags: "test",
        is_public: true,
        post_type: "Post",
        target_audience: "test",
        media_id: [],
        tags_friends: [],
      },
      mediaData: {
        post: '',
        file: [],
        file_type: "Image"
      },
      value: '',
      suggestions: [],
      selected: null,
      clear_tags_friends: false,
    }
    this.inputOpenFileRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    for (let i = 0; i < event.target.files.length; i++) {
      this.fileArray.push(URL.createObjectURL(event.target.files[i]));
      let formData = new FormData();
      formData.append('file', event.target.files[i]);
      formData.append('file_type', 'Image');
      var token = localStorage.getItem('access');
      axios.post(endpoints.create_media, formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        let post_data = this.state.postData;
        post_data.media_id.push(res.data.media_id[0]);
        this.setState({ postData: post_data });
        
      }).catch(e => {
        console.log(e);
      });
    }
    this.setState({ file: this.fileArray })
  }

  HandleTextArea = (e) => {
    var postData = { about_post: e.target.value };
    this.setState({
      postData: postData,
    });
    // this.state.postData.about_post = e.target.value;
    // this.setState({
    //   postData: this.state.postData,
    // });
  }

  getUrls = () => {
    var text = this.state.postData.about_post;
    var links = [];
    var urlRegex = /(https?:\/\/[^\s]+)/g;

    text.replace(urlRegex, function (url) {
      if (url.indexOf("youtube") > -1) {
        links.push({
          'url': url,
          'mediaType': 'youtube'
        });
      }
    });
    return links;
  }

  retrivePost = (post_id) => {
    var token = localStorage.getItem('access');
    axios.get(endpoints.POST + post_id, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }).then(res => {
      this.props.onPostCreated(res.data);
    }).catch(e => {
      console.log(e);
    });
  }

  clearForm = () => {
    var postData = {
      about_post: "",
      tags: "test",
      is_public: true,
      post_type: "Post",
      target_audience: "test",
      media_id: [],
      tags_friends: [],
    };
    var mediaData = {
      post: '',
      file: [],
      file_type: "Image"
    };
    this.fileArray=[];
    this.setState({ postData: postData, clear_tags_friends: true, tag_friends: false, mediaData: mediaData, loading: false });
  }

  handlePostCreate = (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    var links = this.getUrls();
    var postData = this.state.postData;
    postData.media = links

    var token = localStorage.getItem('access');
    axios.post(endpoints.create_post, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }).then(res => {
      this.clearForm();
      this.retrivePost(res.data.id);
    }).catch(e => {
      this.setState({ loading: false });
      console.log(e);
    });
  }

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  }

  tagFriendClick = () => {
    let tag = !this.state.tag_friends;
    this.setState({ tag_friends: tag });
  }

  friendListData = (data) => {
    const postData = this.state.postData;
    for (let i = 0; i < data.length; i++) {
      if (this.state.postData.tags_friends.indexOf(data[i].id) === -1) {
        postData.tags_friends.push(data[i].id)
      }
    }
    this.setState({ postData: postData });

  }

  render() {
    // const { classes } = this.props;
    return (
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className={"text-area-container"}>
            <div className={'person-image'}>
              <Avatar src={"https://energeapi.do.viewyoursite.net" + this.state.userProfile.avatar} />
            </div>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Write something..."
              className={"textarea"}
              value={this.state.postData.about_post}
              onChange={this.HandleTextArea}
            />
            <div className={"post-image-thumbnail"}>
              {(this.fileArray || []).map(url => (
                <div className={"image-thumbnail"}>
                  <img src={url} alt="" width="200" />
                </div>
              ))}
            </div>
            <div>
              {this.state.tag_friends ? (<TagFriends friend_list_data={this.friendListData} clear_tags_friends={this.state.clear_tags_friends} />) : undefined}
            </div>
            <div style={{ textAlign: 'right', position: 'relative' }}>
              <input ref={this.inputOpenFileRef} type="file" multiple onChange={this.handleChange} style={{ display: "none" }} />
              <Button variant="contained" color="primary" onClick={this.showOpenFileDlg} disabled={this.state.loading}>
                <ImageIcon />
                &nbsp;
                Photos/Videos
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" onClick={this.tagFriendClick} disabled={this.state.loading}>
                <LocalOfferIcon />
                &nbsp;
                Tag Friends
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" onClick={this.handlePostCreate} disabled={this.state.loading}>
                {
                  this.state.loading ? (<CircularProgress size={15} />) : undefined
                }
                &nbsp;Post
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* <Button variant="contained"  className="mybtn" onClick={this.showOpenFileDlg} style={{ marginBottom:5 }}>Photo/Videos</Button> */}
          <input ref={this.inputOpenFileRef} type="file" multiple onChange={this.handleChange} style={{ visibility: "hidden", width: 20 }} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* <Button variant="contained"  style={{float: 'right'}} color="primary" onClick={this.handlePostCreate}>Post</Button> */}
        </Grid>
      </Grid>
    )
  }
}
PostTextArea.propTypes = {
  onPostCreated: PropTypes.func.isRequired,
};
export default withStyles(styles)(PostTextArea);