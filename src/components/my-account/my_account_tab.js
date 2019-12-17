import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/styles';
import Mutual from './mutual';
import Following from './following'
import Followers from './followers'



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
          <Tab label="Mutual" />
          <Tab label="Followers" />
          <Tab label="Following" />
        </Tabs>
        {value == 0 &&  <Mutual /> }
        {value == 1 &&  <Followers /> }
        {value == 2 &&  <Following /> }
      </div>
    );
  }
}


export default withStyles(styles)(NotificationTab);