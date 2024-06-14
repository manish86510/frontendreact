import React,{useEffect,useState} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../../styles/commonCompany.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import endpoints from "../../api/endpoints";
import axios from 'axios';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    maincard:{
        display:"flex",
        flexWrap:"wrap",
    },
    maincard11:{
        display:"flex",
        // backgroundColor:"#fafafa",
        // backgroundColor:"rgb(240, 240, 240)",
        // height:'3.5rem',
        // width:'12rem',
        padding:"0.5rem 0.5rem 0.5rem 0rem",
    },
    maincard1:{
        
        margin:'0.5rem',
    },
    label:{
        padding:"0.2rem 0rem 0rem 0.5rem",
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
    search:{
      display:"flex",
      justifyContent:"space-between",
    },
    TextArea:{
      // width:"34rem"
    },
  }));


export default function CommonCompany({id,selectedId}){
  const [data,setData] = useState([])
  const [search,setSearch] = useState("");




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

    // console.log("id in common company",id)

    const classes = useStyles();
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    const tutorialSteps = [
        {
          label: 'HBF',
          image: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          description:"Schemes Indian Government, at all levels, announces Welfare Schemes for a cross section of the society from time to time...",
        },
        {
          label: 'TAIKII',
          image:"https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D",
          description:"Schemes Indian Government, at all levels, announces Welfare Schemes for a cross section of the society from time to time...",
        },
        {
          label: 'AQT',
          image:"https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?cs=srgb&dl=pexels-ingo-188035.jpg&fm=jpg",
          description:"Schemes Indian Government, at all levels, announces Welfare Schemes for a cross section of the society from time to time...",
        },
        {
          label: 'ENORVISION',
          image:"https://png.pngtree.com/background/20210710/original/pngtree-company-profile-corporate-culture-brochure-cross-page-design-background-material-picture-image_1011696.jpg",
          description:"Schemes Indian Government, at all levels, announces Welfare Schemes for a cross section of the society from time to time...",
        },
        {
            label: 'BHARATPRENURS',
            image: "https://watermark.lovepik.com/photo/40155/7604.jpg_wh1200.jpg",
            description:"Schemes Indian Government, at all levels, announces Welfare Schemes for a cross section of the society from time to time...",
          },
          {
            label: 'I AM HERE',
            image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
            description:"Schemes Indian Government, at all levels, announces Welfare Schemes for a cross section of the society from time to time...",
          },
        
      ];

      const handleChange = (e)=>{
        setSearch(e.target.value)
      }

      const filter = data.filter((f)=>f.name.toLowerCase().includes(search.toLowerCase()))

      // console.log("id in common company",id)

      const history = useHistory()

      const handleClick = (id)=>{
        history.push({
          pathname:'/company-detail',
          state:{id}
        });
      }
    

    return(
        <>
        <Typography variant="h4">Company List</Typography><hr/>
        <Container className={classes.search}>
          <TextField id="outlined-basic" className={classes.TextArea} size="small" label="Search..." value={search} variant="outlined" fullWidth onChange={handleChange} /> 
          {/* <Button variant="contained" color="primary">Primary</Button> */}
      </Container>
        
            {filter.map((card,index)=>{
                return <Grid key={card.id} className={classes.topService}><Container><Box className={classes.maincard}><div className={classes.maincard1}>
                    <Box className={classes.maincard11}>
                      <Box className={classes.imageBox}>
                      <img className={classes.image} src={card.image} alt={card.label}/> 
                      </Box>
                    
                    <Container >
                        <Link to="/company-detail" >
                        <Typography variant="h6" className={classes.label} onClick={()=>handleClick(card.id)}
                        >{card.name}{id}</Typography></Link>
                    <Typography className={classes.label} dangerouslySetInnerHTML={{ __html:card.description }}></Typography></Container>
                    
                    </Box>
                </div></Box></Container></Grid>
            })}
            {/* <Box>...More</Box> */}
            
        
        </>
    )
}