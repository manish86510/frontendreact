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


const useStyles = makeStyles((theme) => ({
  search:{
    display:"flex",
    justifyContent:"space-between",
  },
  TextArea:{
    // width:"34rem"
  },
}))


export default function CardCall({setSelectedId}){

    const [data,setData] = useState([]);
    const [search,setSearch] = useState("")
    

    const classes = useStyles();
    var getToken = localStorage.getItem('access');
  const getCompany = async ()=>{
    try{
      const res = await axios.get(endpoints.get_allCompany,{
        headers:{
          Authorization: 'Bearer ' + getToken,
        }
      })
      setData(res.data)
        // console.log(res.data,"here is response")
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

   const filter = data.filter((f)=>f.name.toLowerCase().includes(search.toLowerCase()))

  // console.log("setselected id",setSelectedId)


    return(
        <>
        <Grid container direction="row"  spacing={3} >
          <Grid item xs={8}>
          <Typography variant="h4">Company List</Typography><hr/>
        <Container className={classes.search}>
          <TextField id="outlined-basic" className={classes.TextArea} size="small" label="Search..." value={search} variant="outlined" fullWidth onChange={handleChange} /> 
          {/* <Button variant="contained" color="primary">Primary</Button> */}
      </Container>
          </Grid>
        <Grid item xs={8}>{filter.map((m)=><CardCommon card={m} id={m.id} setSelectedId={setSelectedId} />)}</Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}