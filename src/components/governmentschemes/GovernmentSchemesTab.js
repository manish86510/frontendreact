import React from "react";
import GovernmentSchemes from "./GovernmentSchemes";
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';

export default function GovernmentSchemesTab(){
    return(
        <> 
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><GovernmentSchemes/></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}