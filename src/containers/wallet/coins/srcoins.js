import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import { Button} from '@material-ui/core';
import {
    ThemeProvider,
    createMuiTheme,
    fade
  } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import InputBase from '@material-ui/core/InputBase';


  
const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 20,
      position: 'relative',
      backgroundColor: '#e4f2f0',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '650px',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))(InputBase);


  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });


const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > div': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#6fc1a5',
      },
    },
  })(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);
  
  const StyledTab = withStyles(theme => ({
    root: {
      textTransform: 'none',
      color: '#6fc1a5',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1,
      },
    },
  }))(props => <Tab disableRipple {...props} />);
  

  const AntSwitch = withStyles(theme => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
  
 


class WalletInfo extends React.Component{

    render() {


        return (
            <Grid container spacing={2}>
              <Grid item xs={11}>
              <Paper> 
            <Container>
           
            <StyledTabs 
            // value={value} onChange={handleChange}
            aria-label="styled tabs example">
            <StyledTab  label="Send/receive coins" />
            
            <Grid xs={3} component="label" style={{ position: 'absolute', left: 500, margin: 10 }} container alignItems="center" spacing={1}>
            <Grid item>Send</Grid>
            <AntSwitch
            // checked={state.checkedC}
            // onChange={handleChange('checkedC')}
            value="checkedC"
            />
            <Grid item>Receive</Grid>
            </Grid>
            
          
            </StyledTabs>
        
            <Typography/>
            <Grid>
            Your Balance
            <Button style={{borderRadius: '25px', float:'right', width:'130px' , backgroundColor:'#6fc1a5'}} variant="contained"  color='primary'>
            Buy more
            </Button>
            </Grid>
          
            <Grid>
            10594 coins
          
            </Grid>
     
            <Grid>
      
     
      </Grid>
      <Grid>
      <ThemeProvider theme={theme}>
          <Grid container  wrap="nowrap" spacing={2}>
          <Grid item>
                            
                                   <BootstrapInput defaultValue="No. of coins" id="bootstrap-input" />

                            </Grid>
                            </Grid>
                    
                            <Grid container  wrap="nowrap" spacing={2}>

                    <Grid item>

                    {/* <TextField defaultValue="jackie chan"  borderRadius='20'
      position='relative'
      backgroundColor='#e4f2f0'
      border='1px solid #ced4da'
      fontSize='16'
      width='650px'
      padding='10px 12px'/> */}
                    <BootstrapInput defaultValue="jackie chan" id="bootstrap-input" />

                            </Grid>
                            </Grid>
                            <Grid container  wrap="nowrap" spacing={2}>

                            <Grid item>

                            <BootstrapInput defaultValue="Refrence" id="bootstrap-input" />

                            </Grid>
                            </Grid>                  
                          </ThemeProvider>
                          <Grid>
       

        </Grid>
          </Grid>
          <Grid>
          <br></br>
          Remember this action is irrerversible
          </Grid>
          <Button style={{borderRadius: '25px', width:'130px' , backgroundColor:'#6fc1a5'}} variant="contained"  color='primary'>
            Send
           </Button>
       
          </Container>
          </Paper>
          </Grid>
                          </Grid>


          
        
             
            
        );
    }
}

export default WalletInfo;