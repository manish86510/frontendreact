import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TextareaAutosize, Avatar, Paper } from '@material-ui/core';
import '../styles/main.css';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import { Box } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Autosuggest from 'react-autosuggest';

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
      year: 2009
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

class PostTextArea extends React.Component {
    fileObj = [];
    fileArray = [];
    constructor(props) {
        super(props);
        this.state = {
            postData: {
                about_post: "",
                tags: "test",
                is_public: true,
                post_type: "Post",
                target_audience: "test",
                inputFile: "",
                imagePreviewUrl: ""
            },
                value: '',
                suggestions: [],
                file: []
        }
        this.inputOpenFileRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.fileObj.push(event.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })

        {/*this.setState({
            inputFile: event.target.files[0]
          })
       
          let reader = new FileReader();
           
          reader.onloadend = () => {
            this.setState({
              imagePreviewUrl: reader.result
            });
          }
       
          reader.readAsDataURL(event.target.files[0])
        console.log(this.state.inputFile);*/}
    }

    HandleTextArea = (e) => {
        console.log(e.target.value);
        this.state.postData.about_post = e.target.value;
        this.setState({
            postData: this.state.postData,
        });
    }

    handlePostCreate = () => {
        var postData = this.state.postData;
        var getToken = localStorage.getItem('access');
        // console.log("access :",JSON.parse(localStorage.getItem('access')).access);
        axios.post("https://energeapi.do.viewyoursite.net/api/v1/post/",
            postData,
            {
                headers: {
                    Authorization: 'Bearer ' + getToken,
                }
            }
        ).then(result => {
            if (result.status === 200) {
                {this.handleTagCreate()}
            } else {
                this.setState({
                    isError: true
                });
            }
        }).catch(e => {
            this.setState({
                isError: true
            });
        });
        window.location.reload();
    }

    handleTagCreate = () => {
      var postData = this.state.postData;
      var getToken = localStorage.getItem('access');
      // console.log("access :",JSON.parse(localStorage.getItem('access')).access);
      axios.post("https://energeapi.do.viewyoursite.net/api/v1/post/",
          postData,
          {
              headers: {
                  Authorization: 'Bearer ' + getToken,
              }
          }
      ).then(result => {
          if (result.status === 200) {
            
              console.log(result);
          } else {
              this.setState({
                  isError: true
              });
          }
      }).catch(e => {
          this.setState({
              isError: true
          });
      });
      window.location.reload();
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
                        <img src={url} alt="" width="200"/>
                    ))}
                    {/*<img src={this.state.imagePreviewUrl} alt="icon" width="200" alt="" />*/}
                    </div>
                    <div id="tag">
                        <FormGroup controlId = "password"
                            bsSize = "large"
                            className = "padb10" >
                            <Autosuggest 
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps} className="searchuser"/>
                        </FormGroup>
                    </div>
                    <button className="mybtn" onClick={this.showOpenFileDlg}>Photo/Videos</button>
                    <input ref={this.inputOpenFileRef} type="file" multiple onChange={this.handleChange} style={{visibility:"hidden"}}/>
                    <Box component="div" m={1} className={classes.con}>
                        <Fab
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

PostTextArea.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(PostTextArea);