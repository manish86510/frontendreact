import React from 'react';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import InterestCard from '../interest/interest';
import SkillCard from '../skills/skill';
import SocialLinkCard from '../Social/social-links';
import LanguageCard from '../language/language';
import WorkEducationCard from './work-education-card';
import { withStyles } from '@material-ui/styles';
import ProfileCard from './profile-card';
import Card from '@material-ui/core/Card';
import UnivercityEducationCard from './university-education';
import SchoolEducationCard from './school-education';
import UserDetails from './user-details';

const styles = theme => ({
  marginTop: {
    marginTop: "10px",
  }
});

class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isEditUsername: false,
    }
  }

  componentDidMount = () => {
    this.getUserData();
  }

  getUserData = () => {
    axios.get(endpoints.profile_user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      this.setState({ user: res.data });
    });
  }

  // componentDidMount = () => {
  //   $('.autocompleteInterest').hide();
  //   $('.autocompleteSkill').hide();
  //   $('.autocompleteLanguage').hide();
  //   this.getUserData();
  // }

  // getUserData = () => {
  //   axios.get(endpoints.profile_social_links, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.access,
  //     }
  //   }).then(res => {
  //     const user = this.state.user
  //     user.linked_in = res.data.name
  //     this.setState({ user });
  //   });
  //   axios.get(endpoints.profile_education, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.access,
  //     }
  //   }).then(res => {
  //     const user = this.state.user
  //     user.education = res.data.attended_for
  //     this.setState({ user });

  //   });
  // }

  // handleSubmit = (event) => {
  //   const inter = this.state.selected.interest
  //   const sk = this.state.selected.skill
  //   const lan = this.state.selected.language

  //   if (this.state.selected.interest !== '') {
  //     for (let i = 0; i < inter.length; i++) {
  //       const code = JSON.parse('{ "interest_code" : "' + inter[i] + '" }')
  //       axios({
  //         method: 'post',
  //         url: endpoints.profile_interest,
  //         data: code,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer ' + localStorage.access,
  //         },
  //       }).then(res => {
  //         toast.success("submitted")
  //       })
  //     }
  //     window.location.reload();
  //   } else if (this.state.selected.skill !== '') {

  //     for (let i = 0; i < sk.length; i++) {
  //       const code = JSON.parse('{ "skill" : "' + sk[i] + '" }')
  //       axios({
  //         method: 'post',
  //         url: endpoints.profile_skills,
  //         data: code,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer ' + localStorage.access,
  //         },
  //       }).then(res => {
  //         toast.success("submitted")

  //       })

  //     }
  //     window.location.reload();

  //   } else if (this.state.selected.language !== '') {
  //     for (let i = 0; i < lan.length; i++) {
  //       const code = JSON.parse('{ "name" : "' + lan[i] + '" }')
  //       axios({
  //         method: 'post',
  //         url: endpoints.profile_languages,
  //         data: code,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer ' + localStorage.access,
  //         },
  //       }).then(res => {
  //         toast.success("submitted")

  //       })
  //     }
  //     window.location.reload();
  //   }
  // };

  editUserName = () => {
    this.setState({
      isEditUsername: !this.state.isEditUsername
    });
  }

  render() {
    const { classes } = this.props;
    // const friendInfo = this.props.info;
    return (
      <div>
        {
          this.state.user != null ? (<ProfileCard profile={this.state.user} editUserNameFunc={this.editUserName} />) : undefined
        }
        {this.state.isEditUsername ?
          <Card className={classes.marginTop}>
            <UserDetails
              title="Details About You"
              isUsername={this.state.isEditUsername}
              profile={this.state.user}
              editUserNameFunc={this.editUserName}
            />
          </Card> : ''}
        {/* <Card style={{ marginTop: "10px" }}>
          <CommunicationCard title="Communication Details" />
        </Card> */}

        <Card className={classes.marginTop}>
          <InterestCard title="Interests" />
        </Card>

        <Card className={classes.marginTop}>
          <SkillCard title="Skills" />
        </Card>

        <Card className={classes.marginTop}>
          <LanguageCard title="Languages" />
        </Card>

        <Card className={classes.marginTop}>
          <SocialLinkCard title="Website/Social Links" />
        </Card>

        <Card className={classes.marginTop}>
          <WorkEducationCard title="Work/Education" />
          <UnivercityEducationCard />
          <SchoolEducationCard />
        </Card>
        {/* <Card style={{ padding: "10px", marginTop: "10px" }}>
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
        </Card>*/}

      </div>

    );
  }

}

export default withStyles(styles)(EditProfile);