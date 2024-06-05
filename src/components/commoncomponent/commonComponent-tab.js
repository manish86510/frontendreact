import React,{useEffect,useState} from "react";
import CommonComponent from "./commonComponent";
import Posts from '../Posts/posts';
import Feed from '../feed/feed';
import Projects from '../feed/projects';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import endpoints,{base_uri} from "../../api/endpoints";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CircularProgress from '@material-ui/core/CircularProgress';

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
  loader:{
      // display:"flex",
      // justifyContent:"center",
      // textAlign:"center",
      padding:"20% 0% 0% 30%"
  },
  top:{
    display:"flex",
    justifyContent:"center",
    padding:"0rem 0rem 1rem 0rem",
    fontFamily:"Daikon-Bold"
  },
  longdesc:{
    fontFamily:"Daikon-Regular"
  },
  date:{
    fontFamily:"Daikon-Regular"
  }
}));

export default function ComponentTabs({card}){

  const [data,setData] = useState(null);
  const [loading, setLoading] = useState(true); // Define loading state
  const [error, setError] = useState(null);
  const classes = useStyles();
  const location = useLocation();
    const history = useHistory();
   
    useEffect(() => {
      if (location.state && location.state.id) {
        fetchSchemesData(location.state.id);
      } else {
        history.push("/");  // Redirect to home if no state is found
      }
    }, [location.state]);

    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    var getToken = localStorage.getItem('access');
    const fetchSchemesData = async (id) => {
        try {
          const response = await axios.get(`${endpoints.get_id_schemes}${id}`, {
            headers: {
              Authorization: 'Bearer ' + getToken
            }
          });
          setData(response.data.data);
          setLoading(false); // Update loading state
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error); // Set error state
          setLoading(false); // Update loading state
        }
      };

    useEffect(()=>{
        fetchSchemesData()
    },[])

    // console.log("data in govt schemes",data)

    return(
        <>
        {data ? <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><Container>
            <Typography variant="h4" className={classes.top}>Government Scheme Page</Typography>
            <Box className={classes.imageContainer} >
                <img src={`${base_uri}${data.banner}`} alt="imageishere" className={classes.image}/>
            </Box>
            <Typography variant="h4" className={classes.heading}>{data.name}</Typography>
            <Typography className={classes.date}>Date: {data.launched_date}</Typography><br/>
            <Typography dangerouslySetInnerHTML={{ __html:data.long_desc }} className={classes.longdesc}></Typography>
            <br/><br/><br/>
            {/* <Box className={classes.website}><ArrowForwardIcon/> <a href={card.url} target="_blank" ><Typography className={classes.websiteText}>Redirect To Website</Typography></a></Box> */}
        </Container></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid> : <Box className={classes.loader}> <CircularProgress  color="secondary" /></Box>}
        </>
    )
}