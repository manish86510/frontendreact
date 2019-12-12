import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/styles';
import Event from './event';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class EventsTabs extends React.Component {
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
          <Tab label="Yesterday" />
          <Tab label="Today" />
          <Tab label="Tomorrow" />
        </Tabs>
        {value == 0 && <Event />}
        {value == 1 && <Event />}
        {value == 2 && <Event />}
      </div>
    );
  }
}


export default withStyles(styles)(EventsTabs);