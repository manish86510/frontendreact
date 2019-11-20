import React from 'react';
import Paper from '@material-ui/core/Paper';
import { PropTypes } from 'prop-types';
import { withStyles, useTheme } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Avatar, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faRedoAlt, faAngleDown, faRedo, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



// import { Avatar, Divider,  } from '@material-ui/core';



const styles = theme => ({
  autoplay: {
    maxWidth: "100%",
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
    height: 255,
    display: 'block',
    maxWidth: "100%",
    overflow: 'hidden',
    width: '100%',
  },
});



class PostHotTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialSteps: [
        {
          label: 'San Francisco – Oakland Bay Bridge, United States',
          imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
          label: 'Bird',
          imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
          label: 'Bali, Indonesia',
          imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
        },
        {
          label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
          imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
          label: 'Goč, Serbia',
          imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        },
      ],
      activeStep: 0
    }
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
            <Paper className={classes.paper}>
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

                        <div className={classes.autoplay}>
                          {/* <Paper square elevation={0} className={classes.header}>
                            <Typography>{this.state.tutorialSteps[this.state.activeStep].label}</Typography>
                          </Paper> */}
                          <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.activeStep}
                            onChangeIndex={this.handleStepChange}
                            enableMouseEvents
                          >
                            {this.state.tutorialSteps.map((step, index) => (
                              <div key={step.label}>
                                {Math.abs(this.state.activeStep - index) <= 2 ? (
                                  <img className={classes.img} src={step.imgPath} alt={step.label} />
                                ) : null}
                              </div>
                            ))}
                          </AutoPlaySwipeableViews>
                        </div>
                      </Paper>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

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
                        <ListItem>
                          <Avatar
                            src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                          </Avatar>

                          <span style={{ padding: 20 }}>
                            <div style={{ fontSize: 12 }} >
                              @user . 300 followers
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
                      </Paper>
                      <Paper className={classes.paper}>
                        <ListItem>
                          <Avatar
                            src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                          </Avatar>

                          <span style={{ padding: 20 }}>
                            <div style={{ fontSize: 12 }} >
                              @user . 300 followers
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
                      </Paper>
                      <Paper className={classes.paper}>
                        <ListItem>
                          <Avatar
                            src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                          </Avatar>

                          <span style={{ padding: 20 }}>
                            <div style={{ fontSize: 12 }} >
                              @user . 300 followers
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
                      </Paper>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/* <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    
                    <div style={{ float:"right" }}>
                      <IconButton>
                        <FontAwesomeIcon size="1x" icon={faRedoAlt}/>
                      </IconButton>
                      <IconButton>
                        <FontAwesomeIcon size="1x" icon={faAngleDown}/>
                      </IconButton>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion> */}
            </Paper>
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

