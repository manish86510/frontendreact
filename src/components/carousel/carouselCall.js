import React,{useState,useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import RightTab from "../rightTab/RightTab";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import endpoints,{base_uri} from "../../api/endpoints";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    topheading:{
        display:"flex",
        justifyContent:"center",
        textAlign:"left",
        paddingBottom:"1rem",
        fontFamily:"Daikon-Bold"
    },
    imageContainer:{
        width:'100%',
        height:"100%",
        overflow:"hidden",
        // display:"flex",
        // justifyContent:"left",
        // textAlign:"left"
    },
    image:{
        width: '100%',
        height: '15rem',
        objectFit:"contain",
        // borderRadius:"1rem"
    },
    heading:{
        textAlign:"left",
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
    loader:{
      // display:"flex",
      // justifyContent:"center",
      // textAlign:"center",
      padding:"20% 0% 0% 30%"
  },
  longdesc:{
      fontFamily:"Daikon-Regular",
      
  },
  date:{
      fontFamily:"Daikon-Regular"
  }
}));


export default function CarouselCall(){
    const [data,setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const history = useHistory();
    // console.log("here is props",props)
   
    useEffect(() => {
      if (location.state && location.state.id) {
        fetchNews(location.state.id);
      } else {
        history.push("/");  // Redirect to home if no state is found
      }
    }, [location.state]);

    const classes = useStyles();
    var getToken = localStorage.getItem('access');
    
    const fetchNews = async (id) => {
      try {
        const res = await axios.get(`${endpoints.GET_ALL_NEWS}${id}`, {
          headers: {
            Authorization: 'Bearer ' + getToken,
          } 
        });
        setData(res.data.data);
        // console.log("data in carousel",res.data.data)
        setLoading(false); 
      } catch (error) {
        console.log(error);
        setLoading(false); 
      }
    };

    useEffect(()=>{
        fetchNews()
    },[])

    return(
        <>
        {data ? <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><Container>
            <Typography variant="h4" className={classes.topheading}>{data.title}</Typography>
            <Box className={classes.imageContainer} >
                <img src={`${base_uri}${data.banner}`} alt="imageishere" className={classes.image}/>
            </Box>
            <Typography className={classes.heading}>Source : {data.source}</Typography>
            <Typography className={classes.date}>Date : {data.date}</Typography><br/>
            <Typography className={classes.longdesc} dangerouslySetInnerHTML={{ __html: data.long_desc }}></Typography>
            <br/><br/><br/>
            {/* <Box className={classes.website}><ArrowForwardIcon/> <a href="google.com" target="_blank" ><Typography className={classes.websiteText}>Redirect To Website</Typography></a></Box> */}
        </Container></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid> :  <Box className={classes.loader}> <CircularProgress  color="secondary" /></Box>}
        </>
    )
}