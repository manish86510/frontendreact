import React from "react";
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import CommonCompany from "./commonCompany";


export default function CompanyTab(){
    return(
        <>
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><CommonCompany/></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}