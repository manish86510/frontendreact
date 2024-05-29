import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LanguageIcon from '@material-ui/icons/Language';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    maincard:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-evenly",
    },
    maincard11:{
        display:"flex",
        // backgroundColor:"#fafafa",
        // backgroundColor:"rgb(240, 240, 240)",
        border:'2px solid darkgray',
        borderRadius:"1rem",
        height:'3.5rem',
        width:'12rem',
        padding:"0.5rem",
        textDecoration:"none",
    },
    maincard1:{
        
        margin:'0.5rem',
    },
    label:{
        padding:"0.2rem 0rem 0rem 0.5rem",
        color:"black",
    },
    icons:{
        // width:"2rem",
        // height:"rem"
        fontSize: 'xx-large'
    },
    icons1:{
        backgroundColor: 'rosybrown',
        color: 'black',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0.3rem'
    },
    topService:{
        backgroundColor: '#fff',
        borderRadius:"1rem",
        boxShadow: '0px 0px 10px 0px #ccc',
        width: '100%',
        position:'relative',
        padding:"0.5rem"
    },
    heading:{
      padding:"0.5rem 0rem 0rem 1rem",
    }
  }));


export default function GovernmentSchemes(){
    const classes = useStyles();

    const tutorialSteps = [
        {
          label: 'Atal Pension Yojana',
          icons: <AssignmentIcon  className={classes.icons}/>
        },
        {
          label: 'Kaushal Vikas Yojana',
          icons:<AssignmentIndIcon  className={classes.icons}/>
        },
        {
          label: 'Pradhan Mantri Mudra Yojana',
          icons:<LanguageIcon  className={classes.icons}/>
        },
        {
          label: 'Pradhan Mantri Awas Yojana',
          icons:<PersonOutlineIcon  className={classes.icons}/>
        },
        {
            label: 'Jeevan Jyoti Bima Yojana',
            icons: <AssignmentIcon className={classes.icons}/>
          },
          {
            label: 'Atmanirbhar Bharat Abhiyan',
            icons:<AssignmentIndIcon className={classes.icons}/>
          },
        
      ];

    return(
        <>
        <Grid className={classes.topService}>
            <Container>
        <Typography  variant="h5">Government Schemes</Typography><hr/>
            <Box className={classes.maincard}>{tutorialSteps.map((card,index)=>{
                return <div className={classes.maincard1}>
                    <Box >
                    <Link to="/component-tabs" className={classes.maincard11}>
                    <Box className={classes.icons1} >{card.icons}</Box>
                    <Box className={classes.label}>{card.label}</Box></Link>
                    </Box>
                </div>
            })}</Box>
            {/* <Box>...More</Box> */}
            </Container>
        </Grid>
        </>
    )
}
