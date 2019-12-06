import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles} from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import { Button} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Typography from '@material-ui/core/Typography'
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
import InterestData from '../interest/interest';
import SkillData from '../skills/skill';
import LanguageData from '../language/language';
import { toast } from 'react-toastify';
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
        linked_in:'',
        education:'',
        url:'',
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
  
    
}
getUserData = () => {
  axios.get(endpoints.profile_user, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
  }).then(res => {
    const user = this.state.user
    user.name = res.data.first_name+' '+res.data.last_name 
    user.username = res.data.username
    user.bio = res.data.about
    user.email = res.data.email
    user.image = 'https://energeapi.do.viewyoursite.net/'+res.data.avatar
    user.url = res.data.enlarge_url
    
    this.setState({ user });
  });
  axios.get(endpoints.profile_social_links, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
   }).then(res => {
    const user = this.state.user
    user.linked_in = res.data[0].name 
    this.setState({ user });
    
  });
  axios.get(endpoints.profile_education, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
   }).then(res => {
    const user = this.state.user
    user.education = res.data[0].attended_for 
    this.setState({ user });
    
  });
}
  
  handleSubmit= (event) => {
    const inter = this.state.selected.interest
    const sk = this.state.selected.skill
    const lan = this.state.selected.language
    
    if (this.state.selected.interest !== ''){
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
        toast.success("submitted")
      })
    }
    window.location.reload();
    }else if(this.state.selected.skill !== ''){

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
        toast.success("submitted")
        
      })

    } 
    window.location.reload();
     
    }else if(this.state.selected.language !=+ ''){
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
                toast.success("submitted")

      })
    }
    window.location.reload();
  }
      };

  handlePhotoEdit = (event) => {
  
  
  
  }

  handleNameEdit = (event) => {
    // const code = JSON.parse('{ "name" : "'+lan[i]+'" }')

    // axios({
    //   method: 'put',
    //   url: endpoints.profile_user,
    //   data: code,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + localStorage.access,
    //   },
    // }).then(res => {
    //   "submit"
    // })
  }
    render() {
     
  
        return (
         <div>
        <Grid container spacing={3}>
          <Grid item xs={11}>
          <Grid container spacing={7}>
          <Grid item xs={10}><Button variant="outlined" > 
            Cancel
          </Button>
          </Grid><Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Done
          </Button></Grid>
          </Grid>
          <Paper> 
            <br></br>
                {/* <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" className={classes.avatar} /> */}
                <div class='row' style={{  padding: 10,  height:95}} >
                    <div class="col-md-6">
                            <img style={{width: 100, height: 100, borderRadius: '25px'}}  align="left"
                            src={this.state.user.image}>
                            </img>
                            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit}/>
                            </IconButton>
                            <span style={{ padding: 10, fontSize: 12, color: 'grey' }}>
                            Name
                            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} onClick={this.handleNameEdit}/>
                            </IconButton>
                            </span>
                            <br></br>
                            <span style={{ padding: 10, fontSize: 12}}>{this.state.user.name}</span>
                            <br></br>
                            <span style={{ padding: 10, fontSize: 12, color: 'grey' }}>
                            Username
                            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            </span>
                            <br></br>
                            <span style={{ padding: 10, fontSize: 12}}>{this.state.user.username}</span>
                            </div>
                            {/* <div class="col-md-6">
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
                            </div> */}
                            </div>

                            <div class='row' style={{ height: 35, padding: 20, fontSize: 12 }} >
                            Change Profile Photo
                            <IconButton size='small' color="inherit" aria-label="Close" style={{ color: 'grey' }}>
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            </div>
                            <br></br>
                            
                            <div class='row' style={{ height: 45 }} >
                            <span style={{ padding: 20, fontSize: 12, color: 'grey' }}>
                            Bio
                            <IconButton size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                            </span>
                            <br></br>
                            <span style={{ padding: 20, fontSize: 10 }}>{this.state.user.bio}</span>
                            </div>
                            
                            <br></br>
                            <hr></hr>
                           
                          <InterestData/>
                          <br></br>
                          <SkillData/>
                          <br></br>
                          <LanguageData/>
                          <p></p>
<div class='row' style={{ position: 'relative', left: 30 }}>
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
        <Grid item>{this.state.user.linked_in}</Grid>
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
        <Grid item>{this.state.user.education}</Grid>
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
        <Grid item>{this.state.user.url}</Grid>
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