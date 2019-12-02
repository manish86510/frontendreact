import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles} from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import { Button} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';
import { faEdit, faMedal } from '@fortawesome/free-solid-svg-icons'
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Autocomplete from '@material-ui/lab/Autocomplete';

const $ = require('jquery');


const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});


class EditProfile extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        username: '',
        bio:'',
        email:'',
        image:'',
        interest: [],
        skill: [],
        language: [],
      },
      autocomp:{
        interest: [],
        skill: [],
        language: [],
      },
      selected:{
        interest: [],
        skill: [],
        language: [],
      }  
      
      }
    }

componentDidMount = () => {
  $('.autocompleteInterest').hide();
  $('.autocompleteSkill').hide();
  $('.autocompleteLanguage').hide();

  this.getUserData();
  this.getInterestData(); 
  this.getSkillData();
  this.getLanguageData();
  
  this.getInterest();
  this.getSkill();
  this.getLanguage();
    
}
getUserData = () => {
  axios.get(endpoints.profile_user, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
  }).then(res => {
    const user = this.state.user
    user.name = res.data[0].first_name+' '+res.data[0].last_name 
    user.username = res.data[0].username
    user.bio = res.data[0].about
    user.email = res.data[0].email
    user.image = res.data[0].avatar
    this.setState({ user });
  });
}

getInterest = () => {
  axios.get(endpoints.interest, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
   }).then(res => {

    const interest = this.state.autocomp.interest
      
      for (let i = 0; i < res.data.length; i++) {
        interest.push(res.data[i])
        }

      this.setState({ interest: interest }) 
    
  });
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



getInterestData = () => {
  axios.get(endpoints.profile_interest, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
   }).then(res => {
    const interest = this.state.user.interest
      
      for (let i = 0; i < res.data.length; i++) {
        interest.push(res.data[i])
        }

      this.setState({ interest: interest }) 
    
  });
}

