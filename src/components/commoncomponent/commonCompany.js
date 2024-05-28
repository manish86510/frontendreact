import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import "./commonCompany.css"

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
        height:"5rem"
    },
    topService:{
        backgroundColor: '#fff',
        borderRadius:"1rem",
        boxShadow: '0px 0px 10px 0px #ccc',
        width: '100%',
        position:'relative',
        margin:"1rem 1rem 1rem 0rem",
        paddingLeft:"0px",
    }
  }));
export default function CommonCompany(){
    const classes = useStyles();
    const tutorialSteps = [
        {
          label: 'HBF',
          image: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          description:"hsjvhjdsvhfvdsmfnsdfm",
        },
        {
          label: 'TAIKII',
          image:"https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D",
          description:"hgfhjewfhgbewgdhrgwevgrw",
        },
        {
          label: 'AQT',
          image:"https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?cs=srgb&dl=pexels-ingo-188035.jpg&fm=jpg",
          description:"berueruiywiuyniuwnyxuinyuwiyrwiueyriwu",
        },
        {
          label: 'ENORVISION',
          image:"https://png.pngtree.com/background/20210710/original/pngtree-company-profile-corporate-culture-brochure-cross-page-design-background-material-picture-image_1011696.jpg",
          description:"vtghbevhnjkhckhkxhkjwmxkjehcwjehjknhecjkehjkwh",
        },
        {
            label: 'BHARATPRENURS',
            image: "https://watermark.lovepik.com/photo/40155/7604.jpg_wh1200.jpg",
            description:"uyeytyuwiywiunywiuxuimuixuixmuiqnhuqxnhiuhnuwqi",
          },
          {
            label: 'I AM HERE',
            image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
            description:"envtrncuomxiomuoixwumioxiuouwoimxmioumoicwuionuciowmuixow",
          },
        
      ];

    return(
        <>
        {/* <h1>I am working in common company list</h1> */}
        
            
        <Typography variant="h4">Company List</Typography><hr/>
            {tutorialSteps.map((card,index)=>{
                return <Grid key={index} className={classes.topService}><Container><Box className={classes.maincard}><div className={classes.maincard1}>
                    <Box className={classes.maincard11}>
                    <img className={classes.image} src={card.image} alt={card.label}/> 
                    <Box>
                        <Link to="/company-detail">
                        <Typography variant="h6" className={classes.label}>{card.label}</Typography></Link>
                    <Typography className={classes.label}>{card.description}</Typography></Box>
                    
                    </Box>
                </div></Box></Container></Grid>
            })}
            {/* <Box>...More</Box> */}
            
        
        </>
    )
}