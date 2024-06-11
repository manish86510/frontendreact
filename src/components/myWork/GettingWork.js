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
        marginTop:"1rem"
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
 
  }));


export default function GettingWork(){
    const [search,setSearch] = useState("");
    const [data,setData] = useState([])
    const classes = useStyles();

    // const data1 = [
    //     {
    //         image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
    //         name:"Pradhan Mantri aawas yojna",
    //         description:"Government Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    //     },
    //     {
    //         image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
    //         name:"Atal Pension Yojana",
    //         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    //     },
    //     {
    //         image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
    //         name:"FAME India Scheme",
    //         description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. "
    //     },
    //     {
    //         image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
    //         name:"National Health Policy",
    //         description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
    //     },
    //     {
    //         image:"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Slideshows/_production/ss-090623-alice-wonderland/ss-090623-alice-wonderland-.jpg",
    //         name:"Food processing Policy",
    //         description:"Government Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    //     }
    // ]

    var getToken = localStorage.getItem('access');

    const fetchCompanies = async()=>{
        const companies = await axios.get(endpoints.USER_APPLY_COMPANY,{
            headers:{
                Authorization : 'Bearer ' + getToken
            }
        })
        // console.log("companies",companies.data)
        setData(companies.data)
    }

    useEffect(()=>{
        fetchCompanies()
    },[])

    const handleChange =(e)=>{
        setSearch(e.target.value)
    }

    console.log("companies data",data)
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    const sliceData = (data)=>{
        if(data.length > 65){
            return data.slice(0,60) + "..."
        }
        return data
    }

    // const filter = data.filter((m)=>m.name.toLowerCase().includes(search.toLowerCase()))

    return(
        <>  
             <Grid >
             <Container className={classes.search}>
          <TextField id="outlined-basic" className={classes.TextArea} size="small" label="Search..." value={search}  variant="outlined" fullWidth onChange={handleChange} /> 
          {/* <Button variant="contained" color="primary">Primary</Button> */}
      </Container>
               {data.map((data,index)=><Grid key={index} className={classes.topService}><Link to="/workdetailgetting" ><Box><Box className={classes.maincard}><div className={classes.maincard1}>
                    <Box className={classes.maincard11}>
                      <Box className={classes.imageBox}>
                      <img className={classes.image} src={data.image} alt="random"/> 
                      </Box>
                    <Container>
                        
                        <Typography variant="h6" className={classes.label} 
                        // onClick={() => getid(card.id)}
                        // onClick={handleSelect}
                        >{data.company_name}</Typography>
                    <Typography className={classes.label1} >{sliceData(data.form_subject)}</Typography></Container>
                    </Box>
                </div></Box></Box></Link></Grid>)}
                </Grid>
        </>
    )
}