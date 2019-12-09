import React from 'react';
import ProfileTabs from './Edit-profile'
import Grid from '@material-ui/core/Grid';
import HotTopics from '../hot-topics/hot-topic';


class Profile extends React.Component{

    render() {
        return (
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
                    <Grid item xs={8}>
                        <ProfileTabs />
                    </Grid>
                    <Grid item xs={4}>
                    <HotTopics />
                    </Grid>
                </Grid>
        );
    }
}

export default Profile;