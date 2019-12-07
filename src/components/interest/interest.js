import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import 'isomorphic-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';

const $ = require('jquery');

class Interest extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        profile_interest: [],
        selected:{
          interest: [],
        },
        value: "",
        autocompleteData: [],
        loading: '',

      }
   
    }

 
  componentDidMount() {
    this.getMe();
    this.getInterest();
}

debounce_timer = null;

retrieveDataAsynchronously(searchText){
  if(this.debounce_timer!=null){
    clearTimeout(this.debounce_timer);
  }
  this.debounce_timer = setTimeout(()=>{
    this.setState({ autocompleteData: [] });
  
    let url = endpoints.interest+`?querystring=${searchText}`;

    axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.access,
            }
          }).then(res => {
    
            const autocompleteData = this.state.autocompleteData
              
              for (let i = 0; i < res.data.length; i++) {
                autocompleteData.push(res.data[i])
                }
              
              this.setState({ autocompleteData: autocompleteData }) 
          });
  }, 500);
  

}


handleInterestChange  = (e) => {
  this.setState({
      value: e.target.value
  });
  /**
   * Handle the remote request with the current text !
   */
  if (e.target.value.length > 2){
    this.state.loading = '';
    this.retrieveDataAsynchronously(e.target.value);
   console.log("The Input Text has changed to ", e.target.value);
  }
  else{
    this.state.loading = 'load';
  }
}

getInterest = () => {
    axios.get(endpoints.interest, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
      const interest = this.state.autocomp.interest
        
        for (let i = 0; i < res.data.length; i++) {
          interest.push(res.data[i])
          }
  
        this.setState({ interest: interest }) 
      
    });
  }

getMe = () => {
    axios.get(endpoints.profile_interest, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
      const profile_interest = this.state.profile_interest
        
        for (let i = 0; i < res.data.length; i++) {
            profile_interest.push(res.data[i].interest_code)
          }
  
        this.setState({ profile_interest: profile_interest }) 
        
    });
  }

  handleInterestDelete  = (event) => {
    axios.delete(endpoints.profile_interest + event.currentTarget.parentElement.id  , {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
      toast.success("Deleted")
  
      })
   
  };
  
  _editInterest= () => {
    $('.autocompleteInterest').show();
    $('.editInterest').hide();
    const elements = this.state.profile_interest
    const interest_his = []
 
    for (const [index, value] of elements.entries()) {
      
      interest_his.push(
        { title: value.interest_code, year: value.interest_code },
      )
    }
    // debugger;
    // const interest_his = this.state.selected.interest 
    // this.setState({ interest_his: interest_his }) 

  
  }  

  render() {
    
    const elements = this.state.profile_interest
    const interest_ed = []
 
    for (const [index, value] of elements.entries()) {
      interest_ed.push(
      <Chip
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        id={value}
        label={value}
        onDelete={this.handleInterestDelete}
        />
      )
    
    }
  
    const elements_in = this.state.autocompleteData
    const interest_items = []
    
    for (const [index, value] of elements_in.entries()) {
      interest_items.push(
        { title: value.interest, year: value.interest },
         
      )
    }
 
    
    return(
        <Grid container spacing={3}>
        <Grid item xs={12}>

   
        <div class='row editInterest' style={{ position: 'relative', left: 30 }}>
                            {interest_ed}

                            <Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
        <AddIcon style={{color: 'white'}} onClick={this._editInterest}/>
      </Fab></div>
                            
                            <div class='autocompleteInterest' style={{ position: 'relative', left: 30, width: 650 }} >
              
                            <Autocomplete
                        value={this.state.profile_interest}
                        // items={this.state.profile_interest}
                        multiple
                        id="interest"
                        options={interest_items}
                        getOptionLabel={option => option.title}
                        onChange={this.handleInterestData}
                        loading={this.state.loading}
                        // defaultValue={[this.state.selected.interest]}
                        // defaultValue={[top100Films[0]]}

                        renderInput={params => (
                          <TextField
                          onChange={this.handleInterestChange}
                          // onClick={this.handleInterestChange}
                            {...params}
                            variant="standard"
                            label="Interest"
                            placeholder="Interest"
                            margin="normal"
                            fullWidth
                            // InputProps={{disableUnderline: true}}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                   {/* {<CircularProgress color="inherit" size={20} />} */}
                            
                                   {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                   {params.InputProps.endAdornment}
                                 </React.Fragment>
                               ),
                             }}
                          />
                          )}
                          />
                     
                     
                    </div>
    </Grid>
    </Grid>
    
      )
}
}

export default Interest;