import React from 'react'
import UpcomingEvents from '../upcomingEvents/upcomingEvents'
import HotTopic from '../hot-topics/hot-topic'
import RecomendedCircle from '../circle/recomended-circle'
import FriendsList from '../friends/friend-list'

const RightTab = () => {
    return (
        <div>
            <UpcomingEvents style={{ margin: '10px 0' }} />
            {/* <br /><br /> */}
            {/* <HotTopic style={{ margin: '10px 0' }} /> */}
            {/* <br /><br /> */}
            {/* <FriendsList style={{ margin: '10px 0' }} /> */}
            {/* <br /><br /> */}
            {/* <RecomendedCircle layoutType={'list'} style={{ margin: '10px 0' }} /> */}
        </div>
    )
}

export default RightTab