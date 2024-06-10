import React,{ useState,useEffect } from "react";
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import CardCommon from "./cardCommon";
import { useScrollTrigger } from "@material-ui/core";
import endpoints from "../../api/endpoints";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Container } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  search:{
    display:"flex",
    justifyContent:"space-between",
  },
  TextArea:{
    // width:"34rem"
  },
  loader:{
    // display:"flex",
    // justifyContent:"center",
    // textAlign:"center",
    padding:"20% 0% 0% 30%"
  },
  heading:{
    fontFamily:"Daikon-Bold"
  }
}))


export default function CardCall({setSelectedId}){

    const [data,setData] = useState(null);
    const [search,setSearch] = useState("");
    const location = useLocation();
    const history = useHistory();
   
    useEffect(() => {
      if (location.state && location.state.id) {
        getCompany(location.state.id);
        console.log("here is issss",location.state.id)
      } else {
        history.push("/");  // Redirect to home if no state is found
      }
    }, [location.state]);

    const classes = useStyles();
    var getToken = localStorage.getItem('access');
  const getCompany = async (id)=>{
    try{
      const res = await axios.get(`${endpoints.get_id_company_services}${id}/companies/`,{
        headers:{
          Authorization: 'Bearer ' + getToken,
        }
      })
      setData(res.data.data)
        console.log(res.data.data,"here is response")
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getCompany()
  },[])

  

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }
  

   const filter = data!==null ? data.filter((f)=>f.name.toLowerCase().includes(search.toLowerCase())) : [];

  // console.log("setselected id",setSelectedId)


    return(
        <>
        {data!== null ? <Grid container direction="row"  spacing={3} >
          <Grid item xs={8}>
          <Typography variant="h4" className={classes.heading}>Company List</Typography><hr/>
        <Container className={classes.search}>
          <TextField id="outlined-basic" className={classes.TextArea} size="small" label="Search..." value={search} variant="outlined" fullWidth onChange={handleChange} /> 
        {/* <Button variant="contained" color="primary">Primary</Button> */}
      </Container>
          </Grid>
        <Grid item xs={8}>{filter.map((m)=><CardCommon card={m} id={m.id} setSelectedId={setSelectedId} />)}</Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>:<Box className={classes.loader}> <CircularProgress  color="secondary" /></Box>}

        </>
    )
}