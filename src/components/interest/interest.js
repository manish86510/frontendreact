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
      selected: {
        interest: [],
      },
      value: null,
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
      for (let i = 0; i < res.data.length; i++) {
        selected.interest.push({interest_code:res.data[i].interest_code, id:res.data[i].id, created:false})
      }
      // interest.interest = res.data
      this.setState({ selected: selected });
      console.log(this.state);
    }).catch(error => {
      console.log(error);
    });
  }

  renderDeleteItem = (value, option) => {
    let selected = this.state.selected;
    selected.interest = value.filter(entry => entry !== option);
    this.setState({ selected: selected });
  }

  handleInterestDelete = (option, index) => {
    axios.delete(endpoints.my_interest + option.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      // toast.success("Deleted")
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

  submit = async()=>{
    const selected = this.state.selected;
    for (var i = 0; i < selected.interest.length; i++) {
      if(selected.interest[i].created == true){
        const res =
        await axios
          .post(endpoints.my_interest, JSON.stringify({ "interest_code": selected.interest[i].interest_code }), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.access,
            },
          });
      }      
    } 
    this.setState({'isEdit':false, selected:selected})   
  }
  

  render() {
    const elements_in = this.state.autocompleteData
    const interest_items = []

    for (const [index, value] of elements_in.entries()) {
      if(this.state.selected.interest.some(item => value.interest === item.interest_code) == false){
        interest_items.push(
          { interest_code: value.interest, id:-1, created: true},
        )
      }
    }


    return (
      <div style={{padding: '10px 10px'}}>
      <Grid container spacing={3}>
       {this.state.isEdit == false ?
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item xs={10} md={10} lg={11}>
            {this.state.selected.interest.map((interest, index) => (
              <Chip key={'key_my_interest_'+interest.id} id={interest.id} label={interest.interest_code} style={{margin:5}} />
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
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item xs={10} md={10} lg={11}>
              <Autocomplete
                value={this.state.selected.interest}
                multiple
                id="interest"
                filterSelectedOptions={true}
                options={interest_items}
                getOptionLabel={option => option.interest_code}
                onChange={this.handleInterestData}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      id={option.id+"_"+option.interest_code}
                      key={'key_interest_'+option.id+"_"+option.interest_code}
                      label={option.interest_code}
                      {...getTagProps({ option })}
                      onDelete={()=>{
                        if(option.created == true){
                          this.renderDeleteItem(value, option)
                        }else{
                          // delete from api when option.created==false
                          //call api for delete interest from my interest table
                          if(option.created==false){
                          this.handleInterestDelete(option, index);
                        }
                        }
                      }}
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