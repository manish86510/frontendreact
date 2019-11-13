import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextArea from '../components/textarea';
import Feed from '../components/feed/feed';
import HotTopic from '../components/hot-topics/hot-topic';
import Grid from '@material-ui/core/Grid';

class Home extends React.Component{

    render() {
        return (
            <div>
                <TextArea/>
                <Grid container direction="row" justify="space-between" alignItems="center" spacing={16}>
                    <Grid item>
                        <Feed/>
                    </Grid>
                    <Grid item>
                        <HotTopic/> 
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Home;