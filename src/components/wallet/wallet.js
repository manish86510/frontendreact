import React from 'react';
import SideNav from '../../containers/nav'
import WalletTabs from './WalletTabs'
import Grid from '@material-ui/core/Grid';
import HotTopics from '../profile/Hot-topics';






class Wallet extends React.Component{

    render() {
        return (
            <SideNav>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
                    <Grid item xs={8}>
                        <WalletTabs />
                    </Grid>
                    <Grid item xs={4}>
                    <HotTopics />
                    </Grid>
                </Grid>
            </SideNav>
        );
    }
}

export default Wallet;