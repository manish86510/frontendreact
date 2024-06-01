import React,{useEffect,useState} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../../styles/commonCompany.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import endpoints from "../../api/endpoints";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    maincard:{
        display:"flex",
        flexWrap:"wrap",
    },
    maincard11:{
        display:"flex",
        // backgroundColor:"#fafafa",
        // backgroundColor:"rgb(240, 240, 240)",
        // height:'3.5rem',
        // width:'12rem',
        padding:"0.5rem 0.5rem 0.5rem 0rem",
    },
    maincard1:{
        
        margin:'0.5rem',
    },
    label:{
        padding:"0.2rem 0rem 0rem 0.5rem",
    },
    image:{
        width:"10rem",
        height:"5rem",
        objectFit:"contain"
    },
    topService:{
        backgroundColor: '#fff',
        borderRadius:"0.4rem",
        boxShadow: '0px 0px 10px 0px #ccc',
        width: '100%',
        position:'relative',
        margin:"1rem 1rem 1rem 0rem",
        paddingLeft:"0px",
    },
    search:{
      display:"flex",
      justifyContent:"space-between",
    },
    TextArea:{
      // width:"34rem"
    },
  }));


export default function CardCommon({id,data1,card}){

    const classes = useStyles();
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
    return(
        <>
             <Grid  className={classes.topService}><Container><Box className={classes.maincard}><div className={classes.maincard1}>
                    <Box className={classes.maincard11}>
                      <Box className={classes.imageBox}>
                      <img className={classes.image} src={card.image} alt={card.label}/> 
                      </Box>
                    <Container >
                        <Link to="/company-detail" >
                        <Typography variant="h6" className={classes.label}
                        >{card.name}{id}</Typography></Link>
                    <Typography className={classes.label}>{card.description}</Typography></Container>
                    </Box>
                </div></Box></Container></Grid>
        </>
    )
}