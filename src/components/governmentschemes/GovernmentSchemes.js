import React,{useEffect,useState} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import endpoints,{base_uri} from "../../api/endpoints";
import axios from "axios";
import TextField from '@material-ui/core/TextField';


const data1 = [
    {
        image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
        name:"Pradhan Mantri aawas yojna",
        description:"Government Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
        name:"Atal Pension Yojana",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
        image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
        name:"FAME India Scheme",
        description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. "
    },
    {
        image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
        name:"National Health Policy",
        description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
    },
    {
        image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
        name:"Food processing Policy",
        description:"Government Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
]

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
        color:"black"
    },
    gridImage:{
        display:"flex",
        justifyContent:"center",
        marginTop:"0.3rem"
    },
    description:{
        // marginRight:"0.5rem",
        margin: '0rem 0.7rem 0rem 0rem'
    },
    paper:{
        marginTop:"4%"
    }
}))

export default function GovernmentSchemesPage(){
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
    // console.log(data,"data of scheme")

    const filter = data.filter((f)=>f.name.toLowerCase().includes(search.toLowerCase()))
    return(
        <>
        <Typography variant="h4">Government Schemes</Typography><hr/>
        <Container className={classes.search}>
          <TextField id="outlined-basic" className={classes.TextArea} size="small" label="Search..." value={search} variant="outlined" fullWidth onChange={handleChange} /> 
          {/* <Button variant="contained" color="primary">Primary</Button> */}
      </Container>
        {/* <h1>I am working In Schemes</h1> */}
        
            {filter.map((data)=><Paper key={data.id} className={classes.paper}>
        <Box className={classes.Box}><Grid container direction="row"  spacing={3}>
            <Grid item xs={3} className={classes.gridImage}><img className={classes.image} src={`${base_uri}${data.banner}`} alt={data.id}/></Grid>
            <Grid item xs={9} >
                <Link to="/component-tabs">
                <Typography variant="h6" className={classes.heading}>{data.name}</Typography></Link>
                <Typography className={classes.description}>{data.short_desc}</Typography>
             </Grid>
            </Grid> </Box>
        </Paper>)}
       
        </>
    )
}