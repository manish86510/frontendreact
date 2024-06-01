import React from "react";
import CommonComponent from "./commonComponent";
import Posts from '../Posts/posts';
import Feed from '../feed/feed';
import Projects from '../feed/projects';
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {useEffect} from "react";


export default function ComponentTabs(){

    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return(
        <>
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><CommonComponent/></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}