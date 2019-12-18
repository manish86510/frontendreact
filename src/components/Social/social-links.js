import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button, Divider} from '@material-ui/core';
import 'isomorphic-fetch';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


// const $ = require('jquery');

const styles = theme => ({
  root:{
    padding: '10px 10px'
  },
  heading: {
    fontSize: '20px',
    color: '#0f543ec7',
    fontWeight: '700'
  }  
})

class SocialLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPhone: false,
    }
  }

  componentDidMount() {
    
  }

  toggleEdit = ()=>{
    this.setState({
      isEdit: !this.state.isEdit
  });
  }

  

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
      <Typography className={classes.heading}>{this.props.title ? this.props.title : " "}</Typography>
                <div>
                {this.state.isPhone ?
                <div style={{padding:"10px 0px"}}>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={1} md={1} lg={1}>
                                        Mobile
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6}>
                                    <TextField
                                        label="Mobile Number"
                                        id="mobile"
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
                                        <Button className={classes.button} color="secondary" variant="contained" onClick={this.saveMobile} >
                                            Save Changes
                                        </Button>
                                        <Button className={classes.button} variant="contained" onClick={this.togglePhoneEdit}>Cancel</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>:
                 <div>
                    <IconButton aria-label="add" color="primary" onClick={this.togglePhoneEdit}>
                        <AddIcon fontSize="large" />
                    </IconButton>
                    <span style={{ paddingLeft: "10px" }}>Add Phone Number</span>
                </div>}
                </div>
                <Divider />                
       </div>

    )
  }
}

SocialLinks.propTypes = {
  title: PropTypes.string,
};

export default withStyles(styles)(SocialLinks);