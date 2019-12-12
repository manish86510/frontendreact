import React from 'react';
import SideNav from '../../../containers/nav'
import SrCoins from '../coins/srcoins'
import Grid from '@material-ui/core/Grid';
import HotTopics from '../../../components/hot-topics/hot-topic';


class Wallet extends React.Component{

    render() {
        return (
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={3}>
                    <Grid item xs={8}>
                        <SrCoins />
                    </Grid>
                    <Grid item xs={4}>
                    <HotTopics />
                    </Grid>
                </Grid>
        );
    }
}

export default Wallet;