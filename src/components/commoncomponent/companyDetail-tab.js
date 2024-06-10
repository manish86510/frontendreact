import React from "react";
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import CompanyDetail from "./companyDetail";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   
}))
export default function CompanyDetailTab({ selectedId }){
    const classes = useStyles();
    
    return(
        <>
        <Grid container direction="row"  spacing={3} >
        <Grid item xs={8}><CompanyDetail id={selectedId}/></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}