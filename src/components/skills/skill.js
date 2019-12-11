import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, IconButton} from '@material-ui/core';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import 'isomorphic-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';

const $ = require('jquery');

class Skill extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_skill: [],
      selected: {
        skill: [],
        newSkill:[],
      },
      value: "",
      autocompleteData: [],
      loading: false,
      isEdit: false,
    }

  }

  componentDidMount() {
    this.getSkill();
    toast.configure({
      autoClose: 1500,
      draggable: false,
    });
    
  }

  debounce_timer = null;

  retrieveDataAsynchronously(searchText) {
    if (this.debounce_timer != null) {
      clearTimeout(this.debounce_timer);
    }
    this.setState({ autocompleteData: [], loading: true });
    this.debounce_timer = setTimeout(() => {

      let url = endpoints.skills + `?search=${searchText}`;

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


  handleSkillChange = (e) => {
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

  getSkill = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.my_skills, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      const skill = this.state.selected;
      // for (let i = 0; i < res.data.length; i++) {
      //   interest.push({title:res.data[i].interest_code, id:res.data[i].id})
      // }
      skill.skill = res.data
      this.setState({ skill: skill })
    }).catch(error => {
      console.log(error);
    });
  }

  handleSkillDelete = (event) => {
    axios.delete(endpoints.my_skills + event.currentTarget.parentElement.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      toast.success("Deleted")
      this.getSkill();
    })
  };

  handleSkillData = (event) => {
    const newSkill = this.state.selected.newSkill;
    newSkill.push({skill:event.currentTarget.innerText})
    this.setState({newSkill:newSkill});
  }

  toggleEdit = ()=>{
    this.setState({
      isEdit: !this.state.isEdit
  });
  }

  submit = async()=>{
    const newSkill = this.state.selected.newSkill;
    for (var i = 0; i < newSkill.length; i++) {
      const res =
        await axios
          .post(endpoints.my_skills, JSON.stringify({ "skill": newSkill[i].skill }), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.access,
            },
          });
    } 
    this.getSkill();
    const emptyNewSkill = this.state.selected;
    emptyNewSkill.newSkill = [];
    this.setState({'isEdit':false, newSkill:emptyNewSkill})   
    
  }

  

  render() {
    const elements_in = this.state.autocompleteData
    const skill_items = []

    for (const [index, value] of elements_in.entries()) {
      skill_items.push(
        { skill: value.skill, id:value.id},
      )
    }


    return (
      <div style={{padding: '10px 10px'}}>
      <Grid container spacing={3}>
       {this.state.isEdit == false ?
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="left" alignItems="center">
            <Grid item xs={10} md={10} lg={11}>
            {this.state.selected.skill.map((skill, index) => (
              <Chip id={skill.id} label={skill.skill} style={{margin:5}} />
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
                defaultValue={this.state.selected.skill}
                multiple
                id="skill"
                options={skill_items}
                getOptionLabel={option => option.skill}
                onChange={this.handleSkillData}
                isClearable={this.state.selected.skill.some(v => !v.isFixed)}
                // closeIcon={null}
                disableClearable={true}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      id={option.id}
                      label={option.skill}
                      {...getTagProps({ option })}
                      onDelete={this.handleSkillDelete}
                      
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    onChange={this.handleSkillChange}
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

export default Skill;