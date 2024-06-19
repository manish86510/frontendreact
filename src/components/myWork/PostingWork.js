import React,{useEffect,useState} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MyWorkCard from './MyWorkCard';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import "../../styles/commonCompany.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import endpoints,{base_uri} from "../../api/endpoints";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    search:{
        margin:"4% 0% 4% 0%"
    },
    maincard:{
        display:"flex",
        flexWrap:"wrap",
    },
    maincard11:{
        display:"flex",
        padding:"0.5rem 0.5rem 0.5rem 0rem",
    },
    maincard1:{
        
        margin:'0.5rem',
    },
    label:{
        padding:"0.2rem 0rem 0rem 0.5rem",
        color:"black",
        fontFamily:"Daikon-Bold"
    },
    label1:{
      padding:"0.2rem 0rem 0rem 0.5rem",
      color:"black",
      fontFamily:"Daikon-Regular"
  },
    image:{
        width:"10rem",
        height:"5rem",
        objectFit:"contain"
    },
    topService:{
        backgroundColor: '#fff',
        borderRadius:"0.4rem",
        boxShadow: '0px 0px 10px 0px #ccc',
        width: '100%',
        position:'relative',
        margin:"1rem 1rem 1rem 0rem",
        paddingLeft:"0px",
    },
    nowork:{
        marginTop:"20%",
        marginLeft:"25%"
    },
 
  }));
export default function PostingWork({id}){
    const [search,setSearch] = useState("")
    const [data,setData] = useState([])
    const classes = useStyles();

    var getToken = localStorage.getItem('access');

    const fetchCompanies = async()=>{
        try{
        const companies = await axios.get(endpoints.MY_WORK,{
            headers:{
                Authorization : 'Bearer ' + getToken
            }
        })
        console.log("companies in posting",companies.data)
        setData(companies.data)
    }
    catch(error){
        console.log(error)
    }
    }

    useEffect(()=>{
        fetchCompanies()
    },[])


    const handleChange =(e)=>{
        setSearch(e.target.value)
    }

    const handleClick =(user)=>{
        console.log("id inside of child",user)
        id(user)
    }


    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    // const sliceData = (data)=>{
    //     if(data.length > 120){
    //         return data.slice(0,100) + "..."
    //     }
    //     return data
    // }

    const filter = data.filter((m)=>m.company_name.toLowerCase().includes(search.toLowerCase()))
    return(
        <>
        {data.length>0 ? <Grid >
             <Container className={classes.search}>
          <TextField id="outlined-basic" className={classes.TextArea} size="small" label="Search..." value={search}  variant="outlined" fullWidth onChange={handleChange} /> 
          {/* <Button variant="contained" color="primary">Primary</Button> */}
      </Container>
               {filter.map((data,index)=><Grid key={index} className={classes.topService}> <Link to="/workdetailposting" ><Box onClick={handleClick(data.user)}><Box className={classes.maincard}><div className={classes.maincard1}>
                    <Box className={classes.maincard11}>
                      <Box className={classes.imageBox}>
                      <img className={classes.image} src={`${base_uri}${data.company_logo}`} alt="random"/> 
                      </Box>
                    <Container>
                       
                        <Typography variant="h6" className={classes.label} 
                        // onClick={() => getid(card.id)}
                        // onClick={handleSelect}
                        >{data.company_name}</Typography>
                    <Typography className={classes.label1} >{data.subject}</Typography></Container>
                    </Box>
                </div></Box></Box></Link></Grid>)}
                </Grid> : <Typography variant="h4" className={classes.nowork}>No Work Posted Yet</Typography>}
        </>
    )
}