import React from 'react';
import Paper from '@material-ui/core/Paper';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Avatar, Grow, Divider, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShareAlt, faTag, faCoins, faUsers } from '@fortawesome/free-solid-svg-icons'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Posts extends React.Component {
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
          <Grid item xs={12}>
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
              </div>

              <div style={{ paddingLeft: '2%' }}>
                <IconButton size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faComment} />
                </IconButton>
                <span style={{ fontSize: 12 }}>51</span>
                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faShareAlt} />
                </IconButton>
                <span style={{ fontSize: 12 }}>51</span>
                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faTag} />
                </IconButton>
                <span style={{ fontSize: 12 }}>251</span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
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
              </div>

              <div style={{ paddingLeft: '2%' }}>
                <IconButton size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faComment} />
                </IconButton>
                <span style={{ fontSize: 12 }}>51</span>
                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faShareAlt} />
                </IconButton>
                <span style={{ fontSize: 12 }}>51</span>
                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faTag} />
                </IconButton>
                <span style={{ fontSize: 12 }}>251</span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
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
              </div>

              <div style={{ paddingLeft: '2%' }}>
                <IconButton size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faComment} />
                </IconButton>
                <span style={{ fontSize: 12 }}>51</span>
                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faShareAlt} />
                </IconButton>
                <span style={{ fontSize: 12 }}>51</span>
                <IconButton style={{ marginLeft: '5%' }} size='small' color="inherit" aria-label="Close">
                  <FontAwesomeIcon icon={faTag} />
                </IconButton>
                <span style={{ fontSize: 12 }}>251</span>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Posts.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Posts);