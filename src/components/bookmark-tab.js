import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Posts from './Posts/posts';
import Feed from './feed/feed';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class BookmarkTabs extends React.Component {
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
    const { classes, children } = this.props;
    var value = this.state.value;
    // console.log(value);
    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Posts" />
          <Tab label="Projects" />
          <Tab label="Events" />
        </Tabs>
        {value == 0 && <TabContainer><Feed /></TabContainer>}
        {value == 1 && <TabContainer><Posts /></TabContainer>}
        {value == 2 && <TabContainer><Posts /></TabContainer>}
      </div>
    );
  }
}

BookmarkTabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(BookmarkTabs);