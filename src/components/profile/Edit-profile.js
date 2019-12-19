import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMedal } from '@fortawesome/free-solid-svg-icons';
import Switch from '@material-ui/core/Switch';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import {
  createMuiTheme,
} from '@material-ui/core/styles';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import InterestCard from '../interest/interest';
import SkillCard from '../skills/skill';
import SocialLinkCard from '../Social/social-links';
import LanguageCard from '../language/language';
import CommunicationCard from './communication-card';
import WorkEducationCard from './work-education-card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import ProfileCard from './profile-card';
import Card from '@material-ui/core/Card';

const $ = require('jquery');

const styles = theme => ({
  margin_top:{
    marginTop: "10px",
  }
});


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});


class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      selected: {
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


    axios.get(endpoints.profile_social_links, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      const user = this.state.user
      user.linked_in = res.data.name
      this.setState({ user });

    });
    axios.get(endpoints.profile_education, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      const user = this.state.user
      user.education = res.data.attended_for
      this.setState({ user });

    });
  }

  handleSubmit = (event) => {
    const inter = this.state.selected.interest
    const sk = this.state.selected.skill
    const lan = this.state.selected.language

    if (this.state.selected.interest !== '') {
      for (let i = 0; i < inter.length; i++) {
        const code = JSON.parse('{ "interest_code" : "' + inter[i] + '" }')
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
    } else if (this.state.selected.skill !== '') {

      for (let i = 0; i < sk.length; i++) {
        const code = JSON.parse('{ "skill" : "' + sk[i] + '" }')
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

    } else if (this.state.selected.language != + '') {
      for (let i = 0; i < lan.length; i++) {
        const code = JSON.parse('{ "name" : "' + lan[i] + '" }')
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

  render() {
    const { classes } = this.props;
    const friendInfo = this.props.info;
    return (
      <div>
        {
          this.state.user != null ? (<ProfileCard profile={this.state.user} />) : undefined
        }
        
        <Card style={{ marginTop: "10px" }}>
          <CommunicationCard title="Communication Details" />
        </Card>

        <Card style={{ marginTop: "10px" }}>
          <InterestCard title="Interests" />
        </Card>

        <Card style={{ marginTop: "10px" }}>
          <SkillCard title="Skills" />
        </Card>

        <Card style={{ marginTop: "10px" }}>
          <LanguageCard title="Languages" />
        </Card>

        <Card style={{ marginTop: "10px" }}>
          <SocialLinkCard title="Website/Social Links" />
        </Card>

        <Card style={{ marginTop: "10px" }}>
          <WorkEducationCard title="Education" />
        </Card>

        {/* <Card style={{ marginTop: "10px" }}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={classes.interest_container}>
                  <label className={classes.interest_heading}>
                    Interests
                    </label>
                </div>
                <div>
                  <InterestData />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.interest_container}>
                  <label className={classes.interest_heading}>
                    Skills
                    </label>
                </div>
                <div>
                  <SkillData />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.interest_container}>
                  <label className={classes.interest_heading}>
                    Languages
                    </label>
                </div>
                <div>
                  <LanguageData />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.cardContainer}>
                  <label>
                    Level
                    <IconButton size='small' color="inherit" aria-label="Close">
                      <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
                    </IconButton>
                  </label>
                </div>
                <div>
                  <FormControlLabel
                    label="Professional"
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        color="primary"
                      />
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.cardContainer}>
                  <label>
                    LinkedIn
                <IconButton size='small' color="inherit" aria-label="Close">
                      <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
                    </IconButton>
                  </label>
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        color="primary"
                      />
                    }
                    label="www.linkedin.com"
                    labelPlacement="start"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.cardContainer}>
                  <label>
                    Degree
                <IconButton size='small' color="inherit" aria-label="Close">
                      <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
                    </IconButton>
                  </label>
                </div>
                <div>
                  <FormControlLabel
                    label="Bachelor of Communications"
                    labelPlacement="start"
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        color="primary"
                      />
                    }
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.cardContainer}>
                  <label>
                    URL
                <IconButton size='small' color="inherit" aria-label="Close">
                      <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
                    </IconButton>
                  </label>
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        color="primary"
                      />
                    }
                    label="www.jackiechan.com"
                    labelPlacement="start"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.cardContainer}>
                  <label>
                    Expertise Level
                <IconButton size='small' color="inherit" aria-label="Close">
                      <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
                    </IconButton>
                  </label>
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        color="primary"
                      />
                    }
                    label="Advanced"
                    labelPlacement="start"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.cardContainer}>
                  <label>
                    Expertise Level
                <IconButton size='small' color="inherit" aria-label="Close">
                      <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
                    </IconButton>
                  </label>
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        color="primary"
                      />
                    }
                    label="www.jackiechan.com"
                    labelPlacement="start"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.cardContainer}>
                  <label>
                    Phone Number
                <IconButton size='small' color="inherit" aria-label="Close">
                      <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
                    </IconButton>
                  </label>
                </div>
                <div className={classes.cardContainer}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        color="primary"
                      />
                    }
                    label="012 345 678 901"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        // onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        color="primary"
                      />
                    }
                    label="Email"
                    labelPlacement="start"
                  />
                </div>
                <div className={classes.cardContainer}>
                  <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                      id="email"
                      label="Email"
                      className={clsx(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                    />
                  </form>
                </div>

              </Grid>
              <Grid item xs={12}>
                <div className={classes.cardContainer}>
                  <label>
                    Badge Level
                  </label>
                </div>
                <div className={classes.cardContainer}>
                  <FontAwesomeIcon icon={faMedal} /> Silver
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.cardContainer}>
                  <label>
                    Coins Level
                  </label>
                </div>
                <div className={classes.cardContainer}>
                  10555 coins
                  <Button variant="contained" color="primary" style={{ float: 'right' }}>
                    Go To Wallet
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Card> */}

      </div>

    );
  }

}

export default withStyles(styles)(EditProfile);