import React,{useState,useEffect} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RightTab from "../rightTab/RightTab";
import {Link} from "react-router-dom";
import axios from "axios";
import endpoints,{base_uri} from "../../api/endpoints";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";



const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    imageContainer:{
        width:'100%',
        height:"100%",
        overflow:"hidden",
    },
    image:{
        width: '100%',
        height: '100%',
        objectFit:"contain",
        borderRadius:"0.5rem"
    },
    heading:{
        textAlign:"left",
        padding:"1rem 0rem 1rem 0rem",
        fontFamily:"Daikon-Bold",
        fontSize:"large"
    },
    heading1:{
        textAlign:"left",
        padding:"1rem 0rem 0rem 0rem",
        fontFamily:"Daikon-Bold",
        fontSize:"large"
    },
    topHeader:{
        // padding:"1rem",
        textAlign:"center",
        padding:"1rem ",
        fontFamily:"Daikon-Bold",
    },
    redirect:{
        display:"flex"
    },
    redirectHeading:{
        margin:"0rem 0rem 0rem 0.5rem",
        fontFamily:"Daikon-Bold"
    },
    apply:{
        display:"flex",
        justifyContent:"space-between"
    },
    description:{
        fontFamily:"Daikon-Regular",
        display:"flex"
    },
    modal:{
        paddingTop:"6rem",
        width:"50%"
    },
    belowText:{
        display:"flex",
        justifyContent:" space-between"
    },
    top:{
        display:"flex",
        justifyContent:"center"
    },
    topimage:{
        width:"5rem",
        objectFit:"contain",
        borderRadius:"1.5rem"
    },
    servicesIN:{
        display:"flex",
        justifyContent:"space-between",
        flexWrap:"wrap"
    },
    services:{
        padding:"0rem 0rem 2rem 0rem"
    },
    serviceText:{
        width:'33%',
        padding:"1rem 0rem 0rem 0rem",
        // margin: '0rem 8rem 0rem 0rem',
        display:"flex",
        fontFamily:"Daikon-Regular",
    },
    iconText:{
        display:"flex",
        // flexDirection:"column"
    }
    
}));

export default function MyWorkDetailPosted(){

    const [data,setData] = useState([])

    const classes = useStyles();

    var getToken = localStorage.getItem('access');
    const fetchData = async ()=>{
        try{
        const fetch = await axios.get(endpoints.MY_WORK,{
            headers:{
                Authorization: 'Bearer ' + getToken
            }
        })

        console.log("fetched Data",fetch.data)
    }
    catch(error){
        console.log(error)
    }

    }

    useEffect(()=>{
        fetchData()
    },[])
    
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
   
    return(
        <>
        <h1>Posting Work</h1>
        <Grid container direction="row"  spacing={3}>
        <Grid xs={8}><Container >
            <Box className={classes.top}>
            <img className={classes.topimage} src="https://media.contentapi.ea.com/content/dam/eacom/lost-in-random/images/2021/06/lost-in-random-feature-image-16x9.jpg.adapt.crop16x9.1023w.jpg" 
            alt="random"/>
           <Typography className={classes.topHeader} variant="h4">Heading Of Company</Typography>
            </Box>        
            <Typography className={classes.heading}>
               Subject Of Work </Typography>
            <Typography className={classes.description} >Description Of Work</Typography><br/> 
            <Typography className={classes.description} >Attachment Here</Typography><br/>            
        </Container></Grid>
        <Grid xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}