import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../styles/Owl.css';
import endpoints, {base_uri} from '../api/endpoints';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
// import from '../api/endpoints';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    // maxHeight:800,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  carouselContainer: {
    width: '76vw', 
    // margin: '0 auto',
    overflow:'hidden',
  },
  heading:{
    color:"black !important",
    textAlign: 'center',
    textDecoration:"none",
    fontFamily:"Daikon-Regular",
    margin: '0', // Remove default margin
    padding: '-1rem 0',
  },
  heading1:{
    color:"black", 
    textAlign: 'center',
    textDecoration:"none",
    fontFamily:"Daikon-Regular",
    overflow:"hidden",
    textOverflow:"ellipsis",
    margin: '0', // Remove default margin
    padding: '-0.5rem 0',

  },
  date: {
    color: "black",
    textAlign: 'center',
    textDecoration: "none",
    fontFamily: "Daikon-Regular",
    margin: '0', // Remove default margin
    padding: '-0.5rem 0', // Adjust as needed for spacing
  },
  loader:{
    display:"flex",
    justifyContent:"center"
  }
}));

export default function Carousel(){ 
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const classes = useStyles();
    var getToken = localStorage.getItem('access');
    const fetchNews = async () => {
      try {
        const res = await axios.get(endpoints.GET_ALL_NEWS, {
          headers: {
            Authorization: 'Bearer ' + getToken,
          }
        });
        setData(res.data.data);
        setLoading(false); 
        // console.log("response in carousel",data)
      } catch (error) {
        console.log(error);
        setLoading(false); 
      }
    };

    // console.log('here is data', data)

    useEffect(()=>{
      fetchNews()
    },[])

    const history = useHistory();

    const handleClick = (id) => {
      history.push({
        pathname: '/carousel-call',
        state: { id }
      });
    };

    const cutItShort =(data,limit)=>{
      if(data.length>limit){
        return data.slice(0,limit) + "...";
      }
      return data
    }

    
  
    return (
        <>
     {data.length > 0 ?  <div className={classes.carouselContainer} >
      <OwlCarousel 
      autoplay 
      autoplayTimeout='2500' 
      className='owl-theme' 
      loop margin={10} 
      nav={true}
      dots={false}
      >
      {data.map((m)=><div key={m.id} className='item'  onClick={() => handleClick(m.id)}> <Link to='/carousel-call' state={m.id} className={classes.heading}  >
        <img src={`${base_uri}${m.banner}`} alt={m.label} />
       
          <h4 dangerouslySetInnerHTML={{ __html: cutItShort(m.title,80) }} style={{marginBottom:1,color:'black'}}></h4>
        <p className={classes.heading1} dangerouslySetInnerHTML={{ __html: cutItShort(m.short_desc,80) }} style={{marginTop:0,color:"black !important"}}></p>
        <p className={classes.heading} >{m.date}</p></Link>
    </div>)}
    </OwlCarousel></div> : []
    // <Grid item xs={8}> <Box className={classes.loader}> <CircularProgress  color="secondary" /></Box></Grid>
    }
      </>
    );
}

