import React from "react";
import RightTab from "../../components/rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    fire:{
        marginTop:"2%"
    },
    topFire:{
        marginTop:"1%"
    },
    image:{
        width:"100%",
        height:"5rem",
        margin:"3% 0% 3% 0%",
        objectFit:"contain",
        // height:"50%"
    },
    textContainer:{
        marginTop:"1%",
        
    },
    heading:{
        fontFamily:"Daikon-Bold"
    },
    body:{
        fontFamily:"Daikon-Regular",
        marginBottom:"2%",
    },
    imageContainer:{
        marginTop:"2%"
    },
    extra:{
        fontFamily:"Daikon-Bold",
    },
    topextra:{
        // margin:"3% 0% 0% 25%"
        display:"flex",
        justifyContent:"center",
        textAlign:"center",
    }
}))

export default function ShowFire({data}){
    const classes = useStyles();
    console.log("getting data in show",data)
    return(
        <>      
        <Grid container direction="row"  spacing={3}> 
        <Grid item xs={8} className={classes.topFire}> 
            {/* <h1>I am in Firebase</h1> */}
       {Object.keys(data).length > 0 ?
        <Paper className={classes.fire}>
       <Grid container direction="row">
        <Grid item xs={3}> 
        <Box className={classes.imageContainer}>
        {/* <img className={classes.image} src={data.image} alt={data.title}/> */}
        <img className={classes.image} 
        src={data.image}
        // src="https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000033063/83b19e19e8f0ddd4c098f8a075bc85b3957a6041eaca83a186b8dc9c15e68db2" 
        // alt="img"
        alt={data.image}
        />
        </Box>
        </Grid>
        <Grid item xs={9}>
           
        <Box className={classes.top}>
        <Box className={classes.textContainer}>
        <Typography variant="h6" className={classes.heading}>{data.title}</Typography>
        {/* <Typography variant="h6" className={classes.heading}>Hello Title Of Showing Title In Title</Typography> */}
        </Box>
        <Typography className={classes.body}>{data.body}</Typography>
        {/* <Typography className={classes.body}>Body Here Is Body Of FireBase Inside Firebase Component In </Typography> */}
        </Box></Grid></Grid></Paper>
        :<Box className={classes.topextra}><Typography variant="h5" className={classes.extra}>No New Notification</Typography></Box>}
        </Grid>
        <Grid item xs={4}> <RightTab/></Grid>
        </Grid>
        </>
    )
}