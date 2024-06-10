import React,{ useState,useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Avatar, ListItem, Button } from '@material-ui/core';
import axios from "axios";
import endpoints,{base_uri} from '../../api/endpoints';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton/IconButton';
import EventDummy from './eventDummy';



// import React,{useState,useEffect} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
// import Box from '@material-ui/core/Box';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import axios from 'axios';
// import endpoints,{base_uri} from '../../api/endpoints';



// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     margin:"1rem 0rem 0rem 0rem",
//   },
//   image:{
//     height:"10rem",
//     width:"12rem",
//     ObjectFit :"contain",
//   },
//   main:{
//     backgroundColor: 'white',
//     borderRadius:"1rem",
//     margin:"1rem 0.5rem 1.5rem 0rem",
//     height:"50%",
//     overflow:"hidden"
//   },
//   text:{
//     overflow:"hidden",
//     textOverflow:"ellipsis",
//     width:"100%",
//     fontWeight:600,
//     marginRight:"2%"
//   },
//   text1:{
//     overflow:"hidden",
//     textOverflow:"ellipsis",
//     width:"100%",
//     marginTop:"2%"
//   },
//   heading:{
//     display:"flex"
//   },
//   date:{
//     width:"7%",
//   },
//   dateBar:{
//     display:"flex",
//     // justifyContent:"center",
//     marginTop:"2%",
//     paddingTop: '1rem',
//   },
//   dateText:{
//     marginLeft:"1%"
//   },
//   price:{
//     backgroundColor:"#F26522",
//     borderRadius:"0.5rem",
//     width: '4rem',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   main11:{
//     margin:"1rem 0rem 0rem 0rem"
//   },
//   arrow:{
//     paddingLeft: '50%'
//   },
//   pricearrow:{
//     // display:"flex",
//     // flexDirection:"row"
//   }
//   // button:{
//   //   display:"flex",
//   //   flexDirection:"row"
//   // }
// }));









// class Event extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 0
//     }
//   }
//   handleChange = (event, newValue) => {
//     // console.log(newValue);
//     this.setState({ value: newValue });
//   };
//   render() {
//     const { classes } = this.props;
//     // var value = this.state.value;
//     // console.log(value);
//     return (
//       <div className={classes.root}>
//         <Grid container spacing={3}>
//           <Grid item xs={6}>
//             <Paper className={classes.paper}>
//               <ListItem>
//                 <Avatar
//                   src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
//                 </Avatar>

//                 <span style={{ padding: 20 }}>
//                   <div><b>Awosome Project</b></div>
//                   <div style={{ fontSize: 12 }}>@user </div>
//                 </span>

//               </ListItem>

//               <div style={{ paddingLeft: '5.5%' }}>
//                 <span>Dance party, Bergahin, Berlin</span><br/>
//                 <span>@ 01:00 AM</span>
//                 <p>&nbsp;</p>
//               </div>

//             </Paper>
//           </Grid>
//           <Grid item xs={6}>
//             <Paper className={classes.paper}>
//               <ListItem>
//                 <Avatar
//                   src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
//                 </Avatar>

//                 <span style={{ padding: 20 }}>
//                   <div><b>Awosome Project</b></div>
//                   <div style={{ fontSize: 12 }}>@user </div>
//                 </span>

//               </ListItem>

//               <div style={{ paddingLeft: '5.5%' }}>
//                 <span>Dance party, Bergahin, Berlin</span><br/>
//                 <span>@ 01:00 AM</span>
//                 <p>&nbsp;</p>
//               </div>

//             </Paper>
//           </Grid>

//           <Grid item xs={12}>
//             <center>
//             <Button variant="contained"  className="eventBtn">This Week</Button>
//             <Button variant="contained"  className="eventBtn">This Month</Button>
//             <Button variant="contained"  className="eventBtn">Next Month</Button>
//             </center>
//           </Grid>
//           <Grid item xs={10}>
//             <Button variant="contained"  className="eventBtnl">Event Invitations</Button>
//           </Grid>
//           <Grid item xs={10}>
//             <Button variant="contained"  className="eventBtnl">Past Invitations</Button>
//           </Grid>
//           <Grid item xs={6}>
//             <Paper className={classes.paper}>
//               <ListItem>
//                 <Avatar
//                   src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
//                 </Avatar>

//                 <span style={{ padding: 20 }}>
//                   <div><b>Awosome Project</b></div>
//                   <div style={{ fontSize: 12 }}>@user </div>
//                 </span>

//               </ListItem>

//               <div style={{ paddingLeft: '5.5%' }}>
//                 <span>Dance party, Bergahin, Berlin</span><br/>
//                 <span>@ 01:00 AM</span>
//                 <p>&nbsp;</p>
//               </div>

//             </Paper>
//           </Grid>
//           <Grid item xs={6}>
//             <Paper className={classes.paper}>
//               <ListItem>
//                 <Avatar
//                   src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
//                 </Avatar>

