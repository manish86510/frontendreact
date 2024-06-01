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
        padding:"1rem 0rem 1rem 0rem"
    },
    topHeader:{
        // padding:"1rem",
        textAlign:"center",
        padding:"1rem"
    },
    redirect:{
        display:"flex"
    },
    redirectHeading:{
        margin:"0rem 0rem 0rem 0.5rem"
    },
    apply:{
        display:"flex",
        justifyContent:"space-between"
    }
}));

export default function CompanyDetail({id}){
    const [data,setData] = useState([])
    const classes = useStyles();

    var getToken = localStorage.getItem('access');
    const fetchSpecificCompany = async ()=>{
        const fetch = await axios.get(`${endpoints.get_id_company}4`,{
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

    console.log("specific data",data)
    return(
        <>
        <Container>
            <Container className={classes.topHeader}><Typography variant="h4">{data.name}</Typography></Container>
            
            <Box className={classes.imageContainer} >
                <img src="https://bharatpreneurs.org/images/mainh.webp" alt="imageishere" className={classes.image}/>
            </Box>
            <Typography variant="h4" className={classes.heading}>Here Is Heading Of Bharatpreneurs</Typography>
            <Typography>{data.description}</Typography><br/>
            
            {/* <Typography> At Bharatpreneurs, our diverse exhibition stalls cater to three pivotal sectors. Explore finance and funding with leading banks, finance companies, and management consultants. Delve into technology and operations with legal services, IT firms, and cutting-edge cloud and data companies. Lastly, engage with cutting-edge Media and Marketing companies, spanning media outlets, branding agencies, digital marketing, and brand management. Join us for a convergence of industries, fostering collaboration and innovation in the heart of Indian entrepreneurship.
            </Typography> */}
            <br/><br/><br/>
            <Box className={classes.apply}>
            <Box className={classes.redirect}>
            <ArrowRightAltIcon/> <a target="_blank" href="https://bharatpreneurs.org/"><Typography className={classes.redirectHeading}>Redirect to Company Website</Typography></a></Box>
            <Button variant="contained" color="primary"> &nbsp;Apply &nbsp;
      </Button></Box>
        </Container>
        </>
    )
}