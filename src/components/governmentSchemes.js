import React,{useState,useEffect} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LanguageIcon from '@material-ui/icons/Language';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import axios from 'axios';
import endpoints,{base_uri} from "../api/endpoints";
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    maincard:{
        display:"flex",
        flexWrap:"wrap",
        // justifyContent:"space-evenly",
    },
    maincard11:{
        display:"flex",
        // backgroundColor:"#fafafa",
        // backgroundColor:"rgb(240, 240, 240)",
        border:'1px solid darkgray',
        borderRadius:"1rem",
        height:'3.5rem',
        width:'12rem',
        padding:"0.5rem",
        textDecoration:"none",
    },
    maincard1:{
        
        margin:'0.5rem',
    },
    // label:{
    //     padding:"0.2rem 0rem 0rem 0.5rem",
    //     color:"black",
    // },
    icons:{
        // width:"2rem",
        // height:"rem"
        fontSize: 'xx-large'
    },
    icons1:{
        // backgroundColor: 'rosybrown',
        color: 'black',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0.3rem'
    },
    topService:{
        backgroundColor: '#fff',
        borderRadius:"1rem",
        boxShadow: '0px 0px 10px 0px #ccc',
        width: '100%',
        position:'relative',
        padding:"0.5rem"
    },
    heading:{
      padding:"0.5rem 0rem 0rem 1rem",
    },
    image:{
      width: '3rem'
    },
    label:{
      fontFamily:"Daikon-Regular",
      color:"black",
      padding:"0rem 0rem 0rem 0.5rem",
      overflow:"hidden",
      textOverflow:"ellipsis",
    },
    loader:{
      // margin:"10% 0% 5% 50%"
      display:"flex",
      justifyContent:"center"
    }
  }));


export default function GovernmentSchemes(){
    const [data,setData] = useState([]);
    const classes = useStyles();

    var getToken = localStorage.getItem('access');
    const fetchScheme = async ()=>{
      try{
      const res = await axios.get(endpoints.GET_ALL_SCHEMES,{
        headers : {
          Authorization : 'Bearer ' + getToken
        }
      }) 
      setData(res.data.data.slice(0,9))
        // console.log("response of schemes" ,res.data.data)
    }
    catch(error){
      console.log(error)
    }
    }

    useEffect(()=>{
      fetchScheme()
    },[])

    // console.log(data)

      const history = useHistory();

      const handleClick = (id) => {
        history.push({
          pathname: '/component-tabs',
          state: { id }
        });
      };
      
      const DataSlice =(data,label)=>{
        if(data.length>20){
          return data.slice(0,label) + "..."
        }
        else{
          return data
        }
      }

    return(
        <>
        {data.length>0 ? <Grid className={classes.topService}>
            <Container>
        <Typography  variant="h6" style={{fontFamily:"Daikon-Bold"}}>Government Schemes</Typography><hr/>
            <Box className={classes.maincard}>{data.map((card,index)=>{
                return <div key={index} className={classes.maincard1} onClick={() => handleClick(card.id)} >
                    <Box >
                    <Link to="/component-tabs" className={classes.maincard11}>
                    <Box className={classes.icons1} >
                      {/* {card.icons} */}
                      <img className={classes.image} src={`${base_uri}${card.banner}`}
                      alt={card.id}/>
                      </Box>
                    <Box className={classes.label}>{DataSlice(card.name,20)}
                      {/* {card.name} */}
                      </Box></Link>
                    </Box>
                </div>
            })}</Box>
            {/* <Box>...More</Box> */}
            </Container>
        </Grid> :[]
        //  <Box className={classes.loader}> <CircularProgress  color="secondary" /></Box>
         }
        
        </>
    )
}
