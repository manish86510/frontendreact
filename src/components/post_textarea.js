import React from 'react';
import { TextareaAutosize, Avatar } from '@material-ui/core';
import '../styles/main.css';
import { withStyles } from '@material-ui/styles';
import { Button, Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import endpoints from '../api/endpoints';
import ImageIcon from '@material-ui/icons/Image';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';


const styles = theme => ({
  con: {
    width: "100%",
  },
  button: {
    marginRight: 8,
    float: "right",
  }
});


const languages = [
  {
    name: 'Manish',
  },
  {
    name: 'siteadmin@example.com',
  },
  {
    name: 'ishu',
  },
  {
    name: 'rahul',
  },
  {
    name: 'nitish',
  },
  {
    name: 'sonu_ka',
  },
  {
    name: 'renu',
  },
  {
    name: 'renus',
  },
  {
    name: 'demoUser',
  },
  {
    name: 'postak',
  },
  {
    name: 'Nitin8656',
  },
  {
    name: 'prabhakar',
  },
  {
    name: 'Manish8659',
  },
  {
    name: 'renusingh199',
  }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

class PostTextArea extends React.Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      tag_friends: false,
      postData: {
        about_post: "",
        tags: "test",
        is_public: true,
        post_type: "Post",
        target_audience: "test",
        media_id:[]
      },
      mediaData: {
        post: '',
        file: [],
        file_type: "Image"
      },
      value: '',
      suggestions: [],
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
        this.setState({postData: post_data});
      }).catch(e => {
        console.log(e);
      });
    }
    this.setState({ file: this.fileArray })
  }

  HandleTextArea = (e) => {
    this.state.postData.about_post = e.target.value;
    this.setState({
      postData: this.state.postData,
    });
  }

  handlePostCreate = (event) => {
    event.preventDefault();
    var postData = this.state.postData;

    var token = localStorage.getItem('access');
    axios.post(endpoints.create_post, postData, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }).then(res => {
          alert("Post updated successfully");
    }).catch(e => {
      console.log(e);
    });
  }

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  tagFriendClick = ()=>{
    let tag = !this.state.tag_friends;
    this.setState({tag_friends: tag});
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className={"text-area-container"}>
            <div className={'person-image'}>
              <Avatar src={"https://media4.s-nbcnews.com/j/newscms/2019_25/2907176/190623-south-bend-shooting-pub-cs-1006a_a0b76f34c22ed225bcf4f4b9b607321b.fit-760w.jpg"} />
            </div>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Write something..."
              className={"textarea"}
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
              {
                this.state.tag_friends?(
                  <Autocomplete
                    freeSolo
                    options={languages.map(option => option.name)}
                    renderInput={params => (
                      <TextField {...params} label="Tag Friends" margin="normal" variant="outlined" fullWidth />
                    )}
                  />
                ):undefined
              }
            </div>
            <div style={{textAlign: 'right', position: 'relative'}}>
              <input ref={this.inputOpenFileRef} type="file" multiple onChange={this.handleChange} style={{ display: "none" }} />
              <Button variant="contained" color="primary" onClick={this.showOpenFileDlg}>
                <ImageIcon/>
                &nbsp;
                Photos/Videos
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" onClick={this.tagFriendClick}>
                <LocalOfferIcon/>
                &nbsp;
                Tag Friends
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" onClick={this.handlePostCreate}>Post</Button>
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
export default withStyles(styles)(PostTextArea);