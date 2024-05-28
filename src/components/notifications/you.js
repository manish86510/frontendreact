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
  }
});

class You extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const { classes } = this.props;
    // var value = this.state.value;
    return (
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.topHeading}>
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

export default withStyles(styles)(You);