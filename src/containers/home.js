import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextArea from '../components/textarea';
import Feed from '../components/feed/feed';
import HotTopic from '../components/hot-topics/hot-topic';
import Grid from '@material-ui/core/Grid';

class Home extends React.Component {
    
    render() {
        return (
            <div>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
                    <Grid item xs={8}>
                        <Feed />
                    </Grid>
                    <Grid item xs={4}>
                        <HotTopic />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Home;