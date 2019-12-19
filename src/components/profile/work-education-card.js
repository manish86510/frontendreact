import React from 'react';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button } from '@material-ui/core';
import 'isomorphic-fetch';
import Divider from '@material-ui/core/Divider';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// const $ = require('jquery');

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

})

class WorkEducationCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isWork: false,
      isUniversity:false,
      isSchool:false,
    }

  }

  componentDidMount() {

  }

  toggleWorkEdit = () => {
    this.setState({
      isWork: !this.state.isWork
    });
  }

  toggleUniversityEdit = () => {
    this.setState({
      isUniversity: !this.state.isUniversity
    });
  }

  toggleSchoolEdit = () => {
    this.setState({
      isSchool: !this.state.isSchool
    });
  }

  saveWorkplace = () => {
    //code for save workplace
  }



  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.heading}>{this.props.title ? this.props.title : " "}</Typography>
        <ListItem>
          <ListItemText primary="Work" />
        </ListItem>
        <Divider />
        {this.state.isWork ?
        <div style={{padding:"10px 0px"}}>
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
                            <TextField
                                label="City/Town"
                                id="city_town"
                                variant="outlined"
                                size="small"
                                type="text"
                                className={classes.textField}
                            />
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
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={1} md={1} lg={1}>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Button className={classes.button} color="secondary" variant="contained" onClick={this.saveWorkplace} >
                                    Save Changes
                                </Button>
                                <Button className={classes.button} variant="contained" onClick={this.toggleWorkEdit}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>:
        <div>
          <IconButton aria-label="add" color="primary" onClick={this.toggleWorkEdit}>
            <AddBoxOutlinedIcon fontSize="large" />
          </IconButton>
          <span style={{ paddingLeft: "10px" }}>Add a workplace</span>
        </div>}        
        <Divider />
        <ListItem>
          <ListItemText primary="Work" />
        </ListItem>
        <Divider />
        {this.state.isUniversity ?
        <div style={{padding:"10px 0px"}}>
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
                            <TextField
                                label="City/Town"
                                id="city_town"
                                variant="outlined"
                                size="small"
                                type="text"
                                className={classes.textField}
                            />
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
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={1} md={1} lg={1}>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Button className={classes.button} color="secondary" variant="contained" onClick={this.saveUniversityData} >
                                    Save Changes
                                </Button>
                                <Button className={classes.button} variant="contained" onClick={this.toggleUniversityEdit}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>:
          <div>
          <IconButton aria-label="add" color="primary" onClick={this.toggleUniversityEdit}>
            <AddBoxOutlinedIcon fontSize="large" />
          </IconButton>
          <span style={{ paddingLeft: "10px" }}>Add a workplace</span>
        </div>}        
        <Divider />
        <ListItem>
          <ListItemText primary="Work" />
        </ListItem>
        <Divider />
        {this.state.isSchool ?
        <div style={{padding:"10px 0px"}}>
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
                            <TextField
                                label="City/Town"
                                id="city_town"
                                variant="outlined"
                                size="small"
                                type="text"
                                className={classes.textField}
                            />
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
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={1} md={1} lg={1}>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Button className={classes.button} color="secondary" variant="contained" onClick={this.saveSchoolData} >
                                    Save Changes
                                </Button>
                                <Button className={classes.button} variant="contained" onClick={this.toggleSchoolEdit}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>:
          <div>
          <IconButton aria-label="add" color="primary" onClick={this.toggleSchoolEdit}>
            <AddBoxOutlinedIcon fontSize="large" />
          </IconButton>
          <span style={{ paddingLeft: "10px" }}>Add a workplace</span>
        </div>}        
        <Divider />
      </div>
    )
  }
}

WorkEducationCard.propTypes = {
  title: PropTypes.string,
};

export default withStyles(styles)(WorkEducationCard);