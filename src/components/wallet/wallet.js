import React from 'react';
import SideNav from '../../containers/nav'
import WalletTabs from './WalletTabs'
import Grid from '@material-ui/core/Grid';
import HotTopics from '../hot-topics/hot-topic';






class Wallet extends React.Component{

    render() {
        return (
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
                    <Grid item xs={8}>
                        <WalletTabs />
                    </Grid>
                    <Grid item xs={4}>
                    <HotTopics />
                    </Grid>
                </Grid>
        );
    }
}

export default Wallet;