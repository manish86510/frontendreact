import React from 'react';
import SideNav from '../nav'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Avatar, Grow, Divider, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShareAlt, faTag, faCoins, faUsers } from '@fortawesome/free-solid-svg-icons'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';




class EditProfile extends React.Component{

    

    render() {
        const handleDelete = () => {
            console.info('You clicked the delete icon.');
          };
        return (
         <div>
        <Grid container spacing={3}>
          <Grid item xs={11}>
          <Button  style={{borderRadius: '25px', width:'130px'}} variant="outlined" >
            Cancel
            </Button>
            <Button style={{borderRadius: '25px', float:'right', width:'130px'}} variant="contained" color="primary" >
        Done
      </Button>
            <Paper > 
               <p></p>
                    {/* <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" className={classes.avatar} /> */}
                    <div class="row">
                    <div class="col-md-6">
                        
<p>


                            
                            <img style={{width: 100, height: 100, borderRadius: '25px'}}  align="left"
                            src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg">
                            </img>
                            Name<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                            
                            <p>Jackie Chan</p>
                            Username<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                            
                            <p>Jackie Chan</p>
                            </p>
                            </div>
                            <div class="col-md-6">
                            <Typography>
                            <div className='custom-control custom-switch' style={{float : 'right'}}>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                Private Profile
                                </label>
                                </div>

                            </Typography>    
                            </div>
                            </div>
                            Change Profile Photo<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                            <p></p>
                            Bio<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                            
                            <p>Programmer,designer,father,husband
                            </p>
                            <hr></hr>
                            <p>
                            Interests
                            </p>
                            <p>
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
                            </p>
                            <p>
                            Skills
                            </p>
                            <p>
                            <Chip
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Skills"
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

                            </p>
  <p>
      Languages
  </p>
  <p>
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

  </p>
  <p>
            Level
            <div className='custom-control custom-switch' style={{float : 'right'}}>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                Professional
                                </label>
                                </div>
            <p></p>
            Degree
            <div className='custom-control custom-switch' style={{float : 'right'}}>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                Bachelour of communications
                                </label>
                                </div>
            <p></p>
            url
            <div className='custom-control custom-switch' style={{float : 'right'}}>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                www.jackiechan.com
                                </label>
                                </div>
                                <p></p>
            Linkedin
            <div className='custom-control custom-switch' style={{float : 'right'}}>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                www.linkedin.com
                                </label>
                                </div>
            <p></p>
            Expertise level
            <div className='custom-control custom-switch' style={{float : 'right'}}>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                Advanced
                                </label>
                                </div>
            <p></p>
            Expertise level<p></p>
            Phone Number
            <div className='custom-control custom-switch' style={{float : 'right'}}>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                9876541230
                                </label>
                                </div>
            <p></p>
            E-mail
            <div className='custom-control custom-switch' style={{float : 'right'}}>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                aascc@123.com
                                </label>
                                </div>

                                {/* <TextField
    id="filled-secondary"
    label="Filled secondary"
    variant="filled"
    color="secondary"
  /> */}
            
            <p></p>
            Badge Level <i class="fas fa-medal"></i>

<p></p>
            Coins Level<p></p>

  </p>


                </Paper>   
            </Grid>
            </Grid>
            </div>
        
        );
    }
}

export default EditProfile;