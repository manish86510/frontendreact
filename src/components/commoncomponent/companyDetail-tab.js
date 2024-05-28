import React from "react";
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import CompanyDetail from "./companyDetail";


export default function CompanyDetailTab(){
    return(
        <>
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><CompanyDetail/></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}