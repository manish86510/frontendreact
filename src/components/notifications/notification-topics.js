import React from 'react';
import { withStyles } from '@material-ui/styles';
import RecomendedCircle from '../circle/recomended-circle';
import HotTopic from '../hot-topics/hot-topic';
import FriendsList from '../friends/friend-list'


const styles = theme => ({
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


class NotificationTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }



  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <HotTopic />
        <br />
        <br />
        <FriendsList />
        <br />
        <br />
        <RecomendedCircle layoutType={'list'} />
      </div>
    );
  }
}

export default withStyles(styles)(NotificationTopics);

