import React,{useState,useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Services from "./services";
import axios from "axios";
import DoneIcon from '@material-ui/icons/Done';
import endpoints,{base_uri} from "../../api/endpoints";
import toast, { Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Label } from "@material-ui/icons";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toplist:{
    width:"46%",
    margin:"0.5rem 0.5rem 0.5rem 0.5rem",
  }
}));
function CompanyProfile(){
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [tableData,setTableData] = useState([]);
    const [mode,setMode] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [dropOpen, setDropOpen] = useState(true);
    const [currency, setCurrency] = useState('');
    const [industry,setIndustry] = useState([])
    
    // const [id,setId] = useState(null)
    // const [getIdData,setGetIdData] = useState(null)
    // const [expand,setExpand] = useState([]);
    const [cform,setCForm] = useState({
      name: '',
      email: '',
      number: '',
      gst_number: '',
      reg_number: '',
      reg_date: '',
      sector: '',
      description : '',
      address: '',
      banner: null,
      logo:null,
      industry_name:'',
      // Portfolio: '',
  });
    const [sform,setSform] = useState({
      name :"",
      short_description : "",
      banner:null
      // long_desc : ""
    })


    
    const getToken = localStorage.getItem('access');
    const getData = localStorage.getItem('userInfo')
    const jsData = JSON.parse(getData);
    // setId(jsData.pk)
    const id = jsData.pk
    // console.log('line 59',id)
    
    const getIndustry = async ()=>{
      try{
        const indus = await axios.get(endpoints.get_industry,{
          headers:{
            Authorization : 'Bearer ' + getToken
          }
        })
        // console.log("industry",indus.data.data)
        setIndustry(indus.data.data)
        // setCurrency(indus.data.data)
      }
      catch(error){
        console.log(error)
      }
    }

    // console.log("here industry",industry)

    useEffect(()=>{
      getIndustry()
    },[])

    useEffect(()=>{
      const getId = async ()=>{
        try{
        const gettingId = await axios.get(`${endpoints.GET_USER_COMPANY}`,{
          headers:{
            Authorization : 'Bearer ' + getToken
          }
        })

        const data = gettingId.data
        // console.log("getting data in form" , data)
        setFormSubmitted(true)
        
        // setGetIdData(gettingId.data)
        // const gData = gettingId.data
        // console.log("here gdata",gData)
              // setCForm({...gData})     
              // data.description = data.description || ''; // handle null value
  
             
              setCForm(data) 
              setMode('getting')  
              // console.log("inside form in getting data",cform)    
              // const getValues = Object.values(cform)
              // setTableData(getValues)
              // console.log("values of cform", getValues)
              // console.log("type of cform", typeof getValues)
              // console.log("here are values of cform",tableData) 
              // console.log("here is type of cform",typeof tableData) 
              
            
      }
      catch(error){
        console.log(error)
      }
  
      }
      
      getId()
    },[id,getToken])

   

    

    // console.log("after useeffect",cform)
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      // const handleChange = (e) => {
      //   const {name,value} = e.target;
      //   // setCForm({...cform,[name]:value})
      //   setCForm((prevCForm)=>({
      //     ...prevCForm, [name]:value
      //   }))
      //   console.log("in handle change",e.target.value);
      //   console.log('cform', cform)
      // }


      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "industry_name") {
          // If the field is industry_name, directly set the value
          setCForm({ ...cform, [name]: value });
        } 
        else {
          // For other fields, update the state as before
          setCForm((prevCForm) => ({
            ...prevCForm,
            [name]: value,
          }));
        }
      };
      

  //     const handleSelect = (e)=>{
  //       let value = e.target.value
  //       console.log(value, 'value')
  //  setCForm((prevCForm)=>({
  // ...prevCForm, industry_name:value
  //  }))
  //  console.log(cform)
  //     }

      // useEffect(() => {
      //   console.log("Updated cform:", cform);
      // }, [cform]);


      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setCForm({ ...cform, [name]: files[0] });
      };
      const handleFileChange1 = (e) => {
        const { name, files } = e.target;
        setSform({ ...sform, [name]: files[0] });
      };

      const handleChange1 = (e) => {
        const {name,value} = e.target;
        setSform({...sform, [name]:value})
      }

    const handleEditorChange = (name, value) => {
      setCForm({
        ...cform,
        [name]: value,
      });
    };

    const handleClickList = () => {
      setDropOpen(!dropOpen);
    };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        try{
          const posts = await axios.post(endpoints.post_services,sform,{
            headers:{
              Authorization : 'Bearer ' + getToken,
              "content-type": "multipart/form-data",
            }
          })
          // toast.success(posts || "Form Submitted Successfully")

          console.log(posts,"here is posted s form")
        }
        catch(error){
          console.log(error,"error in sform")
          // toast.error(error.posts.message ||"Form Not Submitted.")
        }
        
        handleClose()
      }

  
      const companySubmit =async (e)=>{
        e.preventDefault()
        try{
        const response = await axios.post(endpoints.post_company,cform,{
          headers:{
            Authorization : 'Bearer ' + getToken,
            "content-type": "multipart/form-data",
          }
        })
        toast.success(response.data.message || "Form Submitted Successfully")
        setMode('add')
        setEditMode(false);
        console.log(response,"response of form")
      }
      catch(error){
        // console.log(error.response.data)
        toast.error(error.response.data.message ||"Form Not Submitted.")
      }
      // console.log("submitted form ",cform)
      }

      const handleEdit = async (e)=>{
        e.preventDefault()
        try{
          const response = await axios.put(`${endpoints.get_allCompany}${id}/`,cform,{
            headers:{
              Authorization : 'Bearer ' + getToken
            }
          })
          toast.success(response.data.message || "Form Submitted Successfully")
          
          setEditMode(false);
          console.log(response,"response of form after put")

        }
        catch(error){
          toast.error(error.response.data.message ||"Form Not Edited.")
        }
      }

      const handleEditClick = () => {
        setEditMode(!editMode);
        // setMode('edit')
    };

    // const handleChangeSelect = (event) => {
    //   setCurrency(event.target.value);
    // };
      
      

    const styles = {
        headtop:{
            backgroundColor:"white",
            borderRadius:"1rem",
            margin:"1rem 0rem 1rem 0rem",
            width: '100%',
            padding:"0.5rem"
        },
        head:{
            margin: '1rem 1rem 0.5rem -1rem',
            // cursor:"pointer"
            display: 'flex',
            // justifyContent: 'left',
            padding:'1rem 0rem 1rem 0rem'
        },
        head1:{
          width:"100%",
            display: 'flex',
            justifyContent:"space-between"
        },
        head2:{
            cursor:"pointer",
            display: 'flex',
            // margin: '1rem 0rem 0rem 30rem',
            height:'2.5rem',
            width:'2.5rem',
            justifyContent:'right',
            // borderRadius:'2rem',
            // maxWidth: 400,
            // margin: 'auto',
            // backgroundColor:'blue'
        },
        textField:{
            width:"46%",
            // height:"10%",
            margin:"0.5rem 0.5rem 0.5rem 0.5rem",
        },
        textField1:{
            width:"90%",
            // height:'10%',
            // height:"3rem !important",
            margin:"0rem 0.5rem 0.5rem 1rem",
            // overflow:"auto",
        },
        textField2:{
          width:"90%",
          // height:'10%',
          // height:"3rem !important",
          margin:"1rem 0.5rem 0.5rem 1rem",
          // overflow:"auto",
      },
        buttonContainer: {
            display: "flex",
            justifyContent: "right",
            margin: "1rem 1rem 0rem 0rem"
          },
          buttonContainer1: {
            display: "flex",
            justifyContent: "center",
            margin: "1rem 1rem 0rem -2rem"
          },
          modal:{
            color:"black",
            backgroundColor : "white",
            width:"50%",
            // display:'flex',
            // justifyContent:'center',
            // alignItems:'center',
            height: '60%',
            // margin: '0',
            position: 'fixed',
            top:'40%',
            left:'50%',
            transform: 'translate(-50%, -50%)',
            border:'none',
            borderRadius:'0.8rem',
            padding:"0rem 0rem 0rem 1rem",
            margin:"1rem",
          },
          services:{
            padding:'1rem 0rem 2rem 1rem',
            margin:"1rem 1rem 1rem 0.5rem",
            // backgroundColor:'#fafafa',
            backgroundColor:'rgb(240 240 240)',
            borderRadius:'2rem',
          },
          headingmodal:{
            display: 'flex',
            justifyContent: 'center',
            fontWeight:700,
            padding:"1rem"
          },
          modalinputhead:{
            fontWeight:500,
            padding:"0.5rem 0rem 0.3rem 1.3rem",
          },
          reactQuillContainer: {
            maxHeight: "10rem", 
            overflow: "auto"
        },
        buttons:{
          display:"flex",
          justifyContent:"right",
          padding:"1rem "
        },
        heading:{
          display :"flex",
          justifyContent:"space-between"
        },
        headingedit:{
          margin: '2rem 0rem 0rem 0rem'
        },
        showdata:{
          display:"flex",
          flexWrap:"wrap",
        },
        tabledata:{
          width: '100%',
          fontFamily:"Daikon-Regular",
          // height: '2rem',
          // border: '1px solid lightgray',
          display: 'flex',
          fontSize: 'medium',
          // borderRadius: '0.3rem',
          // padding: '0rem 0rem 0rem 3rem',
          // margin :'1rem',
          margin :'0.6rem 0rem 0rem 0.3rem',
          justifyContent:"left",
          textAlign:"left",
          color:"darkgray"
        },
        tabledata1:{
          width: '100%',
          fontFamily:"Daikon-Regular",
          // height: '2rem',
          // border: '1px solid lightgray',
          display: 'flex',
          fontSize: 'medium',
          // borderRadius: '0.3rem',
          // padding: '0rem 0rem 0rem 3rem',
          margin :'0.6rem 0rem 0rem 0.5rem',
          
        },
        tabledata12:{
          width: '100%',
          fontFamily:"Daikon-Regular",
          display: 'flex',
          fontSize: 'medium',
          // margin :'0.5rem 0rem 0rem 0rem',
          color:"darkgray"
        },
        boxTop:{
          display:"flex",
          // flexWrap:"wrap",
          flexDirection :"row",
          margin:"0.5rem",
          justifyContent:"left",
          textAlign:"left",
          width:"47%",
        },
        text:{
          margin: '0.5rem 0rem 0rem 0rem',
          fontSize: 'medium',
          fontFamily:"Daikon-Bold",
          whiteSpace: 'nowrap'
        },
        boxTop1:{
          display:"flex",
          // flexWrap:"wrap",
          flexDirection :"column",
          margin:"0.5rem",
          justifyContent:"left",
          textAlign:"left",
          width:"100%",
          // height:'3rem'
        },
        headtop1:{
          backgroundColor:"white",
          borderRadius:"1rem",
          margin:"0rem 0rem 1rem 0rem",
          width: '100%',
          padding:"0.5rem"
      },
      outerBox:{
        borderRadius:"0.5rem"
      },
      image:{
        width:"4rem",
        objectFit:"contain"
      },
      imageText:{
        width: '100%',
          fontFamily:"Daikon-Regular",
          display: 'flex',
          fontSize: 'medium',
          margin :'0.5rem 0rem 0rem 1rem',
          // justifyContent:"left",
          // textAlign:"left"
      },
      boxTop11:{
        width:"100%",
        display:"flex",
        justifyContent:"left",
        textAlign:"left",
        margin:"0rem 0rem 0.5rem 0.5rem"
      },
      imageText11:{
        fontFamily:"Daikon-Bold",
          display: 'flex',
          fontSize: 'xx-large',
          margin :'0.5rem 0rem 0rem 1rem',
      },
      head12:{
        marginLeft:"30rem"
      }
      // form:{
      //   display:"flex",
      //   flexWrap:"wrap"
      // }
    }

   

    console.log("here is cform",cform)


    return(
        <>
        <Paper style={styles.outerBox}>
        <Box style={styles.headtop}>
        <Container style={styles.heading}>
        <Typography variant="h6" color="primary" style={styles.head}>
        Company
      </Typography>
      <IconButton onClick={handleEditClick}>
                        <EditIcon /> 
                    </IconButton>
      </Container>

      {(!formSubmitted || editMode) ?
       <Box>
        <form onSubmit={companySubmit} style={styles.form} >
            <TextField size="small" id="outlined-basic" label="Name" style={styles.textField} type="text" variant="outlined" 
            // InputLabelProps={{ shrink: true }} 
            name="name" value={cform.name} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic" label="Email" style={styles.textField} type="email" variant="outlined" 
            // InputLabelProps={{ shrink: true }}
            name="email" value={cform.email} onChange={handleChange}
            />
            
            <TextField
            style={styles.textField}
          id="outlined-select-currency-native"
          select
          size="small"
          label="Industry"
          name="industry_name"
          value={cform.industry_name}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          // helperText="Please select your Industry"
          variant="outlined"
        >
          <option value=''>
            Select Industry
          </option>
          <option value='Finance'>
            Finance
          </option>
          <option value='IT'>
            IT
          </option>
          <option value='Pharmaceutical'>
          Pharmaceutical
          </option>
          {/* {industry.map((option) => (
            <option key={option.value} value={option.name}>
              {option.name}
            </option>
          ))} */}
        </TextField>
            <TextField size="small" id="outlined-basic"  label="Number" style={styles.textField} type="number" variant="outlined" 
            // InputLabelProps={{ shrink: true }}
            name="number" value={cform.number} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="GST Number" style={styles.textField} type="number" variant="outlined" 
            // InputLabelProps={{ shrink: true }}
            name="gst_number" value={cform.gst_number} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="Registration Number" style={styles.textField} type="number" variant="outlined" 
            // InputLabelProps={{ shrink: true }}
            name="reg_number" value={cform.reg_number} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  type="date" style={styles.textField} variant="outlined" 
            // InputLabelProps={{ shrink: true }}
            name="reg_date" value={cform.reg_date} onChange={handleChange}
            />
            <TextField id="outlined-basic" size="small"  label="Sector" style={styles.textField} type="text" variant="outlined" 
            // InputLabelProps={{ shrink: true }}
            name="sector" value={cform.sector} onChange={handleChange}
            />
            <TextField id="outlined-basic" size="small"  label="Banner" style={styles.textField} type="file" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="banner" 
            inputProps={{ accept: "image/*" }}
            // value={cform.sector} 
            onChange={handleFileChange}
            />
            <TextField id="outlined-basic" size="small"  label="Logo" style={styles.textField} type="file" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="logo" 
            // value={cform.sector} 
            inputProps={{ accept: "image/*" }}
            onChange={handleFileChange}
            />
            
            <TextField id="outlined-basic" size="small"  label="Address" style={styles.textField} type="text" variant="outlined" 
            // InputLabelProps={{ shrink: true }}
            name="address" value={cform.address} onChange={handleChange}
            />
            <Box className={classes.reactQuillContainer}>
            {(cform.name || cform.address) && (
  <ReactQuill
    value={cform.description}
    required
    onChange={(value) => handleEditorChange("description", value)}
    className={classes.editor}
  />
)}

            </Box>
            <Box style={styles.buttons}>
          {editMode ?  <Box style={styles.buttonContainer}>
            <Button variant="contained" color="primary" onClick={handleEdit} >
                    Save
            </Button></Box> : <Box style={styles.buttonContainer}>
            <Button variant="contained" color="primary" type="submit" >
                    <DoneIcon/>
            </Button></Box> } 
           </Box></form>
            
            </Box> : <Grid item xs={12} style={styles.headtop1}><Box style={styles.showdata}>
                
            <Box style={styles.boxTop11}>
                <img src={`${base_uri}${cform.banner}`} alt={cform.id} style={styles.image}/>
                <Box style={styles.imageText11}>{cform.name}</Box>
                </Box>
                {/* <Box style={styles.boxTop}>
                <Typography style={styles.text}>Name:</Typography> 
                <Box style={styles.tabledata}>   {cform.name}</Box>
                </Box> */}
                <Box style={styles.boxTop}>
                <Typography style={styles.text}>Email:</Typography> 
                <Box style={styles.tabledata}>   {cform.email}</Box>
                </Box>
                <Box style={styles.boxTop}>
                <Typography style={styles.text}>Number:</Typography> 
                <Box style={styles.tabledata}>   {cform.number}</Box>
                </Box>
                <Box style={styles.boxTop}>
                <Typography style={styles.text}>GST Number:</Typography>
                 <Box style={styles.tabledata}>   {cform.gst_number}</Box>
                </Box>
                
                <Box style={styles.boxTop}>
                <Typography style={styles.text}>Registered Date:</Typography>
                 <Box style={styles.tabledata}>   {cform.reg_date}</Box>
                </Box>
                <Box style={styles.boxTop}>
                <Typography style={styles.text}>Sector:</Typography>
                 <Box style={styles.tabledata}>   {cform.sector}</Box>
                </Box>
                <Box style={styles.boxTop}>
                <Typography style={styles.text}>Industry:</Typography>
                 <Box style={styles.tabledata}>   {cform.industry_name}</Box>
                </Box>
                <Box style={styles.boxTop1}>
                <Typography style={styles.text}>Address:</Typography>
                 <Box style={styles.tabledata12}>   {cform.address}</Box>
                </Box>
                <Box style={styles.boxTop1}>
                <Typography style={styles.text}>Registered Number:</Typography>
                 <Box style={styles.tabledata12}>   {cform.reg_number}</Box>
                </Box>
                <Box style={styles.boxTop1}>
                <Typography style={styles.text}>Overview: </Typography> 
                <Box style={styles.tabledata12} dangerouslySetInnerHTML={{ __html:cform.description }}></Box>
                </Box>
                  
                   </Box> </Grid>}

           
            </Box></Paper>
            <Grid item xs={12} style={styles.headtop}>
                <Container style={styles.head1}>
                <Typography variant="h6" color="primary" style={styles.head}>
        Services
      </Typography>
      <IconButton style={styles.head12}><EditIcon onClick={handleOpen}/></IconButton>
      <Box style={styles.head2}>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >       
        <div style={styles.modal}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" style={styles.headingmodal}>Input Company Details</Typography>
          <Container>
          <Box><Typography style={styles.modalinputhead}>Name : </Typography><TextField size="small" id="outlined-basic"  label="Name" style={styles.textField1} type="text" variant="outlined" 
            name="name" value={sform.name} onChange={handleChange1}
            /></Box>  
            <Box><Typography style={styles.modalinputhead}>Short Description : </Typography><TextField size="small" id="outlined-basic"  label="Description" style={styles.textField1} type="text"  variant="outlined" className={classes.outlinedBasic}
            name="short_description" value={sform.short_description} onChange={handleChange1}
            /></Box>  
             <Box><TextField id="outlined-basic" size="small"  label="Logo" style={styles.textField2} type="file" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="logo" 
            // value={cform.sector} 
            // inputProps={{ accept: "image/*" }}
            onChange={handleFileChange1}
            /></Box>
            
             </Container>
            
            <Container style={styles.buttonContainer}><Button variant="contained" color="primary" type="submit" >
                    Submit
            </Button></Container></form>
        
        </div>
      </Modal></Box></Container>
        </Grid>
        <Toaster 
         position="top-right"
         reverseOrder={false} />
        </>
    )
}

export default CompanyProfile;