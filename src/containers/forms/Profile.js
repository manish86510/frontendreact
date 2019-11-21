import React from 'react';
import SideNav from '../nav'
import { Button } from 'react-bootstrap';
import SplitView from "./SplitView";
import ProfileTabs from './EditProfile'
import Grid from '@material-ui/core/Grid';
import PostHotTopics from './Hot-topics';





class Profile extends React.Component{

    render() {
        return (
            <SideNav>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
                    <Grid item xs={8}>
                        <ProfileTabs />
                    </Grid>
                    <Grid item xs={4}>
                    <PostHotTopics />
                    </Grid>
                </Grid>
            </SideNav>
        );
    }
}

export default Profile;