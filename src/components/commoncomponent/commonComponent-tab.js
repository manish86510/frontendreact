import React,{useEffect,useState} from "react";
import CommonComponent from "./commonComponent";
import Posts from '../Posts/posts';
import Feed from '../feed/feed';
import Projects from '../feed/projects';
import RightTab from "../rightTab/RightTab";
import Grid from '@material-ui/core/Grid';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import endpoints from "../../api/endpoints";


export default function ComponentTabs(){

  const [data,setData] = useState([]);
  const [id,setId] = useState("")

    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    var getToken = localStorage.getItem('access');
    const fetchSchemesData = async ()=>{
        await axios.get(endpoints.get_id_schemes,{
            headers:{
                Authorization : 'Bearer ' + getToken
            }
        }).then((res)=>setData(res.data)
            // console.log("response governmentSchemes",res.data)
        )
    }

    useEffect(()=>{
        fetchSchemesData()
    },[])

    // console.log("data in govt schemes",data)

    return(
        <>
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}><CommonComponent card={data}/></Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}