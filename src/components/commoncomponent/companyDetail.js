import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

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
        textAlign:"center",
        padding:"1rem 0rem 1rem 0rem"
    },
    topHeader:{
        // padding:"1rem",
        textAlign:"center",
        padding:"1rem"
    },
    redirect:{
        display:"flex"
    },
    redirectHeading:{
        margin:"0rem 0rem 0rem 0.5rem"
    },
    apply:{
        display:"flex",
        justifyContent:"space-between"
    }
}));


export default function CompanyDetail(){
    const classes = useStyles();
    return(
        <>
        <Container>
            <Container className={classes.topHeader}><Typography variant="h4">Bharatpreneurs</Typography></Container>
            
            <Box className={classes.imageContainer} >
                <img src="https://bharatpreneurs.org/images/mainh.webp" alt="imageishere" className={classes.image}/>
            </Box>
            <Typography variant="h4" className={classes.heading}>Here Is Heading Of Bharatpreneurs</Typography>
            <Typography>Bharatpreneurs, a groundbreaking event in India, is dedicated to empowering Indian entrepreneurs and SMEs. We offer comprehensive support through finance and funding, cutting-edge technology and operations assistance, and strategic media and marketing support. Join us on a unified platform to foster collaboration and propel the success of SMEs at the Bharatpreneurs event.</Typography><br/>
            
            <Typography> At Bharatpreneurs, our diverse exhibition stalls cater to three pivotal sectors. Explore finance and funding with leading banks, finance companies, and management consultants. Delve into technology and operations with legal services, IT firms, and cutting-edge cloud and data companies. Lastly, engage with cutting-edge Media and Marketing companies, spanning media outlets, branding agencies, digital marketing, and brand management. Join us for a convergence of industries, fostering collaboration and innovation in the heart of Indian entrepreneurship.
            </Typography>
            <br/><br/><br/>
            <Box className={classes.apply}>
            <Box className={classes.redirect}>
            <ArrowRightAltIcon/> <a target="_blank" href="https://bharatpreneurs.org/"><Typography className={classes.redirectHeading}>Redirect to Company Website</Typography></a></Box>
            <Button variant="contained" color="primary"> &nbsp;Apply &nbsp;
      </Button></Box>
        </Container>
        </>
    )
}