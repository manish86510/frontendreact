import React from "react";
import MyWork from "./MyWork";
import Grid from '@material-ui/core/Grid';
import RightTab from "../rightTab/RightTab";

export default function MyWorkTab(){
    return(
        <>
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><MyWork/></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}