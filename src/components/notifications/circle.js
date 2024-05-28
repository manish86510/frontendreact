import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar, ListItem } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  topHeading:{
    margin:"1rem 0rem 0rem 0rem"
  },
  paper:{
    margin: "0rem 1rem 0rem 0rem",
  }
});

class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      folowList: []
    }
  }

  componentDidMount() {
    // var url = endpoints.user_followers;
    // var getToken = localStorage.getItem('access');
    // axios.get(
    //     url,
    //     {
    //         headers: {
    //             Authorization: 'Bearer ' + getToken,
    //         }
    //     }
    // ).then(res => {
    //     if (res.status === 200) {
    //         this.setState({
    //             followList: res.data,
    //         });
    //         console.log(this.state.followList);
    //     }
    // })
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    
  };

  render() {
    const { classes } = this.props;
    // var value = this.state.value;
    return (
      <div className={classes.root}>
        <Grid className={classes.topHeading} container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>
                <span style={{ padding: 20 }}>
                <div><b>Megan fox liked your article </b></div>
                  <div style={{ fontSize: 12 }}>23 min ago</div>
                </span>
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>
                <span style={{ padding: 20 }}>
                <div><b>Megan fox liked your article </b></div>
                  <div style={{ fontSize: 12 }}>23 min ago</div>
                </span>
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>
                <span style={{ padding: 20 }}>
                <div><b>Megan fox liked your article </b></div>
                  <div style={{ fontSize: 12 }}>23 min ago</div>
                </span>
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>
                <span style={{ padding: 20 }}>
                  <div><b>Megan fox liked your article </b></div>
                  <div style={{ fontSize: 12 }}>23 min ago</div>
                </span>
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>
                <span style={{ padding: 20 }}>
                <div><b>Megan fox liked your article </b></div>
                  <div style={{ fontSize: 12 }}>23 min ago</div>
                </span>
              </ListItem>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(Circle);