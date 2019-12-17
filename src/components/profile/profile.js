import React from 'react';
import ProfileTabs from './Edit-profile';
import Grid from '@material-ui/core/Grid';
import HotTopics from '../hot-topics/hot-topic';


class Profile extends React.Component{

    render() {
        return (
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={12} sm={12} md={8} lg={7}>
                        <ProfileTabs />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                    <HotTopics />
                </Grid>
            </Grid>
        );
    }
}

export default Profile;
