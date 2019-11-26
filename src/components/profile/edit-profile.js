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
      },
      interest: {
        skills:'',
        
      }
      }
    }

componentDidMount = () => {
  this.getUserData();
  this.getInterestData(); 

}
getUserData = () => {

  axios.get('https://energeapi.do.viewyoursite.net/2/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token_detail')).access,
    }
  }).then(res => {
    const user = this.state.user
    user.name = res.data.first_name+' '+res.data.last_name 
    user.username = res.data.username
    user.bio = res.data.about
    user.email = res.data.email
    user.skills = 'skill set' 
    // res.data.skills
    user.image = res.data.avatar
    
    this.setState({ user });
  });
}



getInterestData = () => {
  debugger;

  axios.get('https://energeapi.do.viewyoursite.net/user/interest/', {
    headers: {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token_detail')).access,
    }
  }).then(res => {
    const interest = this.state.interest
    interest.skills = res.data.first_name+' '+res.data.last_name 
    
    this.setState({ interest });
  });
}

    render() {
        const handleDelete = () => {
            console.info('You clicked the delete icon.');
          };
        return (
         <div>
        <Grid container spacing={3}>
          <Grid item xs={11}>
          <Grid container spacing={7}>
          <Grid item xs={10}><Button variant="outlined" >
            Cancel
          </Button>
          </Grid><Grid item xs={2}>
          <Button  variant="contained" color="primary" >
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
                            <br></br>
                            <hr></hr>

                            <div class='row' style={{ position: 'relative', left: 30 }}>
                            <span style={{ padding: 10, fontSize: 12}}>
                            Interests
                            </span>
                            </div>
                            <div class='row' style={{ position: 'relative', left: 30 }}>
                            
                            <Chip
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Interests"
        onDelete={handleDelete}
      /> <Chip
      // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
      label="Interests"
      onDelete={handleDelete}
    /> <Chip
    // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
    label="Interests"
    onDelete={handleDelete}
  /> <Chip
  // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="Interests"
  onDelete={handleDelete}
/> <Chip
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Interests"
        onDelete={handleDelete}
      />
      
      <Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
        <AddIcon style={{color: 'white'}}/>
      </Fab>
                            </div>

                            <div class='row' style={{ position: 'relative', left: 30 }}>
                            <span style={{ padding: 10, fontSize: 12}}>
                            Skills
                            </span>
                            </div>
                            <div class='row' style={{ position: 'relative', left: 30 }}>
                            
                            <Chip
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label={this.state.user.skills}
        onDelete={handleDelete}
      />
       <Chip
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Skills"
        onDelete={handleDelete}
      /> <Chip
      // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
      label="Skills"
      onDelete={handleDelete}
    /> <Chip
    // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
    label="Skills"
    onDelete={handleDelete}
  /> <Chip
  // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="Skills"
  onDelete={handleDelete}
/>
<Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
        <AddIcon style={{color: 'white'}}/>
      </Fab>
</div>
<div class='row' style={{ position: 'relative', left: 30 }}>
<span style={{ padding: 10, fontSize: 12}}>
  Languages
</span>
</div>
 
<div class='row' style={{ position: 'relative', left: 30 }}>
  <Chip
  // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="Languages"
  onDelete={handleDelete}
/>
<Chip
  // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="Languages"
  onDelete={handleDelete}
/> <Chip
  // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
  label="Languages"
  onDelete={handleDelete}
/>
<Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
        <AddIcon style={{color: 'white'}}/>
      </Fab>
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