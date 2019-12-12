import React from 'react';
import RecomendedCircle from '../circle/recomended-circle';
import HotTopic from '../hot-topics/hot-topic';
import FriendsList from '../friends/friend-list'



class EventTopics extends React.Component {
  render() {
    return (
      <div>
      <HotTopic/>
      <br/>
      <br/>
      <FriendsList/>
      <br/>
      <br/>
      <RecomendedCircle/>
      </div>
    );
  }
}


export default EventTopics;

