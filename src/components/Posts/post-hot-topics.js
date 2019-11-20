import React from 'react';
import Paper from '@material-ui/core/Paper';
import { PropTypes } from 'prop-types';
import { withStyles, mergeClasses } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Avatar, ListItem } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShareAlt, faTag, faRedoAlt, faAngleDown, faRedo, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Avatar, Divider,  } from '@material-ui/core';



const styles = theme => ({

});



class PostHotTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Accordion>
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
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              <Accordion>
                <Card>
                  <Card.Header>
                    <b>. expand your circle .</b>
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
                    <Card.Body>Hello! I'm the body</Card.Body>
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

