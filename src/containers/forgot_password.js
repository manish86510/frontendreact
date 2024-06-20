import React from "react";
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@material-ui/core';
import { withStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  iconButton: {
    fontSize: 15,
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
    padding: '4rem 1rem 1rem 1rem',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    margin: '1rem 1rem 1rem 5rem',
  },
});

const defaultTheme = createTheme();

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirm_password: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;
    const { username, password, confirm_password } = this.state;

    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" style={{ height: '100vh' }}>
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
                marginTop: 4,
                marginLeft: 10,
                marginRight: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={Bharat} alt="bharat" />
              <Typography component="h1" variant="h5">
                Reset Your Password
              </Typography>
              <form onSubmit={this.handleSubmit} noValidate style={{ marginTop: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  size="small"
                  label="Username or Email"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 14, marginBottom: 16, backgroundColor: '#33ab9f' }}
                >
                  Reset Password
                </Button>
              </form>
              <form onSubmit={this.handleSubmit} noValidate style={{ marginTop: 1 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  name="confirm_password"
                  label="Confirm New Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                  value={confirm_password}
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 24, marginBottom: 16, backgroundColor: '#33ab9f' }}
                >
                  Set Password
                </Button>
              </form>
              <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
                <Grid item align="center" style={{ marginBottom: '2rem' }}>
                  <Link href="/login" variant="body2">
                    Back to login
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
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ForgotPassword));
