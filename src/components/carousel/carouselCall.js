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


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
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
        padding:"1rem 0rem 1rem 0rem"
    },
    website:{
        display:"flex",
    },
    websiteText:{
        margin:"0rem 0rem 0rem 1rem",
        textDecoration:"none",
        color:"black"
    }
}));


export default function CarouselCall(){
    const [data,setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const history = useHistory();
   
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
        console.log("data in carousel",res.data.data)
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
            <Typography variant="h4" className={classes.heading}>{data.source}</Typography>
            <Typography variant="h6">Date : {data.date}</Typography><br/>
            <Typography>{data.long_desc}</Typography>
            <br/><br/><br/>
            {/* <Box className={classes.website}><ArrowForwardIcon/> <a href="google.com" target="_blank" ><Typography className={classes.websiteText}>Redirect To Website</Typography></a></Box> */}
        </Container></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid> : <h1>Still Fetching Data</h1>}
        </>
    )
}