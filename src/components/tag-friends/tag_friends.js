import React from 'react';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import Grid from '@material-ui/core/Grid';
// import Icon from '@material-ui/core/Icon';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
// import { toast } from 'react-toastify';
import 'isomorphic-fetch';
import CircularProgress from '@material-ui/core/CircularProgress';

// const $ = require('jquery');

class TagFriends extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: {
        tag_friends: [],
      },
      value: null,
      autocompleteData: [],
      loading: false,
    }

  }

  componentDidMount() {
    // this.getTagFriendList();
  }

  componentWillReceiveProps = () =>{
    if(this.props.clear_tags_friends === true){
      const selected = this.state.selected;
      selected.tag_friends = [];
      this.setState({ selected: selected });
    }
  }

  debounce_timer = null;

  retrieveDataAsynchronously(searchText) {
    if (this.debounce_timer != null) {
      clearTimeout(this.debounce_timer);
    }
    this.setState({ autocompleteData: [], loading: true });
    this.debounce_timer = setTimeout(() => {

      let url = endpoints.friends_list + `?search=${searchText}`;

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


  handleTagFriendChange = (e) => {
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

  getTagFriendList = () => {
    var getToken = localStorage.getItem('access');
    axios.get(endpoints.my_languages, {
      headers: {
        Authorization: 'Bearer ' + getToken,
      }
    }).then(res => {
      const selected = this.state.selected;
      for (let i = 0; i < res.data.length; i++) {
        selected.tag_friends.push({name:res.data[i].name, id:res.data[i].id, created:false})
      }
      this.setState({ selected: selected });
      console.log(this.state);
    }).catch(error => {
      console.log(error);
    });
  }

  renderTagFriendsItem = (value, option) => {
    let selected = this.state.selected;
    selected.tag_friends = value.filter(entry => entry !== option);
    this.setState({ selected: selected });
  }

  handleTagFriendsDelete = (option) => {
    axios.delete(endpoints.my_languages + option.id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.access,
      }
    }).then(res => {
      // toast.success("Deleted")
      this.renderDeleteItem(this.state.selected.language, option);      
    })
  };

  handleTagFriendsData = (event, value) => {
    const selected = this.state.selected;
    selected.tag_friends = value;
    this.setState({selected:selected});
    this.props.friend_list_data(this.state.selected.tag_friends);
  }

  toggleEdit = ()=>{
    this.setState({
      isEdit: !this.state.isEdit
  });
  }

  // submit = async()=>{
  //   const selected = this.state.selected;
  //   for (var i = 0; i < selected.tag_friends.length; i++) {
  //     if(selected.tag_friends[i].created === true){
  //       const data = {
  //         name: selected.tag_friends[i].name,
  //         read:"yes",
  //         speak:"yes",
  //         write:"yes",
  //       }
  //       const res =
  //       await axios
  //         .post(endpoints.my_languages, JSON.stringify(data), {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: 'Bearer ' + localStorage.access,
  //           },
  //         });
  //     }      
  //   } 
  //   this.setState({'isEdit':false, selected:selected})   
  // }
  

  render() {
    const elements_in = this.state.autocompleteData
    const tag_friends_items = []

    for (const [value] of elements_in.entries()) {
      if(this.state.selected.tag_friends.some(item => value.follower.pk === item.id) == false){
        tag_friends_items.push(
          { name: value.follower.first_name + " " + value.follower.last_name, id:value.follower.pk},
        )
      }
    }


    return (
      <div style={{padding: '10px 10px'}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item xs={12} md={12} lg={12}>
              <Autocomplete
                value={this.state.selected.tag_friends}
                multiple
                id="tag_friends"
                filterSelectedOptions={true}
                options={tag_friends_items}
                getOptionLabel={option => option.name}
                onChange={this.handleTagFriendsData}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      id={option.id+"_"+option.name}
                      key={'key_language_'+option.id+"_"+option.name}
                      label={option.name}
                      {...getTagProps({ option })}
                      onDelete={()=>{
                          this.renderTagFriendsItem(value, option)
                      }}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    onChange={this.handleTagFriendChange}
                    {...params}
                    variant="outlined"
                    placeholder="Tag Friends"
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
            {/* <Grid item xs={2} md={2} lg={1}> */}
              {/* <IconButton color="primary" onClick={this.submit}>
                <AddIcon/>
              </IconButton>
              <IconButton color="primary" onClick={this.toggleEdit}>
                <Close/>
              </IconButton> */}
              {/* <Icon onClick={this.submit} className="fa fa-check" style={{ fontSize: 25, marginLeft:10 }} />
              <Icon onClick={this.toggleEdit} className="fa fa-close" style={{ fontSize: 25, float:'right' }} /> */}
            {/* </Grid> */}
          </Grid>
         </Grid>
       {/* } */}
       </Grid>
       </div>

    )
  }
}

export default TagFriends;