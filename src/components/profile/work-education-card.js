import React from 'react';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
// import { Field } from 'redux-form/immutable';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import 'isomorphic-fetch';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {
  TextField, Button, List, ListItem, ListItemSecondaryAction,
  ListItemText, Select, FormControl
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import endpoints from '../../api/endpoints';
// import UnivercityEducationCard from './university-education';
// import SchoolEducationCard from './school-education';
import BusinessIcon from '@material-ui/icons/Business';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


// const $ = require('jquery');

const styles = theme => ({
  root: {
    padding: '10px 0px'
  },
  heading: {
    padding: '0px 10px',
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
  spacing_internal: {
    padding: "10px 0px"
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },

})

class WorkEducationCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isWork: false,
      isUniversity: false,
      isSchool: false,
      company: '',
      isEdit: false,
      companyData: [],
      city: null,
      position: null,
      workplace_id: null,
      all_city: [],
    }
  }

  componentDidMount() {
    this.getWorkplace();
    this.getAllCity();
  }

  getWorkplace = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.WORKPLACE, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ companyData: res.data.results });
    }).catch(error => {
      console.log(error);
    });
  }

  toggleWorkCancel = () => {
    this.setState({
      isWork: !this.state.isWork
    });
  }

  toggleWorkEdit = (workplace_id) => {
    var getToken = localStorage.getItem('access');
    var url = endpoints.WORKPLACE + workplace_id;
    axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ company: res.data.name });
      this.setState({ city: res.data.city });
      this.setState({ position: res.data.position });
      this.setState({ isEdit: true });
      this.setState({ isWork: true });
      this.setState({ workplace_id: res.data.id });
      this.getWorkplace();
    }).catch(error => {
      console.log(error);
    });
  }

  toggleWorkAdd = () => {
    this.setState({ isWork: !this.state.isWork });
  }

  toggleUniversityEdit = () => {
    this.setState({
      isUniversity: !this.state.isUniversity
    });
  }

  saveWorkplace = () => {
    var getToken = localStorage.getItem('access');
    var data = { 'name': this.state.company, 'position': this.state.position, 'city': this.state.city, 'description': null, 'working_from': '2019-01-01 06:00:00', 'working_till': '2019-01-01 06:00:00' };
    var url = endpoints.WORKPLACE;
    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isWork: false });
      this.getWorkplace();
    }).catch(error => {
      console.log(error);
    });
  }

  handleCompany = e => {
    this.setState({
      company: e.target.value,
    });
  }

  handleCity = e => {
    this.setState({
      city: e.target.value,
    });
  }

  handlePosition = e => {
    this.setState({
      position: e.target.value,
    });
  }

  editWorkplace = (workplace_id) => {
    var url = endpoints.WORKPLACE + workplace_id + '/';
    var getToken = localStorage.getItem('access');
    var data = { 'name': this.state.company, 'position': this.state.position, 'city': this.state.city, 'description': null, 'working_from': '2019-01-01 06:00:00', 'working_till': '2019-01-01 06:00:00' };
    axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isEdit: false });
      this.setState({ isWork: false });
      this.getWorkplace();
    }).catch(error => {
      console.log(error);
    });
  }


  deleteWorkplace = (workplace_id) => {
    var url = endpoints.WORKPLACE + workplace_id;
    var getToken = localStorage.getItem('access');
    axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isEdit: false });
      this.getWorkplace();
    }).catch(error => {
      console.log(error);
    });
  }

  handleCityChange = event => {
    this.setState({ city: event.target.value })
  };

  getAllCity = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.all_city, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ all_city: res.data.results });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const { classes } = this.props;
    console.log("test :", this.state.companyData);
    return (
      <div className={classes.root}>
        <Typography className={classes.heading}>{this.props.title ? this.props.title : " "}</Typography>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BusinessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work Place" />
        </ListItem>
        <List className={classes.list}>
          {
            this.state.companyData.length > 0 && this.state.companyData !== null ? (
              this.state.companyData.map(companyInfo => (
                <ListItem key={companyInfo.id} role={undefined} dense>
                  <ListItemText primary={companyInfo.name} secondary={companyInfo.position} />
                  <ListItemSecondaryAction>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {popupState => (
                        <React.Fragment>
                          <IconButton edge="end" variant="contained" color="primary" {...bindTrigger(popupState)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={this.toggleWorkEdit.bind(this, companyInfo.id)}>Edit</MenuItem>
                            <MenuItem onClick={this.deleteWorkplace.bind(this, companyInfo.id)}>Delete</MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (<div>
              <IconButton aria-label="add" color="primary" onClick={this.toggleWorkAdd}>
                <AddBoxOutlinedIcon fontSize="large" />
              </IconButton>
              <span style={{ paddingLeft: "10px" }}>Add a workplace</span>
            </div>)
          }
        </List>
        <Divider />
        {/* <UnivercityEducationCard /> */}
        {/* <SchoolEducationCard /> */}

        {this.state.isWork ?
          <div className={classes.spacing_internal}>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={1} md={1} lg={1}>
                      Company
                            </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <TextField
                        label="Company"
                        id="company"
                        variant="outlined"
                        size="small"
                        type="text"
                        className={classes.textField}
                        value={this.state.company}
                        onChange={this.handleCompany}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={1} md={1} lg={1}>
                      City/Town
                            </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">
                          City
                        </InputLabel>
                        <Select
                          labelId="city"
                          id="city"
                          value={this.state.city}
                          onChange={this.handleCityChange}
                          // labelWidth={labelWidth}
                        >
                          <MenuItem value=""><em>None</em></MenuItem>
                          {this.state.all_city != undefined ?
                            this.state.all_city.map((item, index) => <MenuItem id={index} key={index} value={item.city_code}>{item.city_name}</MenuItem>) : (<MenuItem value="">None</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                      {/* <TextField
                                label="City/Town"
                                id="city_town"
                                variant="outlined"
                                size="small"
                                type="text"
                                className={classes.textField}
                                value={this.state.city}
                                onChange={this.handleCity}
                            /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={1} md={1} lg={1}>
                      Position
                            </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <TextField
                        label="Position"
                        id="position"
                        variant="outlined"
                        size="small"
                        type="text"
                        className={classes.textField}
                        value={this.state.position}
                        onChange={this.handlePosition}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={1} md={1} lg={1}>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      {
                        this.state.isEdit === true ? (
                          <Button className={classes.button} color="primary" variant="outlined" onClick={this.editWorkplace.bind(this, this.state.workplace_id)} >
                            Save Changes
                                  </Button>
                        ) : (
                            <Button className={classes.button} color="primary" variant="outlined" onClick={this.saveWorkplace} >
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
          </div> : undefined
        }
      </div>
    )
  }
}

WorkEducationCard.propTypes = {
  title: PropTypes.string,
};

export default withStyles(styles)(WorkEducationCard);