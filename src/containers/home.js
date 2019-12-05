import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextArea from '../components/textarea';
import Feed from '../components/feed/feed';
import PostHotTopics from '../components/Posts/post-hot-topics';
import Grid from '@material-ui/core/Grid';
import RecomendedCircle from '../components/circle/recomended-circle';
import HotTopic from '../components/hot-topics/hot-topic';


class Home extends React.Component {
    
    render() {
        return (
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={8}>
                        <Feed />
                    </Grid>
                    <Grid item xs={4}>
                        <HotTopic/>
                        <br/><br/>
                        <RecomendedCircle/>
                    </Grid>
                </Grid>
        );
    }
}

export default Home;