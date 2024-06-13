import React,{useState,useEffect} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RightTab from "../rightTab/RightTab";
import {Link} from "react-router-dom";
import axios from "axios";
import endpoints,{base_uri} from "../../api/endpoints";
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import HomeIcon from '@material-ui/icons/Home';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import ReactQuill from 'react-quill';
import AttachFileIcon from '@material-ui/icons/AttachFile';



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
//         height: '100%',
//         objectFit:"contain",
//         borderRadius:"0.5rem"
//     },
//     heading:{
//         textAlign:"left",
//         padding:"1rem 0rem 1rem 0rem",
//         fontFamily:"Daikon-Bold",
//         fontSize:"large"
//     },
//     heading1:{
//         textAlign:"left",
//         padding:"1rem 0rem 0rem 0rem",
//         fontFamily:"Daikon-Bold",
//         fontSize:"large"
//     },
//     topHeader:{
//         // padding:"1rem",
//         textAlign:"center",
//         padding:"1rem ",
//         fontFamily:"Daikon-Bold",
//     },
//     redirect:{
//         display:"flex"
//     },
//     redirectHeading:{
//         margin:"0rem 0rem 0rem 0.5rem",
//         fontFamily:"Daikon-Bold"
//     },
//     apply:{
//         display:"flex",
//         justifyContent:"space-between"
//     },
//     description:{
//         fontFamily:"Daikon-Regular",
//         display:"flex"
//     },
//     modal:{
//         paddingTop:"6rem",
//         width:"50%"
//     },
//     belowText:{
//         display:"flex",
//         justifyContent:" space-between"
//     },
//     top:{
//         display:"flex",
//         justifyContent:"center"
//     },
//     topimage:{
//         width:"5rem",
//         objectFit:"contain",
//         borderRadius:"1.5rem"
//     },
//     servicesIN:{
//         display:"flex",
//         justifyContent:"space-between",
//         flexWrap:"wrap"
//     },
//     services:{
//         padding:"0rem 0rem 2rem 0rem"
//     },
//     serviceText:{
//         width:'33%',
//         padding:"1rem 0rem 0rem 0rem",
//         // margin: '0rem 8rem 0rem 0rem',
//         display:"flex",
//         fontFamily:"Daikon-Regular",
//     },
//     iconText:{
//         display:"flex",
//         // flexDirection:"column"
//     }
    
// }));

// export default function MyWorkDetailPosted(){
//     const [expanded, setExpanded] = useState({});
//     const [isOverflowing, setIsOverflowing] = useState({});

//     const classes = useStyles();

//     var getToken = localStorage.getItem('access');
//     const fetchData = async ()=>{
//         try{
//         const fetch = await axios.get(endpoints.MY_WORK,{
//             headers:{
//                 Authorization: 'Bearer ' + getToken
//             }
//         })

//         console.log("fetched Data",fetch.data)
//     }
//     catch(error){
//         console.log(error)
//     }

//     }

//     useEffect(()=>{
//         fetchData()
//     },[])

//     // useEffect(() => {
//     //     const checkOverflow = () => {
//     //       const newIsOverflowing = {};
//     //       data.forEach(event => {
//     //         const element = document.getElementById(`long-desc-${event.id}`);
//     //         if (element) {
//     //           newIsOverflowing[event.id] = element.scrollHeight > element.clientHeight;
//     //         }
//     //       });
//     //       setIsOverflowing(newIsOverflowing);
//     //     };
    
//     //     checkOverflow();
//     //     window.addEventListener('resize', checkOverflow);
    
//     //     return () => {
//     //       window.removeEventListener('resize', checkOverflow);
//     //     };
//     //   }, [data]);
    
//     //   const toggleExpand = (id) => {
//     //     setExpanded((prevExpanded) => ({
//     //       ...prevExpanded,
//     //       [id]: !prevExpanded[id],
//     //     }));
//     //   };
    
//     const { pathname } = useLocation();
//     useEffect(() => {
//       window.scrollTo(0, 0);
//     }, [pathname]);
   
