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

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function Asynchronous() {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
      await sleep(1e3); // For demo purposes.
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map(key => countries[key].item[0]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

}

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
            profile_interest.push(res.data[i])
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
  
  }  

  render() {
    
    const elements = this.state.profile_interest
    const interest_ed = []
    
    for (const [index, value] of elements.entries()) {
      interest_ed.push(
      <Chip
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        id={value.id}
        label={value.interest_code}
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
    debugger;

    
    return(
        <Grid container spacing={3}>
        <Grid item xs={12}>

   
        <div class='row editInterest' style={{ position: 'relative', left: 30 }}>
                            {interest_ed}

                            <Fab color="grey" aria-label="add" style={{height:10, width: 40, position:'absolute', right:60}} >
        <AddIcon style={{color: 'white'}} onClick={this._editInterest}/>
      </Fab>
                            </div>
                            
                            <div class='autocompleteInterest' style={{ position: 'relative', left: 30, width: 650 }} >
              
                            <Autocomplete
                        multiple
                        id="interest"
                        options={interest_items}
                        getOptionLabel={option => option.title}
                        // defaultValue={[interest_items[0]]}
                        onChange={this.handleInterestData}
                        loading={this.state.loading}
                        defaultValue={[this.state.profile_interest]}
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