//                 <span style={{ padding: 20 }}>
//                   <div><b>Awosome Project</b></div>
//                   <div style={{ fontSize: 12 }}>@user </div>
//                 </span>

//               </ListItem>

//               <div style={{ paddingLeft: '5.5%' }}>
//                 <span>Dance party, Bergahin, Berlin</span><br/>
//                 <span>@ 01:00 AM</span>
//                 <p>&nbsp;</p>
//               </div>

//             </Paper>
//           </Grid>
//         </Grid>
//       </div>
//     );
//   }
// }


// export default withStyles(styles)(Event);








const tutorialSteps = [
  {
    label: 'Smart Cities Mission Portal by Ministry of Urban Development',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
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

// export default function Event(){
//   const [data,setData] = useState([]);
//   const [arrow,setArrow] = useState(false)
//   const classes = useStyles();
//   var getToken = localStorage.getItem('access');

//   const fetchEvents = async ()=>{
//     axios.get(endpoints.get_events,{
//       headers:{
//         Authorization : 'Bearer ' + getToken,
//       }
//     }).then((res)=>setData(res.data.data)
//       // console.log("events response",res.data.data)
//     )
//   }

//   useEffect(()=>{
//     fetchEvents()
//   },[]);

//   const handleChange = ()=>{
//     setArrow(!arrow)
//   }
//   console.log("arrow",arrow)

//   const symbol = `₹`;

//   // console.log("here is data in my events",data)

//   return (
//     <>
//     <h1>I am working</h1>
//     <Box>
//       {data.map((data)=><Container key={data.id}  className={classes.main}>
//       <Grid container direction="row" className={classes.main11} spacing={3}>
//         <Grid item xs={4}> <img className={classes.image} src={`${base_uri}${data.banner}`} alt='dummy'/></Grid>
//         <Grid item xs={8}> <Box className={classes.heading}>
//           <Typography  className={classes.text}>{`${data.title}`}</Typography> <Box>
//          </Box></Box>
//         <Typography  className={classes.text1} >
//           {`${data.short_desc}`}
//           {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining e */}
//           </Typography>
//           <Box className={classes.pricearrow}>
//           <Box className={classes.price}>
//          {`${symbol}${data.amount}`}
//       </Box>
//         <Box className={classes.dateBar}>
//           <img className={classes.date} src='/images/calendar.png' alt='datesign'/>
//           <Box className={classes.dateText}>{data.date}</Box>
//           </Box></Box></Grid>
//           <Box className={classes.arrow}><ArrowDropDownIcon onClick={handleChange}/></Box>
//          {arrow &&  <Container>
//             <Typography paragraph>{data.long_desc}</Typography>
//             <Typography variant='h6'>Guests: {data.guests}</Typography>
//           </Container>}
//       </Grid>
//     </Container>)}
    
//     </Box>

//     </>
//   )
// }






// const useStyles = makeStyles((theme) => ({
//   root: {
//     // maxWidth: 345,
//     margin:"1rem",
//     borderRadius:"1rem",
//     display: 'flex',
//     flexDirection: 'column',
//     height: '400px', // Set a fixed height for the card
//     overflow:"hidden",
//     // maxHeight: '100%',
//     // height: '20rem',
//     // maxHeight:350
//   },
//   media: {
//     // height: 0,
//     // maxHeight:50,
//     paddingTop: '26.25%',
//     // padding:"30% ",
//     objectFit:"contain",
//     // margin:"0rem 1rem 0rem 0rem",
//     // maxHeight: '150px', // Adjust this value if needed
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
//   price:{
//     display:"flex",
//     justifyContent:"space-between"
//   },
//   cardContent: {
//     overflow: 'hidden', // Enable scrolling for overflow content
//     flexGrow: 1,
//   },
// }));

// export default function Event() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = useState(false);
//   const [data,setData] = useState([]);

//   var getToken = localStorage.getItem('access');
//   const fetchEvents = async ()=>{
//         axios.get(endpoints.get_events,{
//           headers:{
//             Authorization : 'Bearer ' + getToken,
//           }
//         }).then((res)=>setData(res.data.data)
//           // console.log("events response",res.data.data)
//         )
//       }
    
//       useEffect(()=>{
//         fetchEvents()
//       },[])
//     console.log("herre is dataaaa",data)

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <>
    
//    {data.map((data)=> <Card className={classes.root}>
//    <CardHeader
//     //  avatar={
//     //    <Avatar aria-label="recipe" className={classes.avatar}>
//     //      R
//     //    </Avatar>
//     //  }
//     //  action={
//     //    <IconButton aria-label="settings">
//     //      <MoreVertIcon />
//     //    </IconButton>
      
//     //  }
//      title={data.title}
//      subheader={data.date}
//    />
//    <CardMedia
//      className={classes.media}
//      image={`${base_uri}${data.banner}`}
//      title="Paella dish"
//    />
//    <CardContent className={classes.cardContent}>
//     <Box className={classes.price}>
//      <Typography variant="body2" color="textSecondary" component="p">
//        {data.short_desc}
//      </Typography>
//      <Typography>{`₹ ${data.amount}`}</Typography></Box>
//    </CardContent>
//    <CardActions disableSpacing>
//      {/* <IconButton aria-label="add to favorites">
//        <FavoriteIcon />
//      </IconButton> */}
//      {/* <IconButton aria-label="share">
//        <ShareIcon />
//      </IconButton> */}
//      <IconButton
//        className={clsx(classes.expand, {
//          [classes.expandOpen]: expanded,
//        })}
//        onClick={handleExpandClick}
//        aria-expanded={expanded}
//        aria-label="show more"
//      >
//        <ExpandMoreIcon />
//      </IconButton>
//    </CardActions>
//    <Collapse in={expanded} timeout="auto" unmountOnExit>
//      <CardContent>
//        <Typography variant='h5'>Guests: {data.guests}</Typography>
//        {/* <Typography paragraph>
//          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
//          minutes.
//        </Typography> */}
//        <Typography paragraph>
//          {data.long_desc}
//        </Typography>
//        {/* <Typography paragraph>
//          Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
//          without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
//          medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
//          again without stirring, until mussels have opened and rice is just tender, 5 to 7
//          minutes more. (Discard any mussels that don’t open.)
//        </Typography>
//        <Typography>
//          Set aside off of the heat to let rest for 10 minutes, and then serve.
//        </Typography> */}
//      </CardContent>
//    </Collapse>
//  </Card>)}
//  </>
//   );
// }

















const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0',
  },
  image: {
    width: '100%',
    height: '200px', // Set a fixed height for the images
    objectFit: 'cover',
    borderRadius: '1rem',
    margin:"0.5rem 0.5rem 0.5rem 0.5rem"
  },
  main: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    margin: '1rem 0.5rem 1.5rem 0rem',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  text: {
    fontWeight: 600,
  },
  text1: {
    marginTop: '1rem',
    color: theme.palette.text.secondary,
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBar: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
  },
  dateIcon: {
    marginRight: '0.5rem',
    height: '50px',
  },
  price: {
    // backgroundColor: '#F26522',
    // color: 'white',
    // borderRadius: '0.5rem',
    // padding: '0.5rem 1rem',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: '1rem',
  },
  arrow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  longDesc: {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '0.5rem',
    marginTop: '1rem',
  },
}));

