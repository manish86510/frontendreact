import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Avatar, ListItem, Paper } from '@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Collaborate extends React.Component {
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
    var value = this.state.value;
    // console.log(value);
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                </span>

              </ListItem>

                <div style={{ paddingLeft: '2%' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <p><b>Skill</b></p>
                <Button variant="contained"  className="mybtn">#php</Button>
                <Button variant="contained"  className="mybtn">#javascript</Button>
                <Button variant="contained"  className="mybtn">#css</Button>
                <p><b>Interest</b></p>
                <Button variant="contained"  className="mybtn">#nuroscience</Button>
                <Button variant="contained"  className="mybtn">#mentalhealth</Button>
                <Button variant="contained"  className="mybtn">#startup</Button>
                <p>&nbsp;</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                </span>

              </ListItem>
                <div style={{ paddingLeft: '2%' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <p><b>Skill</b></p>
                <Button variant="contained" className="mybtn">#php</Button>
                <Button variant="contained" className="mybtn">#javascript</Button>
                <Button variant="contained" className="mybtn">#css</Button>
                <p><b>Interest</b></p>
                <Button variant="contained" className="mybtn">#nuroscience</Button>
                <Button variant="contained" className="mybtn">#mentalhealth</Button>
                <Button variant="contained" className="mybtn">#startup</Button>
                <p>&nbsp;</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                </span>

              </ListItem>

                <div style={{ paddingLeft: '2%' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <p><b>Skill</b></p>
                <Button variant="contained"  className="mybtn">#php</Button>
                <Button variant="contained"  className="mybtn">#javascript</Button>
                <Button variant="contained"  className="mybtn">#css</Button>
                <p><b>Interest</b></p>
                <Button variant="contained"  className="mybtn">#nuroscience</Button>
                <Button variant="contained"  className="mybtn">#mentalhealth</Button>
                <Button variant="contained"  className="mybtn">#startup</Button>
                <p>&nbsp;</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                </span>

              </ListItem>

                <div style={{ paddingLeft: '2%' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <p><b>Skill</b></p>
                <Button variant="contained"  className="mybtn">#php</Button>
                <Button variant="contained"  className="mybtn">#javascript</Button>
                <Button variant="contained"  className="mybtn">#css</Button>
                <p><b>Interest</b></p>
                <Button variant="contained"  className="mybtn">#nuroscience</Button>
                <Button variant="contained"  className="mybtn">#mentalhealth</Button>
                <Button variant="contained"  className="mybtn">#startup</Button>
                <p>&nbsp;</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                </span>
              </ListItem>

                <div style={{ paddingLeft: '2%' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <p><b>Skill</b></p>
                <Button variant="contained"  className="mybtn">#php</Button>
                <Button variant="contained"  className="mybtn">#javascript</Button>
                <Button variant="contained"  className="mybtn">#css</Button>
                <p><b>Interest</b></p>
                <Button variant="contained"  className="mybtn">#nuroscience</Button>
                <Button variant="contained"  className="mybtn">#mentalhealth</Button>
                <Button variant="contained"  className="mybtn">#startup</Button>
                <p>&nbsp;</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <ListItem>
                <Avatar
                  src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                </Avatar>

                <span style={{ padding: 20 }}>
                  <div><b>Awosome Project</b></div>
                  <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                </span>

              </ListItem>

                <div style={{ paddingLeft: '2%' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                <p><b>Skill</b></p>
                <Button variant="contained"  className="mybtn">#php</Button>
                <Button variant="contained"  className="mybtn">#javascript</Button>
                <Button variant="contained"  className="mybtn">#css</Button>
                <p><b>Interest</b></p>
                <Button variant="contained"  className="mybtn">#nuroscience</Button>
                <Button variant="contained"  className="mybtn">#mentalhealth</Button>
                <Button variant="contained"  className="mybtn">#startup</Button>
                <p>&nbsp;</p>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(Collaborate);