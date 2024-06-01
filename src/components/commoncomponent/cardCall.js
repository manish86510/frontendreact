import React,{ useState,useEffect } from "react";
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import CardCommon from "./cardCommon";
import { useScrollTrigger } from "@material-ui/core";
import endpoints from "../../api/endpoints";
import axios from 'axios';


export default function CardCall(){

    const [data,setData] = useState([])

    var getToken = localStorage.getItem('access');
  const getCompany = async ()=>{
    try{
      await axios.get(endpoints.get_allCompany,{
        headers:{
          Authorization: 'Bearer ' + getToken,
        }
      }).then((res)=>setData(res.data)
        // console.log(res.data,"here is response")
      )
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getCompany()
  },[])

//   console.log("dataaaa",data)


    return(
        <>
        <Grid container direction="row"  spacing={3} >
        <Grid item xs={8}>{data.map((m)=><CardCommon card={m}/>)}</Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}