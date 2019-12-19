import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField} from '@material-ui/core';
import 'isomorphic-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// const $ = require('jquery');

const styles = theme => ({
  root:{
    padding: '10px 10px'
  },
  heading: {
    fontSize: '20px',
    color: '#0f543ec7',
    fontWeight: '700'
  }
  
})

class Language extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: {
        language: [],
      },
      value: null,
      autocompleteData: [],
      loading: false,
      isEdit: false,
    }

  }

  componentDidMount() {
    this.getLanguage();
  }

  debounce_timer = null;

  retrieveDataAsynchronously(searchText) {
    if (this.debounce_timer != null) {
      clearTimeout(this.debounce_timer);
    }
    this.setState({ autocompleteData: [], loading: true });
    this.debounce_timer = setTimeout(() => {

      let url = endpoints.languages + `?search=${searchText}`;

      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.access,
        }
      }).then(res => {

        const autocompleteData = this.state.autocompleteData
        for (let i = 0; i < res.data.results.length; i++) {
          autocompleteData.push(res.data.results[i])
        }

        this.setState({ autocompleteData: autocompleteData, loading: false });
      }).catch((err)=>{
        this.setState({ autocompleteData: [], loading: false });
      });
    }, 500);
  }


  handleLanguageChange = (e) => {
    this.setState({
      value: e.target.value
    });

    /**
     * Handle the remote request with the current text !
     */

    if (e.target.value.length > 2) {
      this.retrieveDataAsynchronously(e.target.value);
    }else{
      this.setState({ autocompleteData: [], loading: false });
    }
  }

  getLanguage = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.my_languages, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      const selected = this.state.selected;
      if(res.data.length===0 || res.data.length===undefined){
        this.setState({ isEdit: true });
      }else{
        for (let i = 0; i < res.data.length; i++) {
          selected.language.push({name:res.data[i].name, id:res.data[i].id, created:false})
        }
        this.setState({ selected: selected });
      } 
    }).catch(error => {
      console.log(error);
    });
  }

  renderDeleteItem = (value, option) => {
    let selected = this.state.selected;
    selected.language = value.filter(entry => entry !== option);
    this.setState({ selected: selected });
  }

  handleLanguageDelete = (option) => {
    axios.delete(endpoints.my_languages + option.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      // toast.success("Deleted")
      this.renderDeleteItem(this.state.selected.language, option);      
    })
  };

  handleLanguageData = (event, value) => {
    const selected = this.state.selected;
    selected.language = value;
    this.setState({selected:selected});
  }

  toggleEdit = ()=>{
    this.setState({
      isEdit: !this.state.isEdit
  });
  }

  submit = async()=>{
    const selected = this.state.selected;
    for (var i = 0; i < selected.language.length; i++) {
      if(selected.language[i].created === true){
        const data = {
          name: selected.language[i].name,
          read:"yes",
          speak:"yes",
          write:"yes",
        }
        await axios
          .post(endpoints.my_languages, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.access,
            },
          });
      }      
    } 
    this.setState({'isEdit':false, selected:selected})   
  }
  

  render() {
    const {classes} = this.props;
    const elements_in = this.state.autocompleteData
    const language_items = []

    for (const [value] of elements_in.entries()) {
      if(this.state.selected.language.some(item => value.language === item.name) === false){
        language_items.push(
          { name: value.language, id:-1, created: true},
        )
      }
    }

    return (
      <div className={classes.root}>
      <Typography className={classes.heading}>{this.props.title ? this.props.title : " " }</Typography>
      <Grid container spacing={3}>
       {this.state.isEdit === false ?
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item xs={10} md={10} lg={11}>
              {this.state.selected.language.map((language, index) => (
                <Chip key={'key_my_language_'+language.id} id={language.id} label={language.name} style={{margin:5}} />
              ))}              
            </Grid>    
            <Grid item xs={2} md={2} lg={1}>
              <IconButton aria-label="add" color="primary" onClick={this.toggleEdit} style={{float:'right' }}>
                <AddCircleOutlineIcon fontSize="large"/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
       :
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item xs={10} md={10} lg={10}>
              <Autocomplete
                value={this.state.selected.language}
                multiple
                id="language"
                filterSelectedOptions={true}
                options={language_items}
                getOptionLabel={option => option.name}
                onChange={this.handleLanguageData}
                noOptionsText="Please find your interested language"
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      id={option.id+"_"+option.name}
                      key={'key_language_'+option.id+"_"+option.name}
                      label={option.name}
                      {...getTagProps({ option })}
                      onDelete={()=>{
                        if(option.created === true){
                          this.renderDeleteItem(value, option)
                        }else{
                          // delete from api when option.created==false
                          //call api for delete interest from my interest table
                          if(option.created===false){
                          this.handleLanguageDelete(option, index);
                        }
                        }
                      }}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    onChange={this.handleLanguageChange}
                    {...params}
                    variant="outlined"
                    placeholder="Search Your Languages"
                    margin="normal"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {this.state.loading ? <CircularProgress color="inherit" size={25} /> : null}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
              <div>
                <div style={{float:'left', marginLeft:"45px"}}>
                  <IconButton aria-label="add" color="primary" onClick={this.submit}>
                    <CheckCircleOutlineIcon fontSize="large"/>
                  </IconButton>
                </div>
                <div style={{float:'right'}}>
                  <IconButton aria-label="add" color="primary" onClick={this.toggleEdit}>
                    <HighlightOffIcon fontSize="large"/>
                  </IconButton>  
                </div>
              </div>
            </Grid>
          </Grid>
         </Grid>
       }
       </Grid>
       </div>

    )
  }
}

Language.propTypes = {
  title: PropTypes.string,
};

export default withStyles(styles)(Language);