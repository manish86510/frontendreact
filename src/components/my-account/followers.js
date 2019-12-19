import React from 'react';
// import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { ListItem } from '@material-ui/core';
import axios from 'axios';
import endpoints from '../../api/endpoints';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import RecomendedCircle from '../circle/recomended-circle';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  padding_followers: {
    padding:'20px'
  },
  circle_paper:{
    marginBottom:'15px',
    borderRadius: '20px'
  },
  avtar_followers:{
    height: '50px',
    width: '50px',
    borderRadius: '20px'
  }
});

class You extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      followers:[],
    }
  }

  componentDidMount(){
    this.followersList();
  }

  followersList = () =>{
    var url = endpoints.following;
    var getToken = localStorage.getItem('access');
    axios.get(
        url,
        {
            headers: {
                Authorization: 'Bearer ' + getToken,
            }
        }
    ).then(res => {
        if (res.status == 200) {
            console.log(res.data.results);
            this.setState({followers: res.data.results});
        }
    });
  } 

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const { classes } = this.props;
    // var value = this.state.value;
    return (
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.padding_followers}>
          <Grid item xs={5}>
            {this.state.followers.map((followers, index) => 
              <Card className={classes.circle_paper}>
              <ListItem>
                <Grid container spacing={3}>
                <Grid item xs={2}>
                  <CardMedia
                  className={classes.avtar_followers}
                  image={followers.follower.avatar} />
                </Grid>
                <Grid item xs={10}>
                  <div >{followers.follower.first_name} {followers.follower.last_name}</div>
                  <div >{"@"+followers.follower.username}</div>
                </Grid>
                </Grid>
              </ListItem> 
              </Card>
            )}
          </Grid>
          <Grid item xs={7}>
            <RecomendedCircle customTitle="Suggested For You" layoutType={'grid'} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(You);