import React from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@material-ui/core';
import { withStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import endpoints from "../api/endpoints";
import toast, { Toaster } from 'react-hot-toast';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const styles = (theme) => ({
  forget_pass: {
    color: '#999999',
  },
  login_btn: {
    padding: 45,
  },
  footer: {
    marginTop: 63,
  },
  user_input: {
    marginLeft: 6,
    marginBottom: 10,
  },
  pass_input: {
    marginLeft: 6,
  },
  username: {
    borderRadius: 100,
    border: '1px solid #00a86b',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 40,
  },
  password: {
    borderRadius: 100,
    border: '1px solid #00a86b',
    alignItems: 'center',
    display: 'flex',
    width: 400,
    height: 40,
  },
  iconButton: {
    fontSize: 15,
  },
  login_img: {
    textAlign: 'center',
    marginTop: 20,
  },
  overlay1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(/images/abst1.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // zIndex: 1,
    margin:"1rem"
    // opacity: 0.7,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(/images/role.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 1,
    // margin:"1rem"
    // opacity: 0.7,
  },
  paper: {
    position: 'relative',
    zIndex: 2,
    padding: '4rem 1rem 1rem 1rem',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    margin: '1rem 1rem 1rem 5rem',
  },
  paper1: {
    position: 'relative',
    zIndex: 2,
    textAlign: "center",
    color: "#131313",
    fontWeight: 700,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
});


const defaultTheme = createTheme();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: '',
      isError: '',
      username: '',
      password: '',
    };
  }

  getProfile = () => {
    const url = endpoints.profile_user;
    const token = localStorage.getItem('access');
    axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }).then(result => {
      if (result.status === 200) {
        localStorage.setItem('userInfo', JSON.stringify(result.data));
        if (result.data.avatar != null) {
          this.props.history.push({
            pathname: "/home"
          });
        } else {
          this.props.history.push({
            // pathname: "/profile"
            pathname: "/home"
          });
        }
      }
    });
  }

  
  postLogin = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const url = endpoints.TOKEN;
    try{
    await axios.post(url, { username, password }).then(result => {
      if (result.status === 200) {
        localStorage.setItem('access', result.data.access);
        localStorage.setItem('refresh', result.data.refresh);
        this.getProfile();
      }
       else {
        this.setState({ isError: "User not found!" });
      }
    })
    // .catch(() => {
    //   this.setState({ isError: "User not found!" });
    // });
  }
  catch(error){
    // console.log("the new error",error.response.status)
    // if(error.response.status === 401){
    //   if (this.state({username}) !== e.target.value){
    //     toast.error('InCorrect UserName');
    //   }
    //   else{
    //   toast.error('InCorrect Password');
    //   }
    // }
    if (error.response.status === 401) {
      toast.error('Incorrect Username Or Password');
    }
  }
  
  }

  handleUserName = e => {
    this.setState({ username: e.target.value });
  }

  handlePassword = e => {
    this.setState({ password: e.target.value });
  }

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={defaultTheme}>
        <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            // width: '25%', // Increase width
            // maxWidth: '80%',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
       />
        <Grid container component="main" style={{ height: '100vh' }}>
          {/* <div className={classes.overlay} /> */}
          <CssBaseline />
          <div className={classes.overlay} />
          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            component={Paper}
            elevation={6}
            square
            className={classes.paper}
          >
            <Box
              style={{
                marginTop: 8,
                marginLeft: 10,
                marginRight: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src="/images/BP.png" alt="BP logo" />
              <Typography component="h1" variant="h5">
                Log Into Your Account
              </Typography>
              <form onSubmit={this.postLogin} noValidate style={{ marginTop: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleUserName}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handlePassword}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 24, marginBottom: 16, backgroundColor: '#33ab9f' }}
                >
                  Log In
                </Button>
                <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
                  <Grid item align="center" style={{ marginBottom: '2rem' }}>
                    <Link href="/forgetpass" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid align="center">
                    Don't have an account?
                    <Link href="/register" variant="body2">
                      {' Register Here'}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://mui.com/">
                      Services UI
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                  </Typography>
                </Box>
              </form>
            </Box>
          </Grid>
          {/* <Grid
            item
            xs={12}
            sm={8}
            md={7}
            component={Paper}
            elevation={6}
            square
            className={classes.paper1}
          ><Typography variant="h4">Bharatpreneurs 2024
          Empowering Indian SMEs for a Stronger Economy</Typography>
          <Typography variant="h6" >Bharatpreneurs, a groundbreaking event in India, is dedicated to empowering Indian entrepreneurs and SMEs. We offer comprehensive support through finance and funding, cutting-edge technology and operations assistance, and strategic media and marketing support. Join us on a unified platform to foster collaboration and propel the success of SMEs at the Bharatpreneurs event.</Typography></Grid> */}
        </Grid>
      </ThemeProvider>

    );
  }
}

export default withRouter(withStyles(styles)(Login));
