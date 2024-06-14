import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  cardContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridItem: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  profile_image: {
    height: 120,
    width: 120,
    borderRadius: '50%',
    cursor: 'pointer',
  },
  userInfo: {
    textAlign: 'left',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontFamily: 'Daikon-Bold',
  },
  button: {
    // marginLeft: theme.spacing(1),
    marginRight: '3%',
  },
  changePhoto: {
    // marginTop: theme.spacing(1),
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    fontFamily:"Daikon-Bold"
  },
  name:{
    fontFamily:"Daikon-Regular"
  }
});

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      user: {},
      file: null,
    };
    this.inputOpenFileRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  handleProfilePicChange = event => {
    let formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    var token = localStorage.getItem('access');
    axios.put(endpoints.profile_update, formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      if (res.status === 200) {
        window.localStorage.setItem('userInfo', JSON.stringify(res.data));
        this.setState({ user: res.data });
      }
    })
    .catch(e => {
      console.error(e);
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  }

  toggleEdit = () => {
    this.props.editUserNameFunc();
  }

  render() {
    const { classes, profile } = this.props;
    return (
      <Card className={classes.cardContainer}>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item className={classes.gridItem}>
            <CardMedia
              className={classes.profile_image}
              image={profile.avatar ? `https://energeapi.do.viewyoursite.net${profile.avatar}` : 'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg'}
              onClick={this.showOpenFileDlg}
            />
            <input
              ref={this.inputOpenFileRef}
              type="file"
              onChange={this.handleProfilePicChange}
              style={{ display: 'none' }}
            />
            <div className={classes.changePhoto} onClick={this.showOpenFileDlg}>
              Change Profile Photo
            </div>
          </Grid>
          <Grid item className={classes.userInfo}>
            <div className={classes.header}>
              <div>
                <div>
                  <span className={classes.label}>Name: </span>
                 <span className={classes.name}> {profile.first_name} {profile.last_name}</span>
                </div>
                <div>
                  <span className={classes.label}>Username: </span>{profile.username}
                </div>
              </div>
              <IconButton aria-label="edit" className={classes.button} onClick={this.toggleEdit}>
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          </Grid>
          {/* <Grid item className={classes.userInfo}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checkedA}
                  onChange={this.handleChange('checkedA')}
                  value="checkedA"
                  color="primary"
                />
              }
              label="Private Profile"
            />
          </Grid> */}
        </Grid>
      </Card>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  editUserNameFunc: PropTypes.func,
};

export default withStyles(styles)(ProfileCard);
