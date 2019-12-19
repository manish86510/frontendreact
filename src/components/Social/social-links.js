import React from 'react';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
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
    this.getInterest();
  }

  debounce_timer = null;

  retrieveDataAsynchronously(searchText) {
    if (this.debounce_timer != null) {
      clearTimeout(this.debounce_timer);
    }
    this.setState({ autocompleteData: [], loading: true });
    this.debounce_timer = setTimeout(() => {

      let url = endpoints.interest + `?search=${searchText}`;

      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.access,
        }
      }).then(res => {

        const autocompleteData = this.state.autocompleteData
        for (let i = 0; i < res.data.results.length; i++) {
          autocompleteData.push(res.data.results[i])
        }

        this.setState({ autocompleteData: autocompleteData, loading: false });
      }).catch((err)=>{
        this.setState({ autocompleteData: [], loading: false });
      });
    }, 500);
  }


  handleInterestChange = (e) => {
    this.setState({
      value: e.target.value
    });

    /**
     * Handle the remote request with the current text !
     */

    if (e.target.value.length > 2) {
      this.retrieveDataAsynchronously(e.target.value);
    }else{
      this.setState({ autocompleteData: [], loading: false });
    }
  }

  getInterest = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.my_interest, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      const selected = this.state.selected;
      if(res.data.length===0 || res.data.length===undefined){
        this.setState({ isEdit: true });
      }else{
        for (let i = 0; i < res.data.length; i++) {
          selected.interest.push({interest_code:res.data[i].interest_code, id:res.data[i].id, created:false})
        }
        this.setState({ selected: selected });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  renderDeleteItem = (value, option) => {
    let selected = this.state.selected;
    selected.interest = value.filter(entry => entry !== option);
    this.setState({ selected: selected });
  }

  handleInterestDelete = (option) => {
    axios.delete(endpoints.my_interest + option.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      this.renderDeleteItem(this.state.selected.interest, option);      
    })
  };

  handleInterestData = (event, value) => {
    const selected = this.state.selected;
    selected.interest = value;
    this.setState({selected:selected});
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