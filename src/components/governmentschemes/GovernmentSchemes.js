import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


const data = [
    {
        image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
        heading:"Government Heading Is In Header Dummy",
        description:"Government Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
]

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    Box:{
        backgroundColor:"white",
        // height:"4%",
        borderRadius:"0.5rem"
    },
    image:{
        width:"8rem",
        height:"8rem",
        ObjectFit:"contain"
    },
    heading:{
        fontWeight:600
    }
}))

export default function GovernmentSchemesPage(){
    const classes = useStyles();
    return(
        <>
        <h1>I am working In Schemes</h1>
        <Container className={classes.Box}>
            {data.map((data)=><Grid container direction="row"  spacing={3}>
            <Grid item xs={3}><img className={classes.image} src={data.image} alt="aliceImage"/></Grid>
            <Grid item xs={9}>
                <Typography variant="h6" className={classes.heading}>{data.heading}</Typography>
                <Typography>{data.description}</Typography>
             </Grid>
            </Grid>)}
        </Container>
        </>
    )
}