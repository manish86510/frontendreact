import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteIcon from '@material-ui/icons/Note';



const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > div': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
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
  


class WalletInfo extends React.Component{

    render() {
        return (
            <Grid container spacing={3}>
              <Grid item xs={11}>
              <Paper> 
            <Container>


        <StyledTabs 
        // value={value} onChange={handleChange}
          aria-label="styled tabs example">
          <StyledTab  label="Wallet" />
          <StyledTab label="Activity" />
        </StyledTabs>
        <Typography/>

      <Grid container>
      <Grid item xs={6}>

      
      <svg height="180" width="180">
      <circle cx="80" cy="80" r="60" stroke="#6fc1a5" stroke-width="1" fill="white" />
      <text x="45%" y="45%" text-anchor="middle" stroke="grey"  dy=".3em">100</text>
      </svg> 
      </Grid>
      <Grid item xs={6}>

      <List>
      <ListItem>
                <Button variant="contained"  style={{borderRadius: '25px', width:'160px'}} variant="outlined" >
                Send Coins
                </Button>
                </ListItem>
                <ListItem>

                <Button variant="contained"  style={{borderRadius: '25px', width:'160px'}} variant="outlined"  >
                    Request Coins
                </Button>
                </ListItem>
                <ListItem>

                <Button variant="contained"  style={{borderRadius: '25px', width:'160px', backgroundColor:'#6fc1a5'}} variant="contained" color="primary" >
                    Buy More
                </Button>
                </ListItem>
                </List>
                </Grid>
                <Grid container spacing={3}>
              <Grid item xs={4}>
                <IconButton size='large' color="inherit" aria-label="Close" style={{ fontSize: 125}}>
                            <FontAwesomeIcon icon={faMedal} />
                            </IconButton>
                </Grid>
                <Grid item xs={4}>
                            <IconButton size='large' color="inherit" aria-label="Close" style={{ fontSize: 125}}>
                            <FontAwesomeIcon icon={faMedal} />
                            </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                            <IconButton size='large' color="inherit" aria-label="Close" style={{ fontSize: 125}}>
                            <FontAwesomeIcon icon={faMedal} />
                            </IconButton>
                            </Grid>
                            </Grid>


                
                </Grid>
          </Container>.
          <Grid item xs={4}>
          <p><span style={{ padding: 10, fontSize: 20}}>Rewards</span></p>

          </Grid>
          </Paper>



          <br></br>
            


          <Paper 
        //   className={classes.paper}
          >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <NoteIcon/></Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>Reward Text</Typography>
            </Grid>
          </Grid>
        </Paper>

        <br></br>
        <Paper >
         {/* className={classes.paper} */}
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
            <NoteIcon/>
                        </Grid>
            <Grid item xs>
              <Typography noWrap>Reward Text</Typography>
            </Grid>
          </Grid>
        </Paper>
        <br></br>
        <Paper
        //  className={classes.paper}
         >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
            <NoteIcon/></Grid>
            <Grid item xs>
              <Typography>Reward Text</Typography>
            </Grid>
          </Grid>
        </Paper>
            
          
          </Grid>
          </Grid>
             
            
        );
    }
}

export default WalletInfo;