export default function Event() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [longDesc,setLongDesc] = useState([])
  const [expanded, setExpanded] = useState({});

  const getToken = localStorage.getItem('access');

  const fetchEvents = async () => {
    try {
      const response = await axios.get(endpoints.get_events, {
        headers: {
          Authorization: 'Bearer ' + getToken,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    // setLongDesc(data.long_desc)
  }, [data]);

  // console.log(data[0].long_desc,"long description")
  useEffect(()=>{
     Object.values(data.map((data,index)=>setLongDesc(data.long_desc)))
  },[])
  
  // console.log("longdescribe",longDesc)

  const handleExpandClick = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const symbol = `₹`;

  const event = {
    photo: 'https://via.placeholder.com/400x200',
    title: 'Music Concert',
    date: 'June 15, 2024',
    price: '$50',
    shortDescription: 'A night of wonderful music.',
    longDescription: 'Join us for an unforgettable night of music featuring renowned artists from around the world. This event promises a blend of classical and contemporary music that will captivate your senses.',
    guestName: 'John Doe',
  };

  return (
    <>
    <Container className={classes.root}>
      {/* {data.map((event) => (
        <Box key={event.id} className={classes.main}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <img
                className={classes.image}
                src={`${base_uri}${event.banner}`}
                alt={event.title}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box className={classes.heading}>
                <Typography variant="h6" className={classes.text}>
                  {event.title}
                </Typography>
              </Box>
              <Typography variant="body2" className={classes.text1}>
                {event.short_desc}
              </Typography>
              <Box className={classes.dateBar}>
                <img
                  className={classes.dateIcon}
                  src="/images/calendar.png"
                  alt="Date icon"
                />
                <Typography variant="body2">{event.date}</Typography>
              </Box>
              <Box className={classes.price}>
                <Typography>{`${symbol}${event.amount}`}</Typography>
              </Box>
              <Box className={classes.arrow}>
                <IconButton onClick={() => handleExpandClick(event.id)}>
                  <ArrowDropDownIcon />
                </IconButton>
              </Box>
              {expanded[event.id] && (
                <Box className={classes.longDesc}>
                  <Typography paragraph>{event.long_desc}</Typography>
                  <Typography variant="h6">Guests: {event.guests}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      ))} */}
    </Container>
    {/* {data.map((data)=><EventDummy
    photo={`${base_uri}${data.banner}`}
    title={data.title}
    date={data.date}
    price={`₹${data.amount}`}
    shortDescription={data.short_desc}
    longDescription={data.long_desc}
    guestName={data.guests}
    />)} */}
    {/* <EventDummy/> */}
   </>
  );
}