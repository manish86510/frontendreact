import React from 'react';
import Feed from '../components/feed/feed';
import Grid from '@material-ui/core/Grid';
import RecomendedCircle from '../components/circle/recomended-circle';
import HotTopic from '../components/hot-topics/hot-topic';

class Home extends React.Component {
    
    render() {
        return (
            <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={7}>
                    <Feed />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <HotTopic/>
                    <br/><br/>
                    <RecomendedCircle/>
                </Grid>
            </Grid>
        );
    }
}

export default Home;