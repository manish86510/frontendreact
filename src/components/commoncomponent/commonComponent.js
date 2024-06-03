// import React,{useState,useEffect} from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import { Container } from "@material-ui/core";
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import endpoints,{base_uri} from "../../api/endpoints";
// import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       maxWidth: 400,
//       flexGrow: 1,
//     },
//     imageContainer:{
//         width:'100%',
//         height:"100%",
//         overflow:"hidden",
//     },
//     image:{
//         width: '100%',
//         height: '15rem',
//         objectFit:"contain",
//         // borderRadius:"1rem"
//     },
//     heading:{
//         textAlign:"center",
//         padding:"1rem 0rem 1rem 0rem"
//     },
//     website:{
//         display:"flex",
//     },
//     websiteText:{
//         margin:"0rem 0rem 0rem 1rem",
//         textDecoration:"none",
//         color:"black"
//     }
// }));


// export default function CommonComponent(){
//     const classes = useStyles();

    

//     return(
//         <>
//         <Container>
//             <Typography variant="h4">Government Scheme Page</Typography>
//             <Box className={classes.imageContainer} >
//                 <img src={`${base_uri}${card.banner}`} alt="imageishere" className={classes.image}/>
//             </Box>
//             <Typography variant="h4" className={classes.heading}>{card.name}</Typography>
//             <Typography variant="h6">{card.launched_date}</Typography><br/>
//             <Typography>{card.long_desc}</Typography>
//             <br/><br/><br/>
//             <Box className={classes.website}><ArrowForwardIcon/> <a href={card.url} target="_blank" ><Typography className={classes.websiteText}>Redirect To Website</Typography></a></Box>
//         </Container>
//         </>
//     )
// }