import React,{useState} from "react";
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

// class CompanyProfile extends React.Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             name: '',
//             email: '',
//             number: '',
//             gST_no: '',
//             reg_no: '',
//             reg_date: '',
//             sector: '',
//             description : '',
//             address: '',
//             portfolio: '',
//         };
//     }

//     componentDidMount(){

//     }

//     render(){
//         const { classes } = this.props;
//         return(
//             <>
//             <h1>I am working</h1>
//             <TextField id="outlined-basic" fullWidth label="Name" type="text" variant="outlined" name="name" value={} />
 
//             </>

//         )
//     }
// }

// const data = [
//   {
//   name:"rahul",
//   shortdesc:"describe",
//   longdesc:"long describe"},
//   {
//     name:"satya",
//     shortdesc:"shrtdesc",
//     longdesc:"lgdesc"},
//   {
//     name:"shubham",
//     shortdesc:"shrtdesc",
//     longdesc:"lngdesc"},
// ]

const useStyles = makeStyles({
    outlinedBasic: {
        height: "6rem", 
        overflow: "auto"
    },
  });

function CompanyProfile(){
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [modalData,setModalData] = useState([]);
    // const [expand,setExpand] = useState([]);
    const [cform,setCForm] = useState({
      Name1: '',
      Email: '',
      Number: '',
      Gst_no: '',
      Reg_no: '',
      Reg_date: '',
      Sector: '',
      Description : '',
      Address: '',
      Portfolio: '',
  });
    const [sform,setSform] = useState({
      Name :"",
      short_dis : "",
      long_desc : ""
    })

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleChange = (e) => {
        const {name,value} = e.target;
        setCForm({...cform,[name]:value})
        setSform({...sform, [name]:value})
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        // setModalData([...modalData,sform]);
        setModalData([...modalData, { ...sform, expanded: false }]);
        setSform({
        Name :"",
        short_dis : "",
        long_desc : ""})
        handleClose()
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
            // overflow:"hidden",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "right",
            margin: "1rem 5rem 0rem 0rem"
          },
          modal:{
            color:"black",
            backgroundColor : "white",
            width:"50%",
            // display:'flex',
            // justifyContent:'center',
            // alignItems:'center',
            height: '70%',
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
    }

   

    


    return(
        <>
        {/* <h1>I am working</h1> */}
        <Box style={styles.headtop}>
        <Container style={styles.heading}>
        <Typography variant="h6" color="primary" style={styles.head}>
        Company
      </Typography>
      </Container>

      <Box>
        <form>
            <TextField size="small" id="outlined-basic" label="Name" style={styles.textField} type="text" variant="outlined" 
            // InputLabelProps={{ shrink: true }} 
            name="Name1" value={cform.Name1} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic" label="Email" style={styles.textField} type="email" variant="outlined" 
            name="Email" value={cform.Email} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="Number" style={styles.textField} type="number" variant="outlined" 
            name="Number" value={cform.Number} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="GST Number" style={styles.textField} type="number" variant="outlined" 
            name="Gst_no" value={cform.Gst_no} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="Registration Number" style={styles.textField} type="number" variant="outlined" 
            name="Reg_no" value={cform.Reg_no} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  type="date" style={styles.textField} variant="outlined" 
            name="Reg_date" value={cform.Reg_date} onChange={handleChange}
            />
            <TextField id="outlined-basic"  label="Sector" style={styles.textField} type="number" variant="outlined" 
            name="Sector" value={cform.Sector} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic"  label="Description" style={styles.textField} type="text" variant="outlined" 
            name="Description" value={cform.Description} onChange={handleChange}
            />
            <TextField id="outlined-basic"  label="Address" style={styles.textField} type="text" variant="outlined" 
            name="Address" value={cform.Address} onChange={handleChange}
            />
            <TextField size="small" id="outlined-basic" fullWidth  type="file" style={styles.textField} variant="outlined" 
            name="Portfolio" value={cform.Portfolio} onChange={handleChange}
            />
            <Box style={styles.buttonContainer}>
            <Button variant="contained" color="primary" >
                    Submit
            </Button></Box></form>
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
            name="Name" value={sform.Name} onChange={handleChange}
            /></Box>  
            <Box><Typography style={styles.modalinputhead}>Short Description : </Typography><TextField size="small" id="outlined-basic"  label="Short Description" style={styles.textField1} type="text" variant="outlined" 
            name="short_dis" value={sform.short_dis} onChange={handleChange}
            /></Box>  
            <Box><Typography style={styles.modalinputhead}>Long Description : </Typography><TextField size="small" id="outlined-basic"  label="Long Description" className={classes.outlinedBasic} style={styles.textField1} type="text" variant="outlined" multiline minRows={3}
            name="long_desc" value={sform.long_desc} onChange={handleChange}
             /></Box>
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
          <Services name={data.Name} 
          shortdesc={data.short_dis} 
          longdesc={data.expanded ? data.long_desc : data.long_desc.slice(0, 100)}
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
        </>
    )
}

export default CompanyProfile;