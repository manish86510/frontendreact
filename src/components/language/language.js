import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const $ = require('jquery');


class Language extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        profile_language: [],
        autocomp:{
          language: [],
        },
        selected:{
          language: [],
        }
      }
    }
    
componentDidMount = () => {
    this.getLanguageData();
    this.getLanguage();

}

getLanguage = () => {
  axios.get(endpoints.languages, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
   }).then(res => {
    
    const language = this.state.autocomp.language
      
    for (let i = 0; i < res.data.length; i++) {
      language.push(res.data[i])
      }

    this.setState({ language: language })  
    
  });
}


_editLanguage= () => {
  $('.autocompleteLanguage').show();
  $('.editLanguage').hide();
}

getLanguageData = () => {
    axios.get(endpoints.profile_languages, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
      
      const profile_language = this.state.profile_language
        
      for (let i = 0; i < res.data.length; i++) {
        profile_language.push(res.data[i])
        }
  
      this.setState({ profile_language: profile_language })  
      
    });
  }
  

  handleLanguageDelete  = (event) => {
    axios.delete(endpoints.profile_languages + event.currentTarget.parentElement.id+'/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
      "Deleted" 
      window.location.reload();

    })
   
  };

  handleLanguageData = (event) => {
    const selected_language = this.state.selected.language
    selected_language.push(
      event.currentTarget.innerText
    )
   }



  render() {
    
    const elements_language = this.state.profile_language
    const language_ed = []

    for (let i = 0; i < elements_language.length; i++) {
      language_ed.push(
        <Chip
      //   avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
      id={elements_language[i].id}
      label= {elements_language[i].name}
      onDelete={this.handleLanguageDelete}
        /> 
      )
      }

      const elements_la = this.state.autocomp.language
      const language_items = []
      for (let i = 0; i < elements_la.length; i++) {
        language_items.push(
          { title: elements_la[i].language, year: elements_la[i].language },
        )
        }


    return(
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <div class='row editLanguage' style={{ position: 'relative', left: 30 }}>
{language_ed}
<Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
                            <AddIcon style={{color: 'white'}} onClick={this._editLanguage}/>
                            </Fab>
                         
</div>

<div class='autocompleteLanguage' style={{ position: 'relative', left: 30, width: 500 }} >
                          
                            <Autocomplete
        multiple
        id="tags-standard"
        options={language_items}
        getOptionLabel={option => option.title}
        // defaultValue={[top100Films[13]]}
        onChange={this.handleLanguageData}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="Languages"
            placeholder="Favorites"
            margin="normal"
            fullWidth
          />
        )}
      />
</div>


    </Grid>
    </Grid>
      )
}
}


export default Language;