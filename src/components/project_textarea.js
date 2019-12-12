import React from 'react';
import { TextareaAutosize, Avatar, Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import endpoints from '../api/endpoints';


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

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class ProjectTextArea extends React.Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        about_post: "",
        tags: "test",
        is_public: true,
        post_type: "Project",
        target_audience: "test",
        inputFile: ""
      },
      media_id:"",
      mediaData: {
        post: '',
        file: [],
        file_type: "Image"
      },
      value: '',
      suggestions: []
    }
    this.inputOpenFileRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    debugger;
    this.fileObj.push(event.target.files)
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
    }
    this.setState({ file: this.fileArray })
  }

  HandleTextArea = (e) => {
    let data = this.state.postData;
    data.about_post = e.target.value;

    this.setState({
      postData: data,
    });
  }

  handlePostCreate = (event) => {
    event.preventDefault();
    var postData = this.state.postData;
    // var result = MyResult(endpoints.create_post, postData, "post");
    // if(result){
    //   console.log(result.data);
      //window.location.reload();
    // }
    // this.state.mediaData.file = this.fileArray;
    // this.state.mediaData.post = result.data.id;
    // var meresult = MyResult(endpoints.create_post, this.state.mediaData);
    var token = localStorage.getItem('access');
    axios.post(endpoints.create_post, postData ,{
      headers:{
        Authorization: 'Bearer ' + token,
      }
    }).then(res => {
      window.location.reload();
      //get_auth_token();
      var token = localStorage.getItem('access');
      this.state.mediaData.file = this.fileArray;
      this.state.mediaData.post = res.data.id;
      //MyResult(endpoints.create_media, this.state.mediaData, "post");
      var mediaInfo = this.state.mediaData;
      axios.post(endpoints.create_media, mediaInfo ,{
        headers:{
          Authorization: 'Bearer ' + token,
        }
      }).then(res => {
        window.location.reload();
      });
    }).catch(e => {
      console.log(e);
    });
  }

  showOpenFileDlg = () => {
    this.setState({
      inputFile: this.inputOpenFileRef.current.click()
    });
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

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
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Tag your friends",
      value,
      onChange: this.onChange
    }
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.Paper}>
          <div className={"text-area-container"}>
            <div className={'person-image'}>
              <Avatar src={"https://media4.s-nbcnews.com/j/newscms/2019_25/2907176/190623-south-bend-shooting-pub-cs-1006a_a0b76f34c22ed225bcf4f4b9b607321b.fit-760w.jpg"} />
            </div>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Write something..."
              className={"post-text-area"}
              onChange={this.HandleTextArea}
            />
          </div>
          <div id="images">
            {(this.fileArray || []).map(url => (
              <img src={url} alt="" width="200" />
            ))}
          </div>
          <div id="tag">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps} className="searchuser" />
          </div>
          <Button variant="contained"  className="mybtn" onClick={this.showOpenFileDlg} style={{ marginBottom:5 }}>Photo/Videos</Button>
          
          <input ref={this.inputOpenFileRef} type="file" multiple onChange={this.handleChange} style={{ visibility: "hidden", width: 20 }} />
          <Box component="div" m={1} className={classes.con}>
            <Fab
              style={{ width: '100%', height: 30, borderRadius: 5 }}
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              className={classes.button}
              onClick={this.handlePostCreate}>
              Post
            </Fab>
          </Box>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ProjectTextArea);