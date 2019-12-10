import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, IconButton} from '@material-ui/core';
import { toast } from 'react-toastify';
import 'isomorphic-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';

const $ = require('jquery');

class Interest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_interest: [],
      selected: {
        interest: [],
        newInterest:[],
      },
      value: "",
      autocompleteData: [],
      loading: false,
      isEdit: false,
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

      let url = endpoints.interest + `?querystring=${searchText}`;

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
    // this.setState({loading: true });
    this.setState({
      value: e.target.value
    });

    /**
     * Handle the remote request with the current text !
     */

    // if (e.target.value.length > 2) {
      this.retrieveDataAsynchronously(e.target.value);
    // }
  }

  getInterest = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.my_interest, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      const interest = this.state.selected;
      // for (let i = 0; i < res.data.length; i++) {
      //   interest.push({title:res.data[i].interest_code, id:res.data[i].id})
      // }
      interest.interest = res.data
      this.setState({ interest: interest })
    }).catch(error => {
      console.log(error);
    });
  }

  handleInterestDelete = (event) => {
    axios.delete(endpoints.my_interest + event.currentTarget.parentElement.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      // toast.success("Deleted")
      this.getInterest();
    })

  };

  handleInterestData = (event) => {
    const newInterest = this.state.selected.newInterest;
    newInterest.push({title:event.currentTarget.innerText})
    this.setState({newInterest:newInterest});
  }

  toggleEdit = ()=>{
    this.setState({
      isEdit: !this.state.isEdit
  });
  }

  submit = async()=>{
    const newInterest = this.state.selected.newInterest;
    for (var i = 0; i < newInterest.length; i++) {
      const res =
        await axios
          .post(endpoints.my_interest, JSON.stringify({ "interest_code": newInterest[i].title }), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.access,
            },
          });
    } 
    this.getInterest();
    const emptyNewInterest = this.state.selected;
    emptyNewInterest.newInterest = [];
    this.setState({'isEdit':false, newInterest:emptyNewInterest})   
    
  }

  

  render() {
    const elements_in = this.state.autocompleteData
    const interest_items = []

    for (const [index, value] of elements_in.entries()) {
      interest_items.push(
        { interest_code: value.interest, id:value.id},
      )
    }


    return (
      <div style={{padding: '10px 20px'}}>
      <Grid container spacing={3}>
       {this.state.isEdit == false ?
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="left" alignItems="center">
            <Grid item xs={10} md={10} lg={11}>
            {this.state.selected.interest.map((interest, index) => (
              <Chip id={interest.id} label={interest.interest_code} style={{margin:5}} />
            ))}              
            </Grid>
            <Grid item xs={2} md={2} lg={1}>
              {/* <IconButton aria-label="add" color="primary" onClick={this.toggleEdit}>
                <AddIcon/>
              </IconButton> */}
              <Icon onClick={this.toggleEdit} className="fa fa-plus-circle" style={{ fontSize: 25, float:'right' }} />
            </Grid>
          </Grid>
        </Grid>
       :
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="left" alignItems="center">
            <Grid item xs={10} md={10} lg={11}>
              <Autocomplete
                defaultValue={this.state.selected.interest}
                multiple
                id="interest"
                options={interest_items}
                getOptionLabel={option => option.interest_code}
                onChange={this.handleInterestData}
                isClearable={this.state.selected.interest.some(v => !v.isFixed)}
                // closeIcon={null}
                disableClearable={true}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      id={option.id}
                      label={option.interest_code}
                      {...getTagProps({ option })}
                      onDelete={this.handleInterestDelete}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    onChange={this.handleInterestChange}
                    {...params}
                    variant="outlined"
                    placeholder="Interest"
                    margin="normal"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {this.state.loading ? <CircularProgress color="inherit" size={25} /> : null}
                          {/* {params.InputProps.endAdornment} */}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2} md={2} lg={1}>
              {/* <IconButton color="primary" onClick={this.submit}>
                <AddIcon/>
              </IconButton>
              <IconButton color="primary" onClick={this.toggleEdit}>
                <Close/>
              </IconButton> */}
              <Icon onClick={this.submit} className="fa fa-check" style={{ fontSize: 25, marginLeft:10 }} />
              <Icon onClick={this.toggleEdit} className="fa fa-close" style={{ fontSize: 25, float:'right' }} />
            </Grid>
          </Grid>
         </Grid>
       }
       </Grid>
       </div>

    )
  }
}

export default Interest;