import React from "react";
import Grid from '@material-ui/core/Grid';
import RightTab from "../rightTab/RightTab";
import Typography from '@material-ui/core/Typography';

export default function Chapter(){
    return(
        <>
        <Grid container direction="row"  spacing={3}>
            <Grid item xs={8}>
                <Typography variant="h4">I am working </Typography>
                </Grid>
            <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}