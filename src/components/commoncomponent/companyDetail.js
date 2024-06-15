import React,{useState,useEffect} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import axios from "axios";
import endpoints,{base_uri} from "../../api/endpoints";
import SlidingForm from "../feed/SlidingForm";
import Modal from '@material-ui/core/Modal';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import HomeIcon from '@material-ui/icons/Home';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


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
    }
    
}));

export default function CompanyDetail({id}){
    const [data,setData] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    var getToken = localStorage.getItem('access');
    const fetchSpecificCompany = async ()=>{
        const fetch = await axios.get(`${endpoints.get_id_company}${id}`,{
            headers:{
                Authorization : 'Bearer ' + getToken
            }
        })
        // console.log("fetch specific company",fetch.data)
        setData(fetch.data)
    }

    useEffect(()=>{
        fetchSpecificCompany()
    },[])

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <>
        <Container >
            <Box className={classes.top}>
            <img className={classes.topimage} src={`${base_uri}${data.logo}`} alt={data.id}/>
           <Typography className={classes.topHeader} variant="h4">{data.name}</Typography>
            </Box>
            
            <Box className={classes.imageContainer} >
                <img src={`${base_uri}${data.banner}`} className={classes.image} alt={data.id}/>
            </Box>
            <Typography className={classes.heading}>
                {/* GST Number: &nbsp;{data.gst_number} */}
               Heading Of Bharatpreneurs </Typography>
            <Typography className={classes.description} dangerouslySetInnerHTML={{ __html:data.description }}></Typography><br/>
            <Box className={classes.services} >
            <Typography className={classes.heading1}>Services Provided : </Typography>
                <Box className={classes.servicesIN}>
               <Typography className={classes.serviceText}><CheckCircleIcon/> &nbsp;Education</Typography>
                <Typography className={classes.serviceText}><CheckCircleIcon/> &nbsp;HealthCare</Typography>
                <Typography className={classes.serviceText}><CheckCircleIcon/> &nbsp;Finance</Typography>
                <Typography className={classes.serviceText}><CheckCircleIcon/> &nbsp;IT</Typography></Box>
            </Box>
            <Box className={classes.belowText}><Typography className={classes.description}><EmailIcon/> &nbsp;{data.email}</Typography>
            <Typography className={classes.description}><CallIcon/> &nbsp;{data.number}</Typography></Box><br/>
            <Typography className={classes.description}><HomeIcon/> &nbsp;{data.address}</Typography>
            <br/>
            <br/><br/><br/>
            <Box className={classes.apply}>
            <Box className={classes.redirect}>
            <ArrowRightAltIcon/> <a target="_blank" href="https://bharatpreneurs.org/"><Typography className={classes.redirectHeading}>Redirect to Company Website</Typography></a></Box>
            <Button variant="contained" color="primary" type="button" onClick={handleOpen}> &nbsp;Apply &nbsp;
      </Button></Box>
        </Container>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container className={classes.modal}>
        <SlidingForm id={id}/></Container>
      </Modal>
        </>
    )
}