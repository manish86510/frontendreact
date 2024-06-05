import React,{useState,useEffect} from "react";
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import endpoints,{base_uri} from "../../api/endpoints";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    topheading:{
        display:"flex",
        justifyContent:"center",
        textAlign:"center",
        paddingBottom:"1rem"
    },
    imageContainer:{
        width:'100%',
        height:"100%",
        overflow:"hidden",
    },
    image:{
        width: '100%',
        height: '15rem',
        objectFit:"contain",
        // borderRadius:"1rem"
    },
    heading:{
        textAlign:"center",
        padding:"1rem 0rem 1rem 0rem",
        fontFamily:"Daikon-Bold"
    },
    website:{
        display:"flex",
    },
    websiteText:{
        margin:"0rem 0rem 0rem 1rem",
        textDecoration:"none",
        color:"black"
    },
    topHeading:{
        padding:'0rem 0rem 1rem 0rem',
        display:"flex",
        justifyContent:"center",
        textAlign:"center",
        fontFamily:"Daikon-Bold"
    },
    loader:{
        // display:"flex",
        // justifyContent:"center",
        // textAlign:"center",
        padding:"20% 0% 0% 30%"
    },
    longdesc:{
        fontFamily:"Daikon-Regular"
    },
    date:{
        fontFamily:"Daikon-Regular"
    }
}))

export default function GovernmentDescription(){
    const [data,setData] = useState()
    const classes = useStyles();

    const location = useLocation();
    const history = useHistory();
   
    useEffect(() => {
      if (location.state && location.state.id) {
        fetchSchemes(location.state.id);
      } else {
        history.push("/");  // Redirect to home if no state is found
      }
    }, [location.state]);

    var getToken = localStorage.getItem('access');
    const fetchSchemes = async (id)=>{
        try{
       const fetch =  await axios.get(`${endpoints.GET_ALL_SCHEMES}${id}/`,{
            headers:{
                Authorization : 'Bearer ' + getToken
            }
        })
        setData(fetch.data.data)
            // console.log(fetch.data.data,"here is response of description")
        
    }
    catch(error){
        console.log(error)
    }
    }

    useEffect(()=>{
        fetchSchemes()
    },[])
    return(
        <>
        {data ? <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><Container>
            <Typography variant="h4" className={classes.topHeading}>Government Scheme Page</Typography>
            <Box className={classes.imageContainer} >
                <img src={`${base_uri}${data.banner}`} alt="imageishere" className={classes.image}/>
            </Box>
            <Typography variant="h4" className={classes.heading}>{data.name}</Typography>
            <Typography className={classes.date}>Date: {data.launched_date} </Typography><br/>
            <Typography className={classes.longdesc} dangerouslySetInnerHTML={{ __html:data.long_desc }}></Typography>
            <br/><br/><br/>
            <Box className={classes.website}><ArrowRightAltIcon/> <a href={data.url} target="_blank" ><Typography className={classes.websiteText}>Redirect To Website</Typography></a></Box>
        </Container></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid> : <Box className={classes.loader}> <CircularProgress  color="secondary" /></Box>}

        </>
    )
}