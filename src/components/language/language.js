import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, IconButton} from '@material-ui/core';
import 'isomorphic-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';

const $ = require('jquery');

class Skill extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: {
        language: [],
        newLanguage:[],
      },
      value: "",
      autocompleteData: [],
      loading: false,
      isEdit: false,
      data:[],
    }

  }

  componentDidMount() {
    this.getLanguage();
    fetch('/data.json')
      .then(res => res.json())
      .then(this.onLoad);
  }

  onLoad = (data) => {
    const self = this;
    self.setState({
      data: data,
    });
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

//   retriveLanguage = (searchText) =>{
//     if (this.debounce_timer != null) {
//       clearTimeout(this.debounce_timer);
//     }
//     this.setState({ autocompleteData: [], loading: true });
//     const autocompleteData = [];
//     let data = this.state.data,
//     searchString = searchText.trim().toLowerCase();
//     this.debounce_timer = setTimeout(() => {
//     if(searchString.length > 2){
//       data.filter(language => {
//         const checkReturn = language.name.toLowerCase().match( searchString );
//         if(checkReturn != null){
//           autocompleteData.push({'name':language.name, 'id':language.id})
//           this.setState({ autocompleteData: autocompleteData, loading: false });
//         }
//       });
//   }else{
//     this.setState({ autocompleteData: [], loading: false });
//   }
// }, 500);
// }

  handleLanguageChange = (e) => {
    // this.setState({loading: true });
    this.setState({
      value: e.target.value
    });

    /**
     * Handle the remote request with the current text !
     */

    // if (e.target.value.length > 2) {
      this.retrieveDataAsynchronously(e.target.value);
    // }
  }

  getLanguage = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.my_languages, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      const language = this.state.selected;
      // for (let i = 0; i < res.data.length; i++) {
      //   interest.push({title:res.data[i].interest_code, id:res.data[i].id})
      // }
      language.language = res.data
      this.setState({ language: language })
    }).catch(error => {
      console.log(error);
    });
  }

  handleLanguageDelete = (event) => {
    axios.delete(endpoints.my_languages + event.currentTarget.parentElement.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      // toast.success("Deleted")
      this.getLanguage();
    })

  };

  handleLanguageData = (event) => {
    const newLanguage = this.state.selected.newLanguage;
    newLanguage.push({language:event.currentTarget.innerText})
    this.setState({newLanguage:newLanguage});
  }

  toggleEdit = ()=>{
    this.setState({
      isEdit: !this.state.isEdit
  });
  }

  submit = async()=>{
    const newLanguage = this.state.selected.newLanguage;
    for (var i = 0; i < newLanguage.length; i++) {
      const data = {
        name:newLanguage[i].language,
        read:"yes",
        write:"yes",
        speak:"yes",
      }
      const res =
        await axios
          .post(endpoints.my_languages, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.access,
            },
          });
    } 
    this.getLanguage();
    const emptyNewLangugage = this.state.selected;
    emptyNewLangugage.newLanguage = [];
    this.setState({'isEdit':false, newLanguage:emptyNewLangugage})   
    
  }

  

  render() {
    const elements_in = this.state.autocompleteData
    const language_items = []

    for (const [index, value] of elements_in.entries()) {
      language_items.push(
        { name: value.language, id:value.id},
      )
    }
    console.log(this.state.autocompleteData)


    return (
      <div style={{padding: '10px 10px'}}>
      <Grid container spacing={3}>
       {this.state.isEdit == false ?
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="left" alignItems="center">
            <Grid item xs={10} md={10} lg={11}>
            {this.state.selected.language.map((language, index) => (
              <Chip id={language.id} label={language.name} style={{margin:5}} />
            ))}              
            </Grid>
            <Grid item xs={2} md={2} lg={1}>
              {/* <IconButton aria-label="add" color="primary" onClick={this.toggleEdit}>
                <AddIcon/>
              </IconButton> */}
              <Icon onClick={this.toggleEdit} className="fa fa-plus-circle" style={{ fontSize: 25, float:'right' }} />
            </Grid>
          </Grid>
        </Grid>
       :
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="left" alignItems="center">
            <Grid item xs={10} md={10} lg={11}>
            <Autocomplete
                defaultValue={this.state.selected.language}
                multiple
                id="interest"
                options={language_items}
                getOptionLabel={option => option.name}
                onChange={this.handleLanguageData}
                // isClearable={this.state.selected.interest.some(v => !v.isFixed)}
                // closeIcon={null}
                disableClearable={true}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      id={option.id}
                      label={option.name}
                      {...getTagProps({ option })}
                      onDelete={this.handleLanguageDelete}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    onChange={this.handleLanguageChange}
                    {...params}
                    variant="outlined"
                    placeholder="Interest"
                    margin="normal"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {this.state.loading ? <CircularProgress color="inherit" size={25} /> : null}
                          {/* {params.InputProps.endAdornment} */}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2} md={2} lg={1}>
              {/* <IconButton color="primary" onClick={this.submit}>
                <AddIcon/>
              </IconButton>
              <IconButton color="primary" onClick={this.toggleEdit}>
                <Close/>
              </IconButton> */}
              <Icon onClick={this.submit} className="fa fa-check" style={{ fontSize: 25, marginLeft:10 }} />
              <Icon onClick={this.toggleEdit} className="fa fa-close" style={{ fontSize: 25, float:'right' }} />
            </Grid>
          </Grid>
         </Grid>
       }
       </Grid>
       </div>

    )
  }
}

export default Skill;