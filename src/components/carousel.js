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
// import from '../api/endpoints';
import axios from 'axios';


const tutorialSteps = [
  {
    label: 'Smart Cities Mission Portal by Ministry of Urban Development',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. ',
      date:'26 October 2021'
  },
  {
    label: 'Guidelines for Integrated Development of Commercial Floriculture Scheme',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day.',
      date:'23 March 2022'
  },
  {
    label: 'Social defence schemes of Ministry of Social Justice and Empowerment',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day.',
      date:'26 December 2022'
  },
  {
    label: 'Schemes and programmes for differently abled by Ministry of Social Justice and Empowerment',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day.',
      date:'14 January 2023'
  },
  {
    label: 'Information on Rashtriya Madhyamik Shiksha Abhiyan',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day.',
      date:'14 February 2024'
  },
  {
    label: 'Balika Samriddhi Yojana by the Ministry of Women and Child Development',
    imgPath:
      'https://www.shutterstock.com/shutterstock/photos/2274412231/display_1500/stock-vector-many-rainbow-gradient-random-bright-soft-balls-background-colorful-balls-background-for-kids-zone-2274412231.jpg',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day.',
      date:'12 March 2024'
  },
  {
    label: 'Information on schemes of animal husbandry',
    imgPath:
      'https://newvision-media.s3.amazonaws.com/cms/4040184f-4412-4775-980f-d2df40139bd3.jpg',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day.',
      date:'12 February 2022'
  },
  {
    label: 'Download forms of schemes for care of older persons',
    imgPath:
      'https://media.contentapi.ea.com/content/dam/eacom/lost-in-random/images/2021/06/lost-in-random-feature-image-16x9.jpg.adapt.crop16x9.1023w.jpg',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day.',
      date:'14 June 2020'
  },
  {
    label: 'Information about Jan Shikshan Sansthan scheme',
    imgPath:
      'https://i.ytimg.com/vi/RtvdEJQWQ8Y/maxresdefault.jpg',
      description:'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day.',
      date:'14 February 2021',
  },
];

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
    color:"black",
    textAlign: 'center',
    textDecoration:"none",
    fontFamily:"Daikon-Regular",
    margin: '0', // Remove default margin
    padding: '-1rem 0'
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
        console.log("response in carousel",data)
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

    
  
    return (
        <>
      {/* <div 
      style={{width:"45rem",height:"15rem",margin:"1rem"}}
      >
      <Slider {...settings}>
      {tutorialSteps.map((m,i)=><div>
        <img 
        style={{height:"30rem",width:"10rem"}} 
        src={m.imgPath} alt={i}/>
        <Typography>{m.label}</Typography>
      </div>)}</Slider></div> */}


      <div className={classes.carouselContainer} >
      <OwlCarousel 
      autoplay 
      autoplayTimeout='2500' 
      className='owl-theme' 
      loop margin={10} 
      nav={true}
      dots={false}
      >
      {data.map((m)=><div key={m.id} className='item'  onClick={() => handleClick(m.id)}>
        <img src={`${base_uri}${m.banner}`} alt={m.label} />
        <Link to='/carousel-call' state={m.id} className={classes.heading} >
          <h4 dangerouslySetInnerHTML={{ __html: m.title }} style={{marginBottom:1}}></h4>
        <p className={classes.heading1} dangerouslySetInnerHTML={{ __html: m.short_desc }} style={{marginTop:0}}></p></Link>
        <p className={classes.heading} >{m.date}</p>
    </div>)}
    </OwlCarousel></div>
      </>
    );
}