getSkillData = () => {
  axios.get(endpoints.profile_skills, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
   }).then(res => {
    const skill = this.state.user.skill
      
    for (let i = 0; i < res.data.length; i++) {
      skill.push(res.data[i])
      }

    this.setState({ skill: skill })  
   
  });
}
getLanguageData = () => {
  axios.get(endpoints.profile_languages, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
   }).then(res => {
    
    const language = this.state.user.language
      
    for (let i = 0; i < res.data.length; i++) {
      language.push(res.data[i])
      }

    this.setState({ language: language })  
    
  });
}


  _editInterest= () => {
    $('.autocompleteInterest').show();
    $('.editInterest').hide();
  
  }
  _editSkill= () => {
    $('.autocompleteSkill').show();
    $('.editSkill').hide();
  }

  _editLanguage= () => {
    $('.autocompleteLanguage').show();
    $('.editLanguage').hide();
  }

  handleInterestDelete  = (event) => {
    axios.delete(endpoints.profile_interest + event.currentTarget.parentElement.id  , {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
       "Deleted"
        window.location.reload();
      })
   
  };


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

  handleInterestData = (event) => {
    const selected_interest = this.state.selected.interest
    selected_interest.push(
      event.currentTarget.innerText
    )
    };

   handleSkillData = (event) => {
    const selected_skill = this.state.selected.skill
    selected_skill.push(
      event.currentTarget.innerText
    )
   }
   handleLanguageData = (event) => {
    const selected_language = this.state.selected.language
    selected_language.push(
      event.currentTarget.innerText
    )
   }

  
  handleSubmit= (event) => {
    const inter = this.state.selected.interest
    const sk = this.state.selected.skill
    const lan = this.state.selected.language
    
    if (this.state.selected.interest != ''){
      for (let i = 0; i < inter.length; i++) {
        const code = JSON.parse('{ "interest_code" : "'+inter[i]+'" }')
        axios({
        method: 'post',
        url: endpoints.profile_interest,
        data: code,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.access,
        },
      }).then(res => {
        "submit" 
      })
    } 
    window.location.reload();
    }else if(this.state.selected.skill != ''){

      for (let i = 0; i < sk.length; i++) {
        const code = JSON.parse('{ "skill" : "'+sk[i]+'" }')
        axios({
        method: 'post',
        url: endpoints.profile_skills,
        data: code,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.access,
        },
      }).then(res => {
        "submit" 
      })

    } 
    window.location.reload();
     
    }else if(this.state.selected.language != ''){
      for (let i = 0; i < lan.length; i++) {
        const code = JSON.parse('{ "name" : "'+lan[i]+'" }')
        axios({
        method: 'post',
        url: endpoints.profile_languages,
        data: code,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.access,
        },
      }).then(res => {
        "submit" 
      })
      
    } 
    window.location.reload();

    }

      };
  
    render() {
      const elements = this.state.user.interest
      const interest_items_ed = []
      
      for (const [index, value] of elements.entries()) {
        interest_items_ed.push(
        <Chip
          // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
          id={value.id}
          label={value.interest_code}
          onDelete={this.handleInterestDelete}
          />
        )
      }


      const elements_in = this.state.autocomp.interest
      const interest_items = []
      
      for (const [index, value] of elements_in.entries()) {
        interest_items.push(
          { title: value.interest, year: value.interest },
           
        )
      }


      const elements_skill = this.state.user.skill
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

      const elements_language = this.state.user.language
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

        
        
        return (
         <div>
        <Grid container spacing={3}>
          <Grid item xs={11}>
          <Grid container spacing={7}>
          <Grid item xs={10}><Button variant="outlined" > 
            Cancel
          </Button>
          </Grid><Grid item xs={2}>
          <Button  variant="contained" color="primary" onClick={this.handleSubmit}>
          Done
          </Button></Grid>
          </Grid>
          <Paper> 
            <br></br>
                {/* <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" className={classes.avatar} /> */}
                <div class='row' style={{  padding: 5,  height:95}} >
                    <div class="col-md-6">
                            <img style={{width: 100, height: 100, borderRadius: '25px'}}  align="left"
                            src={this.state.user.image}>
                            </img>

                            <span style={{ padding: 10, fontSize: 12, color: 'grey' }}>
                            Name
                            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            </span>
                            <p><span style={{ padding: 10, fontSize: 12}}>{this.state.user.name}</span></p>
                            <span style={{ padding: 10, fontSize: 12, color: 'grey' }}>
                            Username
                            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            </span>
        <p><span style={{ padding: 10, fontSize: 12}}>{this.state.user.username}</span></p>
                            </div>
                            <div class="col-md-6">
                           <Typography component="div" style={{position: 'absolute', right: 15}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                              <Grid item>Private Profile</Grid>
                              <Grid item>
                                <AntSwitch
                                  // checked={state.checkedC}
                                  // onChange={handleChange('checkedC')}
                                  value="checkedC"
                                />
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                            </Typography> 
                            </div>
                            </div>

                            <div class='row' style={{ height: 35, padding: 20, fontSize: 12 }} >
                            Change Profile Photo
                            <IconButton size='small' color="inherit" aria-label="Close" style={{ color: 'grey' }}>
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            </div>

                            <div class='row' style={{ height: 45 }} >
                            <span style={{ padding: 20, fontSize: 12, color: 'grey' }}>
                            Bio
                            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            </span>
                            </div>
                            
                            <div class='row' style={{ position: 'absolute', left: 100 }}>
                            <span style={{ fontSize: 10 }}>{this.state.user.bio}</span>
                            </div>
                            <br></br>
                            <hr></hr>
                            {/* <div class='row' style={{ position: 'relative', left: 30 }}>
                            <span style={{ padding: 10, fontSize: 12}}>
                            Interests
                            </span>
                            </div> */}
                            <div class='row editInterest' style={{ position: 'relative', left: 30 }}>
                            {interest_items_ed}
                            <Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
        <AddIcon style={{color: 'white'}} onClick={this._editInterest}/>
      </Fab>
                            </div>
                            
                            <div class='autocompleteInterest' style={{ position: 'relative', left: 30, width: 500 }} >
                            {/* {this._renderCancel} */}
                            <Autocomplete
                        multiple
                        id="interest"
                        options={interest_items}
                        getOptionLabel={option => option.title}
                        // defaultValue={[top100Films[13]]}
                        onChange={this.handleInterestData}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Interest"
                            placeholder="Interest"
                            margin="normal"
                            fullWidth
                            // InputProps={{disableUnderline: true}}
                          />
                          )}
                          />
                     
                    </div>
                    <br></br>
      
                            {/* <div class='row' style={{ position: 'relative', left: 30 }}>
                            <span style={{ padding: 10, fontSize: 12}}>
                            Skills
                            </span>
                            </div> */}
                            <div class='row editSkill' style={{ position: 'relative', left: 30 }}>
                            
                            {skill_items_ed}

                            <Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
                            <AddIcon style={{color: 'white'}} onClick={this._editSkill}/>
                            </Fab>
                            </div>

                            <div class='autocompleteSkill' style={{ position: 'relative', left: 30, width: 500 }} >
                            
                            <Autocomplete
        multiple
        id="tags-standard"
        options={skill_items}
        getOptionLabel={option => option.title}
        // defaultValue={[top100Films[13]]}
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
      <br></br>
     
{/* <div class='row' style={{ position: 'relative', left: 30 }}>
<span style={{ padding: 10, fontSize: 12}}>
  Languages
</span>
</div> */}
 
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

<p></p>
<div class='row' style={{ position: 'relative', left: 30 }}>
{/* <Grid container spacing={3}> */}
          <Grid item xs={6}>
          
        <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                                 Level
                            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            <br></br>
                            </span>
                            <Typography component="div" style={{ padding: 10}}>
    <Grid component="label" container alignItems="center" spacing={1}>
    <Grid item>Professional</Grid>
    <Grid item>
    <AntSwitch
    // checked={state.checkedC}
    // onChange={handleChange('checkedC')}
    value="checkedC"
    />
    </Grid>
<Grid item></Grid>
                            </Grid>
                            </Typography> 
                            </Grid>
                            <Grid item xs={6}>

                            <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                            
                            
                            Linkedin
                            <IconButton size='small' color="inherit" aria-label="Close">
                                            <FontAwesomeIcon icon={faEdit} />
                                            </IconButton>
                            </span>

                            <Typography component="div" style={{ padding: 10}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                              <Grid item>www.linkedin.com</Grid>
                              <Grid item>
                                <AntSwitch
                                  // checked={state.checkedC}
                                  // onChange={handleChange('checkedC')}
                                  value="checkedC"
                                />
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                            </Typography> 

                            
                            </Grid>

          </div>
           <div class='row' style={{ position: 'relative', left: 30 }}>
           <Grid item xs={6}>

           <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                            
                            
            Degree
            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
            </span>
            <Typography component="div" style={{ padding: 10}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                              <Grid item>Bachelour of communications</Grid>
                              <Grid item>
                                <AntSwitch
                                  // checked={state.checkedC}
                                  // onChange={handleChange('checkedC')}
                                  value="checkedC"
                                />
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                            </Typography> 
</Grid>
                            <Grid item xs={6}>
                            <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                            
                            Url
                            <IconButton size='small' color="inherit" aria-label="Close">
                          <FontAwesomeIcon icon={faEdit} />
                          </IconButton>
                            </span>
                            <Typography component="div" style={{ padding: 10}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                              <Grid item>www.jackiechan.com</Grid>
                              <Grid item>
                                <AntSwitch
                                  // checked={state.checkedC}
                                  // onChange={handleChange('checkedC')}
                                  value="checkedC"
                                />
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                            </Typography> 
                              </Grid>

            </div>
            
         <div class='row' style={{ position: 'relative', left: 30 }}>
         <Grid item xs={12}>

         <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                            
            Expertise level
            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
            </span>

<Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
        <AddIcon style={{color: 'white'}}/>
      </Fab>
            <Typography component="div" style={{ padding: 10}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                              <Grid item>Advanced <CheckCircleOutlineIcon style={{color: 'green'}} /> </Grid>
                              <Grid item>
                                <AntSwitch
                                  // checked={state.checkedC}
                                  // onChange={handleChange('checkedC')}
                                  value="checkedC"
                                />
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                            </Typography> 
                            
                            </Grid>
            </div>
                                <div class='row' style={{ position: 'relative', left: 30 }}>
                                <Grid item xs={12}>
                                  


                                <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                                     Expertise level
                              <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            
                            </span>

<Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
        <AddIcon style={{color: 'white'}} />
      </Fab>
                            <Typography component="div" style={{ padding: 10, fontSize: 12 , color:'grey'}}>

                            Upload Qualifications
                            
                            </Typography>

      </Grid>
                            </div>
            <div class='row' style={{ position: 'relative', left: 30 }}> 
            <Grid item xs={12}>

            <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                            
            Phone Number
            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
            </span>
            <Typography component="div" style={{ padding: 10}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                              <Grid item>9876543210</Grid>
                              <Grid item>
                                <AntSwitch
                                  // checked={state.checkedC}
                                  // onChange={handleChange('checkedC')}
                                  value="checkedC"
                                />
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                            </Typography> 
                            </Grid>
            </div>
            <div class='row' style={{ position: 'relative', left: 30 }}>
            <Grid item xs={12}>

            <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
            E-mail
            </span>
            <Typography component="div" style={{ padding: 10}}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                              <Grid item>
                                <ThemeProvider theme={theme}>
                            <TextField
                              height='24px'
                              // className={classes.margin}
                              label={this.state.user.email}
                              variant="outlined"
                              id="mui-theme-provider-outlined-input"
                            />
                          </ThemeProvider>
                                
                                </Grid>
                              <Grid item>
                                <AntSwitch
                                  // checked={state.checkedC}
                                  // onChange={handleChange('checkedC')}
                                  value="checkedC"
                                />
                              </Grid>
                              <Grid item></Grid>
                            </Grid>
                            </Typography> 
                            </Grid>
            </div>
                  
            <div class='row' style={{ position: 'relative', left: 30 }}>
            <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                            
                              Badge Level <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faMedal} />
                            </IconButton>
                            </span>

</div>
                            <div class='row' style={{ position: 'relative', left: 30 }}>
                            <span style={{ padding: 10, fontSize: 12 , color:'grey'}}>
                            
                                        Coins Level
                            </span>
                                        </div>
                                        

                </Paper>   
            </Grid>
            </Grid>
            </div>
        
        );
    }
    
}

export default EditProfile;