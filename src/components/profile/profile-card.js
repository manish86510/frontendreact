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
  cardContainer:{
    padding: 10,
  },
  gridItem:{
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
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      user: {},
      selected:{
        interest: [],
        skill: [],
        language: [],
      
    }
  }
}



componentDidMount = () => {
  this.getUserData();
}
    



getUserData = () => {
  debugger;

  
  axios.get(endpoints.profile_user, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.access,
    }
  }).then(res => {
    debugger;
    this.setState({ user: res.data });

    // user.name = res.data.first_name+' '+res.data.last_name 
    // user.username = res.data.username
    // user.bio = res.data.about
    // user.email = res.data.email
    // user.image = 'https://energeapi.do.viewyoursite.net/'+res.data.avatar
    // user.url = res.data.enlarge_url
    
    // this.setState({ user });
  });

}

  handleChange = name => event => {
    this.setState({ checkedA: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const url = 'energeapi.do.viewyoursite.net'+this.state.user.avatar;
    return (
        <Card className={classes.cardContainer}>
          <div style={{position: 'relative'}}>
            <div className={classes.gridItem}>
                <CardMedia className={classes.media} className={classes.profile_image} 
                image={url}
                // image='https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg'
                 />
                <a href="#">Change Profile Photo</a>
            </div>
            <div className={classes.gridItem} style={{padding: '1px 10px'}}>
                <label>
                  Name
                  <IconButton size='small' color="inherit" aria-label="Close">
                      <FontAwesomeIcon icon={faEdit} onClick={this.handlePhotoEdit} />
                  </IconButton>
                </label>
                <div>{this.state.user.first_name}{this.state.user.last_name}</div>
                <br/>
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
                  style={{position: 'absolute', top:0, right: 0}}
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