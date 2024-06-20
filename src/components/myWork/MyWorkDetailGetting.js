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
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import HomeIcon from '@material-ui/icons/Home';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import ReactQuill from 'react-quill';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Button from '@material-ui/core/Button';



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
      attachmenttext:{
        fontFamily:"Daikon-Regular",
        cursor:"pointer",
      },
      attachment:{
        display:"flex"
      },
      message:{
        margin:"1%"
      }
    
}));

export default function MyWorkDetailGetting({idWorkGetting}){

    const [data,setData] = useState([]);
    const [attachmentURL,setAttachmentURL] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});

    const classes = useStyles();
    // console.log("getting id of myget work",getId)
    // console.log("getting id from state and app.js",idWorkGetting)


    var getToken = localStorage.getItem('access');
    const fetchData = async ()=>{
        try{
        const fetch = await axios.get(endpoints.USER_APPLY_COMPANY,{
            headers:{
                Authorization: 'Bearer ' + getToken
            }
        })

        // console.log("fetched Data",fetch.data)
        setData(fetch.data)
        // console.log("url of pdf",`${base_uri}${fetch.data[2].attachment}`)
        const attachmentURL = await axios.get(`${base_uri}${fetch.data[2].attachment}`,{
            headers: {
                Authorization:'Bearer ' + getToken
            },
            responseType: 'blob'
        })
        // console.log("attachment url 200",attachmentURL)
        // console.log("Blob type:", attachmentURL.data.constructor.name);
        const url = URL.createObjectURL(attachmentURL.data)
        // console.log("attachment 202",url)
        setAttachmentURL(url)
    }
    catch(error){
        console.log(error)
    }

    }

    useEffect(()=>{
        fetchData()
    },[])

    // console.log("here is get data",data)
    // console.log("here is attachment line 215",attachmentURL)

    const toggleDescription = (index) => {
        setExpandedItems((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
        }));
      };
    
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
   
    return(
        <>
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}>
        <Container >
            <Box className={classes.top}>
            <img className={classes.topimage} src="https://bharatpreneurs.org/images/mainh.webp" alt={data.id}/>
           <Typography className={classes.topHeader} variant="h4">Company Name</Typography>
            </Box>
            
            <Box className={classes.imageContainer} >
                <img src="https://bharatpreneurs.org/images/mainh.webp" className={classes.image} alt={data.id}/>
            </Box>
            <Typography className={classes.heading}>
                {/* GST Number: &nbsp;{data.gst_number} */}
               Heading Of Bharatpreneurs </Typography>
            <Typography className={classes.description} > Description Of Bharat</Typography><br/>
            <Box className={classes.services} >
            <Typography className={classes.heading1}>Services Provided : </Typography>
                <Box className={classes.servicesIN}>
               <Typography className={classes.serviceText}><CheckCircleIcon/> &nbsp;Education</Typography>
                <Typography className={classes.serviceText}><CheckCircleIcon/> &nbsp;HealthCare</Typography>
                <Typography className={classes.serviceText}><CheckCircleIcon/> &nbsp;Finance</Typography>
                <Typography className={classes.serviceText}><CheckCircleIcon/> &nbsp;IT</Typography></Box>
            </Box>
            <Box className={classes.belowText}><Typography className={classes.description}><EmailIcon/> &nbsp;dummy@dummy.com</Typography>
            <Typography className={classes.description}><CallIcon/> &nbsp;1234567890</Typography></Box><br/>
            <Typography className={classes.description}><HomeIcon/> &nbsp;dummy address</Typography>
            <br/>
            <br/><br/><br/>
        </Container>
                <Typography variant="h4" className={classes.message}>Messages</Typography>
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
              {/* <embed src={attachmentURL} type="application/pdf" width="100%" height="600px" /> */}
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
    )
}