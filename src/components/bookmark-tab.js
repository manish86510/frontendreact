import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/styles';
import Posts from './Posts/posts';
import Feed from './feed/feed';
import Projects from './feed/projects';
import Services from './Services';
import GovernmentSchemes from './governmentSchemes';

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
    const { classes } = this.props;
    var value = this.state.value;
    // console.log(value);
    return (
      <>
      <div className={classes.root}>
        {/* <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Posts" />
          <Tab label="Projects" />
          <Tab label="Events" />
        </Tabs> */}
        <Services/>
        <GovernmentSchemes/>
        {/* {value === 0 &&  <Feed /> } */}
        {/* {value === 1 &&  <Projects /> } */}
        {/* {value === 2 &&  <Posts /> } */}
      </div>
      </>
    );
  }
}


export default withStyles(styles)(BookmarkTabs);