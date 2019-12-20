import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar, ListItem, Button } from '@material-ui/core';




const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }
  handleChange = (event, newValue) => {
    // console.log(newValue);
    this.setState({ value: newValue });
  };
  render() {
    const { classes } = this.props;
    // var value = this.state.value;
    // console.log(value);
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user </div>
                </span>

              </ListItem>

              <div style={{ paddingLeft: '2%' }}>
                <span>Dance party, Bergahin, Berlin</span><br/>
                <span>@ 01:00 AM</span>
                <p>&nbsp;</p>
              </div>

            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user </div>
                </span>

              </ListItem>

              <div style={{ paddingLeft: '2%' }}>
                <span>Dance party, Bergahin, Berlin</span><br/>
                <span>@ 01:00 AM</span>
                <p>&nbsp;</p>
              </div>

            </Paper>
          </Grid>

          <Grid item xs={12}>
            <center>
            <Button variant="contained"  className="eventBtn">This Week</Button>
            <Button variant="contained"  className="eventBtn">This Month</Button>
            <Button variant="contained"  className="eventBtn">Next Month</Button>
            </center>
          </Grid>
          <Grid item xs={10}>
            <Button variant="contained"  className="eventBtnl">Event Invitations</Button>
          </Grid>
          <Grid item xs={10}>
            <Button variant="contained"  className="eventBtnl">Past Invitations</Button>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user </div>
                </span>

              </ListItem>

              <div style={{ paddingLeft: '2%' }}>
                <span>Dance party, Bergahin, Berlin</span><br/>
                <span>@ 01:00 AM</span>
                <p>&nbsp;</p>
              </div>

            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user </div>
                </span>

              </ListItem>

              <div style={{ paddingLeft: '2%' }}>
                <span>Dance party, Bergahin, Berlin</span><br/>
                <span>@ 01:00 AM</span>
                <p>&nbsp;</p>
              </div>

            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(Event);