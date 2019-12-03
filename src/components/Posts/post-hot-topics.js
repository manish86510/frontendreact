import React from 'react';
import Paper from '@material-ui/core/Paper';
import { PropTypes } from 'prop-types';
import { withStyles, useTheme } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Avatar, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faRedoAlt, faAngleDown, faRedo, faArrowDown, faShareAlt, faTag, faCoins, faUsers, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Accordion, Card } from 'react-bootstrap';
import axios from 'axios';
import GridListTile from '@material-ui/core/GridListTile';

import 'bootstrap/dist/css/bootstrap.min.css';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// import { Avatar, Divider,  } from '@material-ui/core';

const styles = theme => ({
  autoplay: {
    maxWidth: "99%",
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 250,
    display: 'block',
    maxWidth: "99%",
    overflow: 'hidden',
    width: '100%',
  },
});
class PostHotTopics extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        postList: [],
        value: 0,
        comments: '',
        userList: [],
        username: ""
      };
    }
  
    componentDidMount() {
      var url = "https://energeapi.do.viewyoursite.net/api/v1/post/";
      var getToken = localStorage.getItem('access');
      axios.get(
        url,
        {
          headers: {
            Authorization: 'Bearer ' + getToken,
          }
        }
      ).then(res => {
        console.log(res.data);
        if (res.status == 200) {
          this.setState({
            postList: res.data,
          });
        }
      })

      var userUrl = "https://energeapi.do.viewyoursite.net/";
      axios.get(
        userUrl,
        {
          headers: {
            Authorization: 'Bearer ' + getToken,
          }
        }
      ).then(result => {
        console.log(result.data);
          this.setState({
            userList: result.data,
          });
      })
    }

  handleStepChange = step => {
    this.setState({
      activeStep: step,
    });
  }

  render() {
    const { classes } = this.props;
    const theme = useTheme;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <Paper className={classes.paper}> */}
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    <b>. hot topics .</b>
                    <div style={{ float: "right" }}>
                      <IconButton size="small">
                        <FontAwesomeIcon icon={faRedoAlt} />
                      </IconButton>
                      <IconButton size="small">
                        <Accordion.Toggle style={{ float: "right" }} as={Button} variant="link" eventKey="0">
                          <FontAwesomeIcon icon={faAngleDown} />
                        </Accordion.Toggle>
                      </IconButton>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Paper className={classes.paper}>
                        <ListItem >
                            <Grid >                             
                                <div>
                                  <ListItem>
                                      <Avatar
                                        src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                                      </Avatar>
                                      <span style={{ padding: 20 }}>
                                        <div><b>Awosome Project</b></div>
                                        <div style={{ fontSize: 12 }}>@user . 300 followers</div>
                                      </span>
                                  </ListItem>
                                  {this.state.postList.map((tile, index) => (
                                      <p>{tile.about_post} and {index}</p>
                                  ))}
                                  <GridListTile style={{ width: "100%", height: 350, borderRadius: 30 }}>
                                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"} style={{ border: 2, borderRadius: 2, width: '100%', height:320 }} />                                 
                                    {/* <div class="bottom-left">Manish Kumar</div> */}
                                  </GridListTile >
                                </div>
                               </Grid>                        
                          </ListItem>                        
                      </Paper>
                    </Card.Body>
                  </Accordion.Collapse>

                  <Accordion defaultActiveKey="1">
                <Card>
                  <Card.Header>
                    <b>. expand your circle .</b>
                    <div style={{ float: "right" }}>
                      <IconButton size="small">
                        <FontAwesomeIcon icon={faRedoAlt} />
                      </IconButton>
                      <IconButton size="small">
                        <Accordion.Toggle style={{ float: "right" }} as={Button} variant="link" eventKey="1">
                          <FontAwesomeIcon icon={faAngleDown} />
                        </Accordion.Toggle>
                      </IconButton>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse  eventKey="1">
                    <Card.Body>
                      <Paper className={classes.paper}>
                          {this.state.userList.map(tile => (
                              <ListItem>
                              <Avatar
                                src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                              </Avatar>
                              <span style={{ padding: 20 }}>
                            <div style={{ fontSize: 12 }} >
                              @{tile.username} . 300 followers
                              {/* <span > */}
                              {/* </span> */}
                            </div>
                          </span>
                          <Chip
                            style={{ float: "right" }}
                            size="small"
                            // icon={<FaceIcon />}
                            label="connected"
                            onClick={this.handleClick}
                            onDelete={this.handleDelete}
                          />
                        </ListItem>     
                            ))
                            }
                          
                      </Paper>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
                </Card>
              </Accordion>             
           {/* </Paper> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

PostHotTopics.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(PostHotTopics);

