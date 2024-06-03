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



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
}))

export default function GovernmentSchemesTab({setSelectedId}){
    const [data,setData] = useState([]);
    const [search,setSearch] = useState("");
    const classes = useStyles();

    var getToken = localStorage.getItem('access');
    const fetchSchemes = async ()=>{
        try{
        await axios.get(endpoints.GET_ALL_SCHEMES,{
            headers:{
                Authorization : 'Bearer ' + getToken
            }
        }).then((res)=>setData(res.data.data)
            // console.log(res.data.data,"here is response of schemes")
        )
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

    const filter = data.filter((f)=>f.name.toLowerCase().includes(search.toLowerCase()))

    console.log("id in schemes",setSelectedId)
    return(
        <> 
        <Grid container direction="row"  spacing={3}>
            <Grid item xs={8}> <Typography variant="h4">Government Schemes</Typography><hr/>
        <Container className={classes.search}>
          <TextField id="outlined-basic" className={classes.TextArea} size="small" label="Search..." value={search} variant="outlined" fullWidth onChange={handleChange} /> 
          {/* <Button variant="contained" color="primary">Primary</Button> */}
      </Container>
        {/* <h1>I am working In Schemes</h1> */}</Grid>
        <Grid item xs={8}>{filter.map((data)=><GovernmentSchemes card={data} id={data.id} setSelectedId={setSelectedId}/>)}</Grid>
        <Grid item xs={4}><RightTab/></Grid>
        </Grid>
        </>
    )
}