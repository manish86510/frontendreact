import React,{useState,useEffect} from "react";
import GovernmentSchemes from "./GovernmentSchemes";
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import endpoints,{base_uri} from "../../api/endpoints";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    Box:{
        backgroundColor:"white",
        // height:"4%",
        borderRadius:"0.5rem"
    },
    image:{
        width:"8rem",
        height:"8rem",
        // ObjectFit:"contain",
        
    },
    heading:{
        fontWeight:600,
        textDecoration:"none",
        color:"black",
        fontFamily:"Daikon-Bold"
    },
    gridImage:{
        display:"flex",
        justifyContent:"center",
        marginTop:"0.3rem"
    },
    description:{
        // marginRight:"0.5rem",
        margin: '0rem 0.7rem 0rem 0rem',
        fontFamily:"Daikon-Regular"
    },
    paper:{
        marginTop:"4%",
        cursor:"pointer",
    },
    loader:{
        padding:"20% 0% 0% 45%"
    }
}))

export default function GovernmentSchemesTab(){
    const [data,setData] = useState([]);
    const [search,setSearch] = useState("");
    const [sliced,setSliced]= useState("")
    const classes = useStyles();

    var getToken = localStorage.getItem('access');
    const fetchSchemes = async ()=>{
        try{
       const fetch =  await axios.get(endpoints.GET_ALL_SCHEMES,{
            headers:{
                Authorization : 'Bearer ' + getToken
            }
        })
        setData(fetch.data.data)
            // console.log(fetch.data.data,"here is response of schemes")
        
    }
    catch(error){
        console.log(error)
    }
    }

    useEffect(()=>{
        fetchSchemes()
    },[])

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }
    // console.log(data[0].id,"data of govt scheme")

    const filter = data.filter((f)=>f.name.toLowerCase().includes(search.toLowerCase()));

    const history = useHistory();

    const handleClick = (id) => {
      history.push({
        pathname: '/govt-description',
        state: { id }
      });
    };

    const cutItShort = (data,limit)=>{
        if (data.length> limit){
            return data.slice(0,limit) + "..." ;
        }
        return data
    }

    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return(
        <> 
        <Grid container direction="row"  spacing={3}> 
        {data.length > 0 ?<> <Grid item xs={8}> <Typography variant="h4">Government Schemes</Typography><hr/>
        <Container className={classes.search}>
          <TextField id="outlined-basic" className={classes.TextArea} size="small" label="Search..." value={search} variant="outlined" fullWidth onChange={handleChange} /> 
      </Container>
      {filter.map((data)=> <Paper key={data.id}  className={classes.paper} onClick={() => handleClick(data.id)}>
        <Box className={classes.Box}><Grid container direction="row"  spacing={3}>
            <Grid item xs={3} className={classes.gridImage}><img className={classes.image} src={`${base_uri}${data.banner}`} alt="random name"/></Grid>
            <Grid item xs={9} >
                <Link to="/govt-description">
                <Typography variant="h6" className={classes.heading} >{data.name}</Typography></Link>
                <Typography className={classes.description} dangerouslySetInnerHTML={{ __html:cutItShort(data.short_desc,110) }}></Typography>
             </Grid>
            </Grid> </Box>
        </Paper> )}
        </Grid>
        
         </>: <Grid item xs={8}> <Box className={classes.loader}> <CircularProgress  color="secondary" /></Box></Grid>}
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}