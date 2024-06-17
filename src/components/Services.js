import React,{ useState,useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import axios from 'axios';
import endpoints,{base_uri} from "../api/endpoints";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1
    },
    maincard:{
        display:"flex",
        flexWrap:"wrap",
        // justifyContent:"space-evenly",
    },
    maincard11:{
        display:"flex",
        // backgroundColor:"#fafafa",
        // backgroundColor:"rgb(240, 240, 240)",
        border:'1px solid darkgray',
        borderRadius:"1rem",
        height:'3.5rem',
        width:'12rem',
        padding:"0.5rem"
    },
    maincard1:{
        margin:'0.5rem',
        display:"flex",
        justifyContent:"left",
        // height:'4rem',
        // width:'12rem'
    },
    label:{
        padding:"0rem 0rem 0rem 0.5rem",
        color : "black",
        width:"100%",
        overflow:"hidden",
        textOverflow:"ellipsis",
        fontFamily:"Daikon-Regular"
        // height:"2rem"
    },
    icons:{
      width:"2rem",
      height:"2rem",
        // width:"2rem",
        // height:"rem"
        fontSize: 'xx-large'
    },
    icons1:{
      // backgroundColor: 'palegoldenrod',
        // backgroundColor: 'wheat',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0.3rem',
        color: 'black'
    },
    topService:{
        backgroundColor: '#fff',
        borderRadius:"1rem",
        boxShadow: '0px 0px 10px 0px #ccc',
        width: '100%',
        position:'relative',
        margin:"1.3rem 0rem 1rem 0rem",
        padding:"0.5rem"
    },
    loader:{
      margin:"10% 0% 10% 0%",
      display:"flex",
      justifyContent:"center"
    }
  }));
export default function Services(){
  const [data,setData] = useState([])

  const classes = useStyles();
  var accessToken = localStorage.getItem('access');

  const getIndustry = async ()=>{
    try{
      const res =  await axios.get(endpoints.GET_ALL_SERVICES,{
        headers: {
            Authorization: 'Bearer ' + accessToken,
        }
    })
    setData(res.data.data.slice(0,9))
    // console.log(res.data.data,"here is response")
    
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getIndustry()
  },[])




    // const tutorialSteps = [
    //     {
    //       label: 'Finance',
    //       icons: <AssignmentIcon  className={classes.icons}/>
    //     },
    //     {
    //       label: 'Business Services',
    //       icons:<AssignmentIndIcon  className={classes.icons}/>
    //     },
    //     {
    //       label: 'Health',
    //       icons:<LanguageIcon  className={classes.icons}/>
    //     },
    //     {
    //       label: 'Construction',
    //       icons:<PersonOutlineIcon  className={classes.icons}/>
    //     },
    //     {
    //         label: 'Insurance',
    //         icons: <AssignmentIcon className={classes.icons}/>
    //       },
    //       {
    //         label: 'Law',
    //         icons:<AssignmentIndIcon className={classes.icons}/>
    //       },
    //       {
    //         label: 'Marketing',
    //         icons:<LanguageIcon className={classes.icons}/>
    //       },
    //       {
    //         label: 'Communication',
    //         icons:<PersonOutlineIcon className={classes.icons}/>
    //       },
    //       {
    //         label: 'Tourism',
    //         icons: <AssignmentIcon className={classes.icons}/>
    //       },
    //       {
    //         label: 'Education',
    //         icons:<AssignmentIndIcon className={classes.icons}/>
    //       },
    //       {
    //         label: 'Consulting',
    //         icons:<LanguageIcon className={classes.icons}/>
    //       },
    //       {
    //         label: 'Banking',
    //         icons:<PersonOutlineIcon className={classes.icons}/>
    //       },
        
    //   ];
    
    const history = useHistory();

    const handleClick = (id) => {
      history.push({
        pathname: '/cardCall',
        state: { id }
      });
    };
    return(
        <>
        {data.length> 0 ? <Grid className={classes.topService}>
            <Container>
        <Typography variant="h6" style={{fontFamily:'Daikon-Bold'}}>Services</Typography><hr/>
        <Box className={classes.maincard}>{data.map((card,index)=>{
                return <div key={index} className={classes.maincard1} onClick={()=>handleClick(card.id)}>
                    <Box>
                        <Link to="/cardCall"  className={classes.maincard11}>
                        <img className={classes.icons1} src={`${base_uri}${card.banner}`} alt="console"/>
                    {/* <Box className={classes.icons1}>{card.icons}</Box> */}
                    <Box className={classes.label}>{card.name}</Box></Link>
                    </Box>
                </div>
            })}</Box>
            {/* <Box>...More</Box> */}
            </Container>
        </Grid>:<Box className={classes.loader}> <CircularProgress  color="secondary" /></Box>}
        
        </>
    )
}