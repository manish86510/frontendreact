import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import endpoints from '../../api/endpoints';

const styles = theme => ({
  cardContainer: {
    padding: 10,
  },
  gridItem: {
    display: 'inline-block',
    height: 150,
    margin: 5,
    overflow: 'hidden'
  },
  profile_image: {
    height: '120px',
    width: '130px',
    borderRadius: '25px'
  },
  cover: {
    width: 151,
  },
});


class ProfileCard extends React.Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      user: {},
      selected: {
        interest: [],
        skill: [],
        language: [],
      },
      file: null,

    }
    this.inputOpenFileRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
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

  handleProfilePicChange = event => {
    let formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    var token = localStorage.getItem('access');
    axios.put(endpoints.PROFILE_UPDATE, formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      if(res.status==200){
        window.localStorage.setItem('userInfo', JSON.stringify(res.data));
        this.setState({user: res.data});
      }
    }).catch(e => {

    });
  }

  handleChange = name => event => {
    this.setState({ checkedA: event.target.checked });
  };


  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    const { classes } = this.props;
    const url = 'energeapi.do.viewyoursite.net' + this.state.user.avatar;
    return (
      <Card className={classes.cardContainer}>
        <div style={{ position: 'relative' }}>
          <div className={classes.gridItem}>
            {
              (this.state.userProfile.avatar!=null && this.state.userProfile.avatar!='')?(
                <CardMedia className={classes.media} className={classes.profile_image} onClick={() => {this.inputOpenFileRef.current.click();}}
                image={"https://energeapi.do.viewyoursite.net"+this.state.user.avatar} />
              ):(
              <CardMedia className={classes.media} className={classes.profile_image} onClick={() => {this.inputOpenFileRef.current.click();}}
              image={"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiz5MLzjKvmAhWv4zgGHRbaAd0QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.clevelanddentalhc.com%2Fstaff%2Fsample-avatar%2F&psig=AOvVaw13dJlBGEChBvRy2zeWmGia&ust=1576067980886104"} />
              )

            }

            <input ref={this.inputOpenFileRef} type="file" multiple onChange={this.handleProfilePicChange} style={{ display: "none" }} />
            <a href="#" onClick={this.showOpenFileDlg} disabled={this.state.loading}>Change Profile Photo</a>
          </div>
          <div className={classes.gridItem} style={{ padding: '1px 10px' }}>
            <label>
              Name
                  <IconButton size='small' color="inherit" aria-label="Close">
                <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
              </IconButton>
            </label>
            <div>{this.state.user.first_name}&nbsp;{this.state.user.last_name}</div>
            <br />
            <label>
              Username
                  <IconButton size='small' color="inherit" aria-label="Close">
                <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
              </IconButton>
            </label>
            <div>{this.state.user.username}</div>
          </div>

          <div className={"bioContainer"}>
            <label>
              Bio
                <IconButton size='small' color="inherit" aria-label="Close">
                <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
              </IconButton>
            </label>
            <div>
              {this.state.user.about}
            </div>

            <FormControlLabel
              style={{ position: 'absolute', top: 0, right: 0 }}
              control={
                <Switch
                  checked={this.state.checkedA}
                  onChange={this.handleChange('checkedA')}
                  value="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  color="primary"
                />
              }
              label="Private Profile"
            />
          </div>
        </div>
      </Card>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileCard);