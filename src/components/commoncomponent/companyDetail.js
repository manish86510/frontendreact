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

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


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
        textAlign:"center",
        padding:"1rem 0rem 1rem 0rem",
        fontFamily:"Daikon-Bold"
    },
    topHeader:{
        // padding:"1rem",
        textAlign:"center",
        padding:"1rem",
        fontFamily:"Daikon-Bold"
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
        fontFamily:"Daikon-Regular"
    },
    modal:{
        paddingTop:"6rem",
        width:"50%"
    },
    
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
           <Typography className={classes.topHeader} variant="h4">{data.name}</Typography>
            
            <Box className={classes.imageContainer} >
                <img src="https://bharatpreneurs.org/images/mainh.webp" alt="imageishere" className={classes.image}/>
            </Box>
            <Typography variant="h4" className={classes.heading}>Here Is Heading Of Bharatpreneurs</Typography>
            <Typography className={classes.description}>{data.description}</Typography><br/>
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
        <SlidingForm/></Container>
      </Modal>
        </>
    )
}