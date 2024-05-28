import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  cardContainer: {
    padding: 10,
  },
  gridItem: {
    display: 'inline-block',
    height: 150,
    // margin: 5,
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
      file: null,
    }
    this.inputOpenFileRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount = () => {
  //   this.getUserData();
  // }

  // getUserData = () => {
  //   axios.get(endpoints.profile_user, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.access,
  //     }
  //   }).then(res => {
  //     this.setState({ user: res.data });
  //   });

  // }

  handleProfilePicChange = event => {
    let formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    var token = localStorage.getItem('access');
    axios.put(endpoints.profile_update, formData, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      if (res.status === 200) {
        window.localStorage.setItem('userInfo', JSON.stringify(res.data));
        this.setState({ user: res.data });
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

  toggleEdit = ()=>{
    this.props.editUserNameFunc();
  }

  render() {
    const { classes, profile } = this.props;
    return (
      <Card className={classes.cardContainer}>
        <div style={{ position: 'relative' }}>
          <div className={classes.gridItem}>
            {
              (profile.avatar !== undefined && profile.avatar) ? (
                <CardMedia
                  className={[classes.media, classes.profile_image]}
                  onClick={() => { this.inputOpenFileRef.current.click(); }}
                  image={"https://energeapi.do.viewyoursite.net" + profile.avatar} />
              ) : (
                  <CardMedia
                    className={[classes.media, classes.profile_image]}
                    onClick={() => { this.inputOpenFileRef.current.click(); }}
                    image={"https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg"} />
                )

            }

            <input
              ref={this.inputOpenFileRef}
              type="file" multiple
              onChange={this.handleProfilePicChange}
              style={{ display: "none" }}
            />
            <a
              href="/#"
              onClick={this.showOpenFileDlg}
              disabled={this.state.loading}>
              Change Profile Photo
            </a>
          </div>
          <div className={classes.gridItem} style={{ padding: '1px 10px' }}>
            <label>
              Name
              <IconButton aria-label="add" color="primary" onClick={this.toggleEdit}>
                <EditIcon fontSize="small" />
              </IconButton>
            </label>
            <div>{profile.first_name}&nbsp;{profile.last_name}</div>
            <br />
            <label>
              Username
            </label>
            <div>{profile.username}</div>
          </div>

          <div className={"bioContainer"}>
            <label>
              Bio
            </label>
            <div>
              {profile.about}
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
  editUserNameFunc: PropTypes.func,
};

export default withStyles(styles)(ProfileCard);