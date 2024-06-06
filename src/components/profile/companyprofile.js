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
import endpoints,{post_company} from "../../api/endpoints";
import toast, { Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles({
    outlinedBasic: {
        height: "6rem", 
        // overflow: "auto"
        overflowY:"scroll"
    },
  });

function CompanyProfile(){
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [modalData,setModalData] = useState([]);
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
      // Portfolio: '',
  });
    const [sform,setSform] = useState({
      name :"",
      desc : "",
      // long_desc : ""
    })


    
    const getToken = localStorage.getItem('access');
    const getData = localStorage.getItem('userInfo')
    const jsData = JSON.parse(getData);
    // setId(jsData.pk)
    const id = jsData.pk
    // console.log('line 59',id)

    useEffect(()=>{
      const getId = async ()=>{
        try{
        const gettingId = await axios.get(`${endpoints.get_allCompany}${id}`,{
          headers:{
            Authorization : 'Bearer ' + getToken
          }
        })

        const data = gettingId.data
        
        // setGetIdData(gettingId.data)
        // const gData = gettingId.data
        // console.log("here gdata",gData)
              // setCForm({...gData})     
              data.description = data.description || ''; // handle null value
  
              setCForm(data)   
              // console.log("inside form",cform)    
      }
      catch(error){
        console.log(error)
      }
  
      }
      getId()
    },[id])

    // console.log("after useeffect",cform)
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleChange = (e) => {
        const {name,value} = e.target;
        setCForm({...cform,[name]:value})
      }

      const handleChange1 = (e) => {
        const {name,value} = e.target;
        setSform({...sform, [name]:value})
      }

    //   const handleDescriptionChange = (value) => {
    //     setCForm({ ...cform, description: value });
    // };

    const handleEditorChange = (name, value) => {
      setCForm({
        ...cform,
        [name]: value,
      });
    };
    
    

   
    // useEffect(()=>{
   
    //   // console.log("json data",jsData.pk)
    // },[])

    // console.log("id is here",id)

    

   


      const handleSubmit = async (e) => {
        e.preventDefault();
        setModalData([...modalData, { ...sform, expanded: false }]);
        setSform({
        name :"",
        desc : "",
        // long_desc : ""
      })

        try{
          const posts = await axios.post(endpoints.post_industry,sform,{
            headers:{
              Authorization : 'Bearer ' + getToken
            }
          })
          toast.success(posts.data.message || "Form Submitted Successfully")

          // console.log(posts,"here is posted s form")
        }
        catch(error){
          // console.log(error,"error in sform")
          toast.error(error.posts.data.message ||"Form Not Submitted.")
        }
        
        handleClose()
      }

  
      const companySubmit =async (e)=>{
        e.preventDefault()
        try{
        const response = await axios.post(endpoints.post_company,cform,{
          headers:{
            Authorization : 'Bearer ' + getToken
          }
        })
        toast.success(response.data.message || "Form Submitted Successfully")

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

          console.log(response,"response of form after put")

        }
        catch(error){
          toast.error(error.response.data.message ||"Form Not Edited.")
        }
      }
      
      // useEffect(()=>{
      //   setSliceData(modalData)
      // },[modalData])

      // console.log(modalData,"text is here")
      // console.log(modalData[0].long_desc,"text is with modal here")

      // const handleExpand = ()=>{
      //   const sliced = modalData.map((sliced)=>(sliced.long_desc.slice(100)));
      //   setExpand(sliced);
      // }

      // console.log(expand,"here is expand")

      const handleExpandToggle = (index) => {
        setModalData(modalData.map((item, i) => (
            i === index ? { ...item, expanded: !item.expanded } : item
        )));
    };

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
            display: 'flex',
        },
        head2:{
            cursor:"pointer",
            display: 'flex',
            margin: '1rem 0rem 0rem 30rem',
            height:'2.5rem',
            width:'2.5rem',
            justifyContent:'center',
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
        buttonContainer: {
            display: "flex",
            justifyContent: "right",
            margin: "1rem 1rem 0rem 0rem"
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
        }
    }

   

    


    return(
        <>
        <Box style={styles.headtop}>
        <Container style={styles.heading}>
        <Typography variant="h6" color="primary" style={styles.head}>
        Company
      </Typography>
      </Container>

      <Box>
        <form onSubmit={companySubmit}>
            <TextField size="small" id="outlined-basic" label="Name" style={styles.textField} type="text" variant="outlined" 
            InputLabelProps={{ shrink: true }} 
            name="name" value={cform.name} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic" label="Email" style={styles.textField} type="email" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="email" value={cform.email} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="Number" style={styles.textField} type="number" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="number" value={cform.number} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="GST Number" style={styles.textField} type="number" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="gst_number" value={cform.gst_number} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="Registration Number" style={styles.textField} type="number" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="reg_number" value={cform.reg_number} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  type="date" style={styles.textField} variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="reg_date" value={cform.reg_date} onChange={handleChange}
            />
            <TextField id="outlined-basic" size="small"  label="Sector" style={styles.textField} type="text" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="sector" value={cform.sector} onChange={handleChange}
            />
            {/* <TextField size="small" id="outlined-basic"  label="Description" style={styles.textField} type="text" variant="outlined" 
            name="description" value={cform.description} onChange={handleChange}
            /> */}
            <TextField id="outlined-basic" size="small"  label="Address" style={styles.textField} type="text" variant="outlined" 
            InputLabelProps={{ shrink: true }}
            name="address" value={cform.address} onChange={handleChange}
            />
            <Box className={classes.reactQuillContainer}>
            {cform.name && (
  <ReactQuill
    value={cform.description}
    required
    onChange={(value) => handleEditorChange("description", value)}
    className={classes.editor}
  />
)}

            </Box>
            {/* <TextField size="small" id="outlined-basic" fullWidth  type="file" style={styles.textField} variant="outlined" 
            name="Portfolio" value={cform.Portfolio} onChange={handleChange}
            /> */}
            <Box style={styles.buttons}>
            <Box style={styles.buttonContainer}>
            <Button variant="contained" color="primary" type="submit" >
                    <DoneIcon/>
            </Button></Box>
            <Box style={styles.buttonContainer}>
            <Button variant="contained" color="primary" onClick={handleEdit} >
                    Save
            </Button></Box></Box></form>
            
            </Box> 
            </Box>
            <Grid item xs={12} style={styles.headtop}>
                <Container style={styles.head1}>
                <Typography variant="h6" color="primary" style={styles.head}>
        Services
      </Typography>
      <Box style={styles.head2}>
      <IconButton><EditIcon onClick={handleOpen}/></IconButton>
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
            <Box><Typography style={styles.modalinputhead}>Description : </Typography><TextField size="small" id="outlined-basic"  label="Description" style={styles.textField1} type="text" multiline minRows={3} variant="outlined" className={classes.outlinedBasic}
            name="desc" value={sform.desc} onChange={handleChange1}
            /></Box>  
            {/* <Box><Typography style={styles.modalinputhead}>Long Description : </Typography><TextField size="small" id="outlined-basic"  label="Long Description" className={classes.outlinedBasic} style={styles.textField1} type="text" variant="outlined" multiline minRows={3}
            name="long_desc" value={sform.long_desc} onChange={handleChange}
             /></Box> */}
             </Container>
            
            <Box style={styles.buttonContainer}><Button variant="contained" color="primary" type="submit" >
                    Submit
            </Button></Box></form>
        
        </div>
      </Modal></Box></Container>
      {/* {modalData.length > 0 ? modalData.map((m)=>{return <table>
          <thead>
          <tr>
            <td>Name</td>
            <td>Long Description</td>
            <td>Short Description</td>
          </tr></thead>
          <tbody>
            <tr>
            <th>{m.Name}</th>
            <th>{m.long_desc}</th>
            <th>{m.short_dis}</th></tr>
          </tbody>
        </table>}):<p> Hello I am Modal Which Has Opened </p>} */}
        {/* <Typography variant="h6">Name || Long Description || Short Description</Typography>
          <Typography variant="p">Services Provided : Consultancy and Software Management</Typography> */}
        {modalData.map((data,index)=>{
          return <Grid key={index} style={styles.services}>  
          <Services name={data.name} 
          // shortdesc={data.desc} 
          longdesc={data.expanded ? data.desc : data.desc.slice(0, 100)}
          ellipsis={!data.expanded}
          onClick={() => handleExpandToggle(index)}
          // longdesc={data.long_desc.slice(0,100)} 
          // ellipsis={expand} 
          // onClick={handleExpand}
          />
          </Grid>
        })}
        {/* {sliceData.length>0 ? sliceData.map((sliced)=>(<p>{sliced.long_desc.slice(0,100)}<span onClick={handleExpand}>...{expand}</span></p>)) :""} */}
        </Grid>
        <Toaster 
         position="top-right"
         reverseOrder={false} />
        </>
    )
}

export default CompanyProfile;