import React from "react";
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, CircularProgress } from '@material-ui/core';
import { withStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import endpoints from "../api/endpoints";
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Bharat from '../img/bharat.png';

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
  },
  paper: {
    position: 'relative',
    zIndex: 2,
    padding: '1rem 1rem 1rem 1rem',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    margin: '1rem 1rem 1rem 5rem',
  },
});

const defaultTheme = createTheme();

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: '',
      isError: '',
      fullname: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      loading: false,
      error: {
        username_err: '',
        fullname_err: '',
        email_err: '',
        password_err: '',
      },
    };
  }

  validate = () => {
    let flag = false;
    const error = this.state.error;
    if (this.state.fullname === "") {
      error.fullname_err = "This field is required";
      flag = true;
    }
    if (this.state.username === "") {
      error.username_err = "This field is required";
      flag = true;
    }
    if (this.state.email === "") {
      error.email_err = "This field is required";
      flag = true;
    }
    if (this.state.password === "") {
      error.password_err = "This field is required";
      flag = true;
    }
    this.setState({ error: error });
    return flag;
  }

  postRegister = (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    if (!this.validate()) {
      const { fullname } = this.state;
      const index = fullname.indexOf(" ");
      const firstName = index !== -1 ? fullname.substr(0, index) : fullname;
      const lastName = index !== -1 ? fullname.substr(index + 1) : '';
      
      let formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('username', this.state.username);
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      
      axios.post(endpoints.profile_user, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(result => {
        this.setState({ loading: false });
        if (result.status === 200) {
          this.props.history.push({
            pathname: "/verify"
          });
        } else {
          this.setState({
            isError: "User already exists!",
          });
        }
      }).catch(() => {
        this.setState({
          isError: "Something went wrong!",
          loading: false
        });
      });
    }
  }

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { error, loading } = this.state;

    return (
      <ThemeProvider theme={defaultTheme}>
        <Toaster
          position="top-right"
          toastOptions={{
            className: '',
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
        <Grid container component="main" style={{ height: '100vh', position: 'relative' }}>
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
                <img src={Bharat} alt="bharat"/>
              {/* <Avatar style={{ margin: '10px', backgroundColor: '#33ab9f' }}>
                <LockOutlinedIcon />
              </Avatar> */}
              <Typography component="h1" variant="h5">
                Create an Account
              </Typography>
              <form onSubmit={this.postRegister} noValidate style={{ marginTop: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  autoComplete="fullname"
                  autoFocus
                  size="small"
                  value={this.state.fullname}
                  onChange={this.handleChange('fullname')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  size="small"
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  size="small"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
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
                  size="small"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="confirm-password"
                  size="small"
                  value={this.state.confirm_password}
                  onChange={this.handleChange('confirm_password')}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 24, marginBottom: 16, backgroundColor: '#33ab9f' }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                </Button>
                <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
                  <Grid align="center">
                    Already have an account?
                    <Link href="/login" variant="body2">
                      {' Log in'}
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
        </Grid>
      </ThemeProvider>
    );
  }
}

export default withRouter(withStyles(styles)(Register));
