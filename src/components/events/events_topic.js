import React from 'react';
import RecomendedCircle from '../circle/recomended-circle';
import HotTopic from '../hot-topics/hot-topic';



class EventTopics extends React.Component {
  render() {
    return (
      <div>
      <HotTopic/>
      <br/>
      <br/>
      <RecomendedCircle/>
      </div>
    );
  }
}


export default EventTopics;

