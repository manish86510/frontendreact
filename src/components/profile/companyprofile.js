import React,{useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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

function CompanyProfile(){

    const [show,setShow] = useState(false)

    const styles = {
        headtop:{
            backgroundColor:"white",
            borderRadius:"1rem",
            margin:"0rem 0rem 0.5rem 0.7rem",
            width: '56%'
        },
        head:{
            margin: '1rem 1rem 1rem 1rem',
            cursor:"pointer"
        },
        heading:{
            display:"flex"
        },
        textField:{
            width:"46%",
            // height:"10%",
            margin:"1rem 0.5rem 0.5rem 1rem",
        },
        textField1:{
            width:"38%",
            margin:"1rem 0.5rem 0.5rem 1rem",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "center",
            margin: "1rem 0"
          },
          button: {
            margin: '0rem 0rem 1rem 16rem',
          },
          button1: {
            margin: '0rem 0rem 1rem -8rem',
          }
    }

    const [cform,setCForm] = useState({
                    Name: '',
                    Email: '',
                    Number: '',
                    Gst_no: '',
                    Reg_no: '',
                    Reg_date: '',
                    Sector: '',
                    Description : '',
                    Address: '',
                    Portfolio: '',
                })
    return(
        <>
        {/* <h1>I am working</h1> */}
        <Box style={styles.headtop}>
        <Container style={styles.heading}>
        <Typography variant="h6" color="primary" onClick={()=>setShow(false)} style={styles.head}>
        Company
      </Typography>
      <Typography variant="h6" color="primary" onClick={()=>setShow(true)} style={styles.head}>
        Services
      </Typography></Container>

     {show===false ?  <Box>
        <form>
            <TextField id="outlined-basic" label="Name" style={styles.textField} type="text" variant="outlined" 
            // InputLabelProps={{ shrink: true }} 
            // name="Name" value={cform.Name} 
            />
            <TextField id="outlined-basic" label="Email" style={styles.textField} type="email" variant="outlined" 
            // name="Email" value={cform.Email} 
            /><br/>
            <TextField id="outlined-basic"  label="Number" style={styles.textField} type="number" variant="outlined" 
            // name="Number" value={cform.Number} 
            />
            <TextField id="outlined-basic"  label="GST Number" style={styles.textField} type="number" variant="outlined" 
            // name="Gst_no" value={cform.Gst_no} 
            /><br/>
            <TextField id="outlined-basic"  label="Registration Number" style={styles.textField} type="number" variant="outlined" 
            // name="Reg_no" value={cform.Reg_no} 
            />
            <TextField id="outlined-basic" fullWidth type="date" style={styles.textField} variant="outlined" 
            // name="Reg_date" value={cform.Reg_date} 
            /><br/>
            <TextField id="outlined-basic" fullWidth label="Sector" style={styles.textField} type="number" variant="outlined" 
            // name="Sector" value={cform.Sector} 
            />
            <TextField id="outlined-basic" fullWidth label="Description" style={styles.textField} type="text" variant="outlined" 
            // name="Description" value={cform.Description} 
            /><br/>
            <TextField id="outlined-basic" fullWidth label="Address" style={styles.textField} type="text" variant="outlined" 
            // name="Address" value={cform.Address} 
            />
            <TextField id="outlined-basic" fullWidth  type="file" style={styles.textField} variant="outlined" 
            // name="Portfolio" value={cform.Portfolio} 
            />
            <Box style={styles.buttonContainer}></Box>
            <Button variant="contained" color="primary" style={styles.button}>
                    Submit
            </Button></form>
            </Box> :  
            <Box><form>
            <TextField id="outlined-basic" fullWidth label="Name" style={styles.textField1} type="text" variant="outlined" 
            // name="Name" value={cform.Name} 
            />
            <TextField id="outlined-basic" fullWidth label="Short Description" style={styles.textField1} type="text" variant="outlined" 
            // name="short_dis" value={cform.short_dis} 
            />
            <TextField id="outlined-basic" fullWidth label="Long Description" style={styles.textField1} type="number" variant="outlined" 
            // name="long_desc" value={cform.long_desc}
             />
            <Box style={styles.buttonContainer}><Button variant="contained" color="primary" style={styles.button1}>
                    Submit
            </Button></Box></form></Box>}
            </Box>
        </>
    )
}

export default CompanyProfile;