//     return(
//         <>
//         <h1>Posting Work</h1>
//         <Grid container direction="row"  spacing={3}>
//         <Grid xs={8}><Container >
//             <Box className={classes.top}>
//             <img className={classes.topimage} src="https://media.contentapi.ea.com/content/dam/eacom/lost-in-random/images/2021/06/lost-in-random-feature-image-16x9.jpg.adapt.crop16x9.1023w.jpg" 
//             alt="random"/>
//            <Typography className={classes.topHeader} variant="h4">Heading Of Company</Typography>
//             </Box>        
//             <Typography className={classes.heading}>
//                Subject Of Work </Typography>
//             <Typography className={classes.description} >Description Of Work</Typography><br/> 
//             <Typography className={classes.description} >Attachment Here</Typography><br/> 
//             {/* <div
//             id={`long-desc-${event.id}`}
//             style={expanded[event.id] ? expandedDescStyle : longDescStyle}
//             dangerouslySetInnerHTML={{ __html: event.long_desc }}
//           >
//           </div>
//           {isOverflowing[event.id] && (
//             <span
//               style={readMoreStyle}
//               onClick={() => toggleExpand(event.id)}
//             >
//               {expanded[event.id] ? ' Show less' : '...Read more'}
//             </span>
//           )}            */}
//         </Container></Grid>
//         <Grid xs={4}><RightTab/></Grid>
//         </Grid>
//         </>
//     )
// }





const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(2),
      border: '1px solid #ccc',
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(2),
    //   backgroundColor:"whitesmoke"
    //   backgroundColor:"ghostwhite"
      backgroundColor:"white"
    },
    description: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical',
    },
    image111:{
        width:"5rem"
    },
    top:{
        display:"flex"
    },
    companyName:{
        paddingLeft:"1rem"
    },
    imageContainer:{
        width:'100%',
        height:"100%",
        overflow:"hidden",
    },
    image:{
        width: '100%',
        height: '100%',
        objectFit:"contain",
        borderRadius:"0.5rem"
    },
    heading:{
        textAlign:"left",
        padding:"1rem 0rem 1rem 0rem",
        fontFamily:"Daikon-Bold",
        fontSize:"large"
    },
    heading1:{
        textAlign:"left",
        padding:"1rem 0rem 0rem 0rem",
        fontFamily:"Daikon-Bold",
        fontSize:"large"
    },
    topHeader:{
        // padding:"1rem",
        textAlign:"center",
        padding:"1rem ",
        fontFamily:"Daikon-Bold",
    },
    redirect:{
        display:"flex"
    },
    redirectHeading:{
        margin:"0rem 0rem 0rem 0.5rem",
        fontFamily:"Daikon-Bold"
    },
    apply:{
        display:"flex",
        justifyContent:"space-between"
    },
    description:{
        fontFamily:"Daikon-Regular",
        display:"flex"
    },
    modal:{
        paddingTop:"6rem",
        width:"50%"
    },
    belowText:{
        display:"flex",
        justifyContent:" space-between"
    },
    top:{
        display:"flex",
        justifyContent:"center"
    },
    topimage:{
        width:"5rem",
        objectFit:"contain",
        borderRadius:"1.5rem"
    },
    servicesIN:{
        display:"flex",
        justifyContent:"space-between",
        flexWrap:"wrap"
    },
    services:{
        padding:"0rem 0rem 2rem 0rem"
    },
    serviceText:{
        width:'33%',
        padding:"1rem 0rem 0rem 0rem",
        // margin: '0rem 8rem 0rem 0rem',
        display:"flex",
        fontFamily:"Daikon-Regular",
    },
    iconText:{
        display:"flex",
        // flexDirection:"column"
    },
    show:{
        cursor:"pointer",
        fontWeight:"550"
    },
    header:{
      display:"flex",
    },
    header1:{
      fontFamily:"Daikon-Bold",
      marginBottom:"1%"
    },
    header2:{
      fontFamily:"Daikon-Regular",
    },
    header3:{
      marginTop:"2%",
      display: 'flex',
      justifyContent: 'space-between',
    },
    textEditor:{
      marginTop:"2%",
    },
    post:{
      marginTop:"2%",
    },
    icon:{
      cursor:"pointer",
    },
    attachment:{
      display:"flex"
    },
    attachmenttext:{
      fontFamily:"Daikon-Regular",
      cursor:"pointer",
    }
  }));
  
  const Card = () => {
    const [data,setData] = useState([]);
    const [attachmentURL,setAttachmentURL] = useState(null);

    const classes = useStyles();
    const [expandedItems, setExpandedItems] = useState({});

    var getToken = localStorage.getItem('access');

    const fetchCompanies = async()=>{
        try{
        const companies = await axios.get(endpoints.MY_WORK,{
            headers:{
                Authorization : 'Bearer ' + getToken
            }
        })
        console.log("companies in posting detail",companies.data)
        setData(companies.data)

        const attachmentURL = await axios.get(`${base_uri}${companies.data[1].attachment}`,{
          headers:{
            Authorization:"Bearer " + getToken
          },
          responseType:'blob'
        })

        console.log("url 371",attachmentURL)
        const url = URL.createObjectURL(attachmentURL.data)
        console.log("url 373",url)
        setAttachmentURL(url)
    }
    catch(error){
        console.log(error)
    }
    }

    useEffect(()=>{
        fetchCompanies()
    },[])

    const toggleDescription = (index) => {
        setExpandedItems((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
        }));
      };
  
    // const openAttachment = () => {
    //   window.open(attachment, '_blank');
    // };
    

//     const data = [{
//         id:1,
//         companyName:"Enorvision",
//         logo:"https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000033063/83b19e19e8f0ddd4c098f8a075bc85b3957a6041eaca83a186b8dc9c15e68db2",
//         subject:"Subject 1",
//         description:"Lost in Random was released on September 10, 2021. I randomly came across IGN's review on Youtube and decided to play it on my switch. I just finished it and I ABSOLUTELY loved it.",
//     },
//     {
//         id:2,
//         companyName:"HBF",
//         logo:"https://i.kinja-img.com/image/upload/c_fill,h_900,q_60,w_1600/93ba769837af538161278ffb5ee69d01.jpg",
//         subject:"Subject 2",
//         description:"Lost in Random was released on September 10, 2021. I randomly came across IGN's review on Youtube and decided to play it on my switch. I just finished it and I ABSOLUTELY loved it.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     },
//     {
//         id:3,
//         companyName:"AQT",
//         logo:"https://images.immediate.co.uk/production/volatile/sites/3/2021/09/Lost-in-Random-2-sequel-spinoff-6626bda.jpg?quality=90&resize=620,414",
//         subject:"Subject 3",
//         description:"Lost in Random was released on September 10, 2021. I randomly came across IGN's review on Youtube and decided to play it on my switch. I just finished it and I ABSOLUTELY loved it.",
//     },
// ]
  
    return (
        <>
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}>
                <h1>Messages</h1>
                {data.map((data)=><Paper><div className={classes.card}>
                  <Box className={classes.header}>
        <Typography variant="subtitle1" className={classes.header1}>{data.subject}</Typography>
        {/* <Typography variant="subtitle1">Attachment</Typography> */}
        </Box>
             <Typography variant="body2" className={classes.header2}>
              {/* {data.description?.length > 100 ? (expandedItems[data.id] ? data.description : `${data.description?.substring(0, 100)}...`) : data.description} */}
              {data.description}
            </Typography>
            <Box className={classes.header3}>
              <Box className={classes.attachment} onClick={() => window.open(attachmentURL, '_blank')}>
              <AttachFileIcon className={classes.icon} /><Typography className={classes.attachmenttext}>Attachment</Typography></Box>
            {/* <Button variant="contained" color="primary" onClick={() => window.open(data.pdfUrl, '_blank')}>
                  Open PDF
                </Button> */}
               {expandedItems[data.id] ?<Button variant="contained" color="primary" onClick={() => toggleDescription(data.id)}>
                  Close
                </Button> :<Button variant="contained" color="primary" onClick={() => toggleDescription(data.id)}>
                  Reply
                </Button>} 
                </Box>
            {/* {data.description?.length > 100 && (
              <Typography className={classes.show}  onClick={() => toggleDescription(data.id)}>
                {expandedItems[data.id] ? 'Show less' : 'Show more'}
              </Typography>
            )} */}
        {/* <Button onClick={openAttachment}>Open Attachment</Button> */}
        {expandedItems[data.id] ? <><Box className={classes.textEditor}><ReactQuill/></Box><Button variant="contained" color="primary" className={classes.post}>
                  Post
                </Button> </>: ""}
      </div></Paper>)}
      </Grid>
      <Grid item xs={4}><RightTab/></Grid>
      </Grid>
      </>
    );
  };
  
  export default Card;