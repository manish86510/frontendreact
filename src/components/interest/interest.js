import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const $ = require('jquery');



class Interest extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        profile_interest: [],
        autocomp:{
          interest: [],
        },
        selected:{
          interest: [],
        }
      }
    }
    
componentDidMount = () => {
    this.getMe();
    this.getInterest();

}

getInterest = () => {
    axios.get(endpoints.interest, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
     }).then(res => {
      debugger;

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
       "Deleted"
      //  this.getInterestData();
      })
   
  };

  handleInterestData = (event) => {
    debugger;
    const selected_interest = this.state.selected.interest
    selected_interest.push(
      event.currentTarget.innerText
    )
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


    const elements_in = this.state.autocomp.interest
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
      </Fab>
                            </div>
                            
                            <div class='autocompleteInterest' style={{ position: 'relative', left: 30, width: 500 }} >
                            {/* {this._renderCancel} */}
                            <Autocomplete
                        multiple
                        id="interest"
                        options={interest_items}
                        getOptionLabel={option => option.title}
                        // defaultValue={[top100Films[13]]}
                        onChange={this.handleInterestData}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Interest"
                            placeholder="Interest"
                            margin="normal"
                            fullWidth
                            // InputProps={{disableUnderline: true}}
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