import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/styles';
import Circle from './circle';
import You from './you'



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class NotificationTab extends React.Component {
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
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Your Circle" />
          <Tab label="You" />
        </Tabs>
        {value === 0 &&  <Circle /> }
        {value === 1 &&  <You /> }
      </div>
    );
  }
}


export default withStyles(styles)(NotificationTab);