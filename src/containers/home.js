import React from 'react';
import Feed from '../components/feed/feed';
import Grid from '@material-ui/core/Grid';
import RecomendedCircle from '../components/circle/recomended-circle';
import HotTopic from '../components/hot-topics/hot-topic';
import FriendsList from '../components/friends/friend-list'

class Home extends React.Component {
    
    render() {
        return (
            <Grid container direction="row" justifyContent='space-evenly' alignItems="flex-start" spacing={0}>
                <Grid item xs={12} sm={12} md={8} lg={7}>
                    <Feed />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <HotTopic/>
                    <br/><br/>
                    <FriendsList />
                    <br/><br/>
                    <RecomendedCircle layoutType={'list'}/>
                </Grid>
            </Grid>
        );
    }
}

export default Home;