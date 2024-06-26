import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import 'isomorphic-fetch';
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  TextField, Button, List, ListItem, ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import SchoolIcon from '@material-ui/icons/School';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

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
    // marginLeft: theme.spacing(8),
    // marginRight: theme.spacing(8),
    width: '100%',
  },
  button: {
    margin: "0px 4px 0px 8px",
  },
  spacing_internal: {
    padding: "10px 0px"
  }

})

class SchoolEducationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isSchool: false,
      school_college_name: '',
      attended_for: "school",
      educationData: [],
      description: null,
      session_from: null,
      session_to: null,
      profile_education_id: null,
      anchorEl: null,
    }
  }

  componentDidMount() {
    this.getprofile_education();
  }

  getprofile_education = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.profile_education, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      const educationDataList = [];
      for (let i = 0; i < res.data.results?.length; i++) {
        if (res.data.results[i].attended_for === "school") {
          educationDataList.push(res.data.results[i])
        }
      }
      this.setState({ educationData: educationDataList });
    }).catch(error => {
      console.log(error);
    });
  }

  toggleSchoolCancel = () => {
    this.setState({
      isSchool: !this.state.isSchool
    });
  }

  toggleSchoolEdit = (profile_education_id) => {
    this.setState({ anchorEl: null });
    var getToken = localStorage.getItem('access');
    var url = endpoints.profile_education + profile_education_id;
    axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      let from_date = res.data.session_from;
      if (from_date.includes("Z")) {
        from_date = from_date.replace("Z", "")
      }
      let to_date = res.data.session_to;
      if (to_date.includes("Z")) {
        to_date = to_date.replace("Z", "")
      }
      this.setState({
        school_college_name: res.data.school_college_name,
        description: res.data.description,
        profile_education_id: res.data.id,
        session_from: from_date,
        session_to: to_date,
        isEdit: true,
        isSchool: true,
        attended_for: res.data.attended_for
      });
      this.getprofile_education();
    }).catch(error => {
      console.log(error);
    });

  }

  toggleAddEducation = () => {
    this.setState({
      isSchool: !this.state.isSchool,
      school_college_name: null,
      description: null,
      profile_education_id: null,
      session_from: null,
      session_to: null,
      attended_for: "school"
    });
  }


  saveProfileEducation = () => {
    var getToken = localStorage.getItem('access');
    var data = {
      'school_college_name': this.state.school_college_name,
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
      this.setState({ isSchool: false });
      this.getprofile_education();
    }).catch(error => {
      console.log(error);
    });
  }

  handleCollege = e => {
    this.setState({
      school_college_name: e.target.value,
    });
  }

  handleDescription = e => {
    this.setState({
      description: e.target.value,
    });
  }

  handlePosition = e => {
    this.setState({
      position: e.target.value,
    });
  }

  handleSessionFrom = e => {
    this.setState({
      session_from: e.target.value,
    });
  }

  handleSessionTo = e => {
    this.setState({
      session_to: e.target.value,
    });
  }

  handleAttendedFor = e => {
    this.setState({
      attended_for: e.target.value,
    });
  }

  editProfileEducation = (profile_education_id) => {
    var url = endpoints.profile_education + profile_education_id + '/';
    var getToken = localStorage.getItem('access');
    var data = {
      'school_college_name': this.state.school_college_name,
      'description': this.state.description,
      'session_from': this.state.session_from,
      'session_to': this.state.session_to,
      'attended_for': this.state.attended_for
    };
    axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isEdit: false, isSchool: false });
      this.getprofile_education();
    }).catch(error => {
      console.log(error);
    });
  }


  deleteProfileEducation = (profile_education_id) => {
    this.setState({ isSchool: false, anchorEl: null });
    var url = endpoints.profile_education + profile_education_id;
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

  handleSessionToDate = (e) => {
    let to_date = e.target.value;
    this.setState({ session_to: to_date });
  }

  handleSessionFromDate = (e) => {
    let from_date = e.target.value;
    this.setState({ session_from: from_date });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SchoolIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="School Details" />
        </ListItem>
        <List>
          {
            this.state.educationData.length > 0 && this.state.educationData !== null ? (
              this.state.educationData.map(eductionInfo => (
                <ListItem key={eductionInfo.id} role={undefined} dense>
                  <ListItemText primary={eductionInfo.school_college_name} secondary={eductionInfo.attended_for} />
                  <ListItemSecondaryAction>
                    <Button
                      aria-owns={anchorEl ? 'simple-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                    >
                      <MoreVertIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.toggleSchoolEdit.bind(this, eductionInfo.id)}>Edit</MenuItem>
                      <MenuItem onClick={this.deleteProfileEducation.bind(this, eductionInfo.id)}>Delete</MenuItem>
                    </Menu>
                  </ListItemSecondaryAction>
                </ListItem>)
              )) : (<div onClick={this.toggleAddEducation}>
                <IconButton aria-label="add" color="primary">
                  <AddBoxOutlinedIcon fontSize="large" />
                </IconButton>
                <span style={{ paddingLeft: "10px", cursor: 'pointer' }}>Add School</span>
              </div>)
          }
        </List>

        <Divider />
        {this.state.isSchool ?
          <div className={classes.spacing_internal}>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={5} md={5} lg={5}>
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
                    <Grid item xs={5} md={5} lg={5}>
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
                    <Grid item xs={5} md={5} lg={5}>
                      Session From
                            </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <TextField
                        id="date"
                        label="Session From"
                        type="datetime-local"
                        value={this.state.session_from}
                        onChange={this.handleSessionFromDate}
                        className={classes.textField}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                  keyboard
                                  label="Session From"
                                  variant="outlined"
                                  format="DD/MM/YYYY"
                                  placeholder="DD/MM/YYYY"
                                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                  value={this.state.session_from}
                                  onChange={this.handleSessionFromDate}
                                  animateYearScrolling={false}
                                  autoOk
                                  className={classes.textField}
                                  name="session_from"
                                />
                            </MuiPickersUtilsProvider> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={5} md={5} lg={5}>
                      Session To
                            </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <TextField
                        id="date"
                        label="Session To"
                        type="datetime-local"
                        value={this.state.session_to}
                        onChange={this.handleSessionToDate}
                        className={classes.textField}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                  keyboard
                                  label="Session To"
                                  variant="outlined"
                                  format="DD/MM/YYYY"
                                  placeholder="DD/MM/YYYY"
                                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                  value={this.state.session_to}
                                  onChange={this.handleSessionToDate}
                                  animateYearScrolling={false}
                                  autoOk
                                  className={classes.textField}
                                  name="session_from"
                                />
                            </MuiPickersUtilsProvider> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={5} md={5} lg={5}>
                      Attended For
                            </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <TextField
                        label="attended_for"
                        id="attended_for"
                        variant="outlined"
                        size="small"
                        type="text"
                        readOnly={true}
                        className={classes.textField}
                        value={this.state.attended_for}
                        onChange={this.handleAttended_For}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={5} md={5} lg={5}>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      {
                        this.state.isEdit === true ? (
                          <Button className={classes.button} color="primary" variant="outlined" onClick={this.editProfileEducation.bind(this, this.state.profile_education_id)} >
                            Save Changes
                                  </Button>
                        ) : (
                            <Button className={classes.button} color="primary" variant="outlined" onClick={this.saveProfileEducation} >
                              Add
                                  </Button>
                          )
                      }
                      &nbsp;<Button className={classes.button} color="primary" variant="outlined" onClick={this.toggleSchoolCancel}>Cancel</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div> : undefined
        }
      </div>
    )
  }
}

export default withStyles(styles)(SchoolEducationCard);