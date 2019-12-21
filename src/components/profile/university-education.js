import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import 'isomorphic-fetch';
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { TextField, Button, List, ListItem, ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import endpoints from '../../api/endpoints';

const styles = theme => ({
  root: {
    padding: '10px 10px'
  },
  heading: {
    fontSize: '20px',
    color: '#0f543ec7',
    fontWeight: '700'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: "0px 4px 0px 8px",
  },
  spacing_internal:{
    padding:"10px 0px"
  }

})

class UnivercityEducationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isWork: false,
      isUniversity:false,
      isSchool:false,
      school_college_name:'',
      attended_for: "college",
      educationData:[],
      description:null,
      session_from:null,
      session_to:null,
      profile_education_id:null
    }
  }

  componentDidMount() {
    this.getprofile_education();
  }

  getprofile_education = () =>{
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.profile_education, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      if(res.data.results[0].attended_for==='college'){
        this.setState({ educationData: res.data.results[0] });
      }else{
        this.setState({ educationData: res.data.results[1] });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  toggleWorkCancel = () => {
    this.setState({
      isWork: !this.state.isWork
    });
  }

  toggleWorkEdit = (profile_education_id) => {
    var getToken = localStorage.getItem('access');
    var url = endpoints.profile_education+profile_education_id;
    axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ school_college_name: res.data.school_college_name });
      this.setState({ description: res.data.description });
      this.setState({ profile_education_id: res.data.id });
      this.setState({ session_from: res.data.session_from });
      this.setState({ session_to: res.data.session_to });
      this.setState({ isEdit: true });
      this.setState({ isWork: true });
      this.setState({ attended_for: res.data.attended_for });
      this.getprofile_education();
    }).catch(error => {
      console.log(error);
    });
  }

  toggleAddEducation = () => {
    this.setState({ isWork: !this.state.isWork });
  }


  saveprofile_education = () => {
    var getToken = localStorage.getItem('access');
    var data = {'school_college_name': this.state.school_college_name, 
    'description': this.state.description, 
    'session_from': this.state.session_from,
    'session_to': this.state.session_to,
    'attended_for': this.state.attended_for
    };
      var url = endpoints.profile_education;
      axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isWork: false });
      this.getprofile_education();
    }).catch(error => {
      console.log(error);
    });
  }

  handleCollege = e =>{
    this.setState({
      school_college_name: e.target.value,
    });
  }

  handleDescription = e =>{
    this.setState({
      description: e.target.value,
    });
  }

  handlePosition = e =>{
    this.setState({
      position: e.target.value,
    });
  }

  handleSessionFrom = e =>{
    this.setState({
      session_from: e.target.value,
    });
  }

  handleSessionTo = e =>{
    this.setState({
      session_to: e.target.value,
    });
  }

  handleAttendedFor = e =>{
    this.setState({
      attended_for: e.target.value,
    });
  }

  editprofile_education=(profile_education_id)=>{
    var url = endpoints.profile_education+profile_education_id+'/';
    var getToken = localStorage.getItem('access');
    var data = {'school_college_name': this.state.school_college_name, 
    'description': this.state.description, 
    'session_from': this.state.session_from,
    'session_to': this.state.session_to,
    'attended_for': this.state.attended_for
    };
    axios.put(url,data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isEdit: false });
      this.setState({ isWork: false });
      this.getprofile_education();
    }).catch(error => {
      console.log(error);
    });
  }


  deleteprofile_education=(profile_education_id)=>{
    var url = endpoints.profile_education+profile_education_id;
    var getToken = localStorage.getItem('access');
    axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isEdit: false });
      this.getprofile_education();
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ListItem>
          <ListItemText primary="College Details" />
        </ListItem>
        <List className={classes.list}>
        {
          this.state.educationData!==null?(
              <ListItem key={this.state.educationData.id} role={undefined} dense>
                <ListItemText primary={this.state.educationData.school_college_name} secondary={this.state.educationData.attended_for}/>
                <ListItemSecondaryAction>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {popupState => (
                    <React.Fragment>
                      <IconButton edge="end" variant="contained" color="primary" {...bindTrigger(popupState)}>
                        <MoreVertIcon/>
                      </IconButton>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={this.toggleWorkEdit.bind(this, this.state.educationData.id)}>Edit</MenuItem>
                        <MenuItem onClick={this.deleteprofile_education.bind(this, this.state.educationData.id)}>Delete</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
                </ListItemSecondaryAction>
              </ListItem>
          ): (<div>
              <IconButton aria-label="add" color="primary" onClick={this.toggleAddEducation}>
                <AddBoxOutlinedIcon fontSize="large" />
              </IconButton>
              <span style={{ paddingLeft: "10px" }}>Add College</span>
              </div>)
        }
      </List>

        <Divider />
        {this.state.isWork ?
        <div className={classes.spacing_internal}>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={4} md={4} lg={4}>
                            school_college_name
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                label="school_college_name"
                                id="school_college_name"
                                variant="outlined"
                                size="small"
                                type="text"
                                className={classes.textField}
                                value={this.state.school_college_name}
                                onChange={this.handleCollege}
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={4} md={4} lg={4}>
                            Description
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                label="description"
                                id="description"
                                variant="outlined"
                                size="small"
                                type="text"
                                className={classes.textField}
                                value={this.state.description}
                                onChange={this.handleDescription}
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={4} md={4} lg={4}>
                            Session From
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                label="Session_from"
                                id="session_from"
                                variant="outlined"
                                size="small"
                                type="text"
                                className={classes.textField}
                                value={this.state.session_from}
                                onChange={this.handleSessionFrom}
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={4} md={4} lg={4}>
                            Session To
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                label="Session_to"
                                id="session_to"
                                variant="outlined"
                                size="small"
                                type="text"
                                className={classes.textField}
                                value={this.state.session_to}
                                onChange={this.handleSessionTo}
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={4} md={4} lg={4}>
                            Attended For
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                label="attended_for"
                                id="attended_for"
                                variant="outlined"
                                size="small"
                                type="text"
                                readOnly = {true}
                                className={classes.textField}
                                value="college"
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={4} md={4} lg={4}>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                              {
                                this.state.isEdit===true?(
                                  <Button className={classes.button} color="primary" variant="outlined" onClick={this.editprofile_education.bind(this, this.state.profile_education_id)} >
                                    Save Changes
                                  </Button>
                                ):(
                                  <Button className={classes.button} color="primary" variant="outlined" onClick={this.saveprofile_education} >
                                    Add 
                                  </Button>
                                )
                              }
                                &nbsp;<Button className={classes.button} color="primary" variant="outlined" onClick={this.toggleWorkCancel}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>:undefined
        }        
      </div>
    )
  }
}

export default withStyles(styles)(UnivercityEducationCard);