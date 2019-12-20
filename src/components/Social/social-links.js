import React from 'react';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { TextField, Button, List, ListItem, ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import 'isomorphic-fetch';
import IconButton from '@material-ui/core/IconButton';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


// const $ = require('jquery');

const styles = theme => ({
  root:{
    padding: '10px 10px'
  },
  heading: {
    fontSize: '20px',
    color: '#0f543ec7',
    fontWeight: '700'
  },
  list: {
    width: '100%'
  }
})

class SocialLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      loading: false,
      isEdit: false,
      isAdd: false,
      socialLinkData: null,
      name:null,
      url:null,
      social_id:null
    }
  }

  componentDidMount() {
    this.getSocialLinks();
  }

  getSocialLinks = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.profile_social_links, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
        this.setState({ isAdd: false });
        this.setState({ isEdit: false });
        this.setState({ socialLinkData: res.data });
    }).catch(error => {
      console.log(error);
    });
  }

  toggleCancelEdit = () => {
    this.setState({ name: null });
    this.setState({ url: null });
    this.setState({ isEdit: false });
    this.setState({
      isAdd: !this.state.isAdd
    });
  }

  toggleEditAction = (social_id) => {
    var getToken = localStorage.getItem('access');
    var url = endpoints.profile_social_links+social_id;
    axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
        this.setState({ isAdd: true });
        this.setState({ isEdit: true });
        this.setState({ name: res.data.name });
        this.setState({ url: res.data.url });
        this.setState({ social_id: res.data.id });
    }).catch(error => {
      console.log(error);
    });
  }

  saveSocialLinks = () =>{
    var getToken = localStorage.getItem('access');
    if(this.state.isEdit===true){
      var data = {'name': this.state.name, 'url': this.state.url};
      var url = endpoints.profile_social_links+this.state.social_id+'/';
      axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isAdd: false });
      this.setState({ isEdit: false });
      this.getSocialLinks();
    }).catch(error => {
      console.log(error);
    });
    }else{
    var requsetdata = {'name': this.state.name, 'url': this.state.url}
    axios.post(endpoints.profile_social_links, requsetdata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isAdd: false });
      this.setState({ isEdit: false });
      this.getSocialLinks();
    }).catch(error => {
      console.log(error);
    });
    }
  }

  handleName = e => {
    this.setState({
        name: e.target.value,
    });
  }
  
  handleUrl = e => {
    this.setState({
        url: e.target.value,
    });
  }

  deleteLinks=(social_id)=>{
    var url = endpoints.profile_social_links+social_id;
    var getToken = localStorage.getItem('access');
    axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      this.setState({ isEdit: false });
      this.getSocialLinks();
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
      <Typography className={classes.heading}>{this.props.title ? this.props.title : " " }</Typography>
      <List className={classes.list}>
        {
          this.state.socialLinkData!=null?(
            this.state.socialLinkData.results.map(socialData =>(
              <ListItem key={socialData.id} role={undefined} dense>
                <ListItemText primary={socialData.name} secondary={socialData.url}/>
                <ListItemSecondaryAction>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {popupState => (
                    <React.Fragment>
                      <IconButton edge="end" variant="contained" color="primary" {...bindTrigger(popupState)}>
                        <MoreVertIcon/>
                      </IconButton>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={this.toggleEditAction.bind(this, socialData.id)}>Edit</MenuItem>
                        <MenuItem onClick={this.deleteLinks.bind(this, socialData.id)}>Delete</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ): undefined
        }
      </List>
        
      <Grid container spacing={3}>
        <div style={{padding:"10px 0px"}}>
        {this.state.isAdd ?(
           <div>
           <IconButton aria-label="add" color="primary" onClick={this.toggleCancelEdit}>
             <AddBoxOutlinedIcon fontSize="large" />
           </IconButton>
           <span style={{ paddingLeft: "10px" }}>Add Social Links</span>
           <form>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={1} md={1} lg={1}>
                            Name
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            label="name"
                            id="name"
                            variant="outlined"
                            size="small"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleName}
                            className={classes.textField}
                        />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={1} md={1} lg={1}>
                            Links
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            label="Links"
                            id="links"
                            variant="outlined"
                            size="small"
                            type="text"
                            value={this.state.url}
                            onChange={this.handleUrl}
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
                          {
                            this.state.isEdit===true?(
                              <Button className={classes.button} color="primary" variant="contained" onClick={this.saveSocialLinks} >
                              Edit
                              </Button>
                            ):(
                              <Button className={classes.button} color="primary" variant="contained" onClick={this.saveSocialLinks} >
                              Add
                              </Button>
                            )
                          }
                            
                            <Button className={classes.button} color="primary" variant="contained" onClick={this.toggleCancelEdit}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
          </form>
         </div>
        ):(
          <div>
          <IconButton aria-label="add" color="primary" onClick={this.toggleCancelEdit}>
            <AddBoxOutlinedIcon fontSize="large" />
          </IconButton>
          <span style={{ paddingLeft: "10px" }}>Add Social Links</span>
          </div>
        )}
        </div>
       </Grid>
      </div>
    )
  }
}

SocialLinks.propTypes = {
  title: PropTypes.string,
};

export default withStyles(styles)(SocialLinks);