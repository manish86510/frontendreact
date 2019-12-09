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


class Skill extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        profile_skill: [],
        autocomp:{
          skill: [],
        },
        selected:{
          skill: [],
        },
        value: "",
        autocompleteData: []
      }
    }
    
componentDidMount = () => {
    this.getSkillData();
    this.getSkill();

}

retrieveDataAsynchronously(searchText){
  let _this = this;

  // Url of your website that process the data and returns a
  let url = endpoints.skills+`?querystring=${searchText}`;
  
  
  // Configure a basic AJAX request to your server side API
  // that returns the data according to the sent text

  axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.access,
          }
         }).then(res => {
          const autocompleteData = this.state.autocompleteData
            
            for (let i = 0; i < res.data.length; i++) {
              autocompleteData.push(res.data[i])
              }
      
            this.setState({ autocompleteData: autocompleteData }) 
          
        });

  
}

handleSkillChange  = (e) => {
  this.setState({
      value: e.target.value
  });

  /**
   * Handle the remote request with the current text !
   */
  this.retrieveDataAsynchronously(e.target.value);

  console.log("The Input Text has changed to ", e.target.value);
}

getSkill = () => {
  axios.get(endpoints.skills, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
   }).then(res => {
    const skill = this.state.autocomp.skill
      
    for (let i = 0; i < res.data.length; i++) {
      skill.push(res.data[i])
      }

    this.setState({ skill: skill })  
   
  });
}

_editSkill= () => {
  $('.autocompleteSkill').show();
  $('.editSkill').hide();
}


getSkillData = () => {
    axios.get(endpoints.profile_skills, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
      const profile_skill = this.state.profile_skill
        
      for (let i = 0; i < res.data.length; i++) {
        profile_skill.push(res.data[i])
        }
  
      this.setState({ profile_skill: profile_skill })  
     
    });
  }

  handleSkillDelete  = (event) => {
    axios.delete(endpoints.profile_skills + event.currentTarget.parentElement.id+'/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
      "Deleted" 
      window.location.reload();

    })
   
  };

  handleSkillData = (event) => {
    const selected_skill = this.state.selected.skill
    selected_skill.push(
      event.currentTarget.innerText
    )
   }
 

  render() {
    
    const elements_skill = this.state.profile_skill
    const skill_items_ed = []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

    for (let i = 0; i < elements_skill.length; i++) {
      skill_items_ed.push(
        <Chip
        id={elements_skill[i].id}
        label= {elements_skill[i].skill}
        onDelete={this.handleSkillDelete}
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        />
      )
      }


    const elements_sk = this.state.autocomp.skill
    const skill_items = []
    
    for (let i = 0; i < elements_sk.length; i++) {
      skill_items.push(
        { title: elements_sk[i].skill, year: elements_sk[i].skill },
      )
      }  



    return(
        <Grid container spacing={3}>
        <Grid item xs={12}>

    <div class='row editSkill' style={{ position: 'relative', left: 30 }}>
                            
                            {skill_items_ed}


                            <Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
                            <AddIcon style={{color: 'white'}} onClick={this._editSkill}/>
                            </Fab>
                            </div>

                            <div class='autocompleteSkill' style={{ position: 'relative', left: 30, width: 650 }} >
                            
                            <Autocomplete
        multiple
        id="tags-standard"
        options={skill_items}
        getOptionLabel={option => option.title}
        onChange={this.handleSkillData}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="Skills"
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


export default Skill;