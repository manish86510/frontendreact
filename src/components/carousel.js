import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../styles/Owl.css';


const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      description:'abcd',
      date:'1/1/1234'
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      description:'efgh',
      date:'1/1/1234'
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      description:'ijkl',
      date:'1/1/1234'
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
      description:'mnop',
      date:'1/1/1234'
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      description:'qrst',
      date:'1/1/1234'
  },
  {
    label: 'Random Image 1',
    imgPath:
      'https://www.shutterstock.com/shutterstock/photos/2274412231/display_1500/stock-vector-many-rainbow-gradient-random-bright-soft-balls-background-colorful-balls-background-for-kids-zone-2274412231.jpg',
      description:'uvwx',
      date:'1/1/1234'
  },
  {
    label: 'Random Image 2',
    imgPath:
      'https://newvision-media.s3.amazonaws.com/cms/4040184f-4412-4775-980f-d2df40139bd3.jpg',
      description:'yzab',
      date:'1/1/1234'
  },
  {
    label: 'Random Image 3',
    imgPath:
      'https://media.contentapi.ea.com/content/dam/eacom/lost-in-random/images/2021/06/lost-in-random-feature-image-16x9.jpg.adapt.crop16x9.1023w.jpg',
      description:'cdef',
      date:'1/1/1234'
  },
  {
    label: 'Random Image 4',
    imgPath:
      'https://i.ytimg.com/vi/RtvdEJQWQ8Y/maxresdefault.jpg',
      description:'ghij',
      date:'1/1/1234'
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
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
}));

export default function Carousel(){ 
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
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
      <div className={classes.carouselContainer}>
      <OwlCarousel 
      autoplay 
      autoplayTimeout='2000' 
      className='owl-theme' 
      loop margin={10} 
      nav={true}
      // navText={['<', '>']}
      dots={false}
      >
      {tutorialSteps.map((m)=><div class='item'>
        <img src={m.imgPath} alt={m.label} />
        <h4>{m.label}</h4>
        <p>{m.description}</p>
        <p>{m.date}</p>
    </div>)}
</OwlCarousel></div>
      </>
    );
}

