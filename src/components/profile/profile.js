import React from 'react';
import ProfileTabs from './Edit-profile';
import Grid from '@material-ui/core/Grid';
import HotTopics from '../hot-topics/hot-topic';
import CompanyProfile from './companyprofile';
import RightTab from '../rightTab/RightTab';

class Profile extends React.Component{

    render() {
        return (
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={8} >
                        <ProfileTabs />
                        
                    <CompanyProfile/>
                    </Grid>
                    <Grid item xs={4} style={{marginTop:"-2.5%"}}>
                    {/* <HotTopics /> */}
                    <RightTab/>
                </Grid>
            </Grid>
        );
    }
}

export default Profile;
