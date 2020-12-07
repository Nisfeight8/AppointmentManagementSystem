import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import Navbar from './Navbar';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Appointment Management IVS
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

export default function NewAppointment() {
    const classes = useStyles();
  
    return (
      <React.Fragment>
        <CssBaseline />
        {/* <AppBar position="relative">
          <Toolbar>
            <LockIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
            <Button variant="contained" color="primary">
                  LOGOUT
             </Button>
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Navbar/>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                New Appointment
              </Typography>
              <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Carrier"
            name="carrier[name]"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="standard-multiline-static"
            type="number"
            required
            fullWidth
            label="Carrier Phone Number"
            name="carrier[phoneNumber]"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="standard-multiline-static"
            multiline
            required
            fullWidth
            type="text"
            label="Carrier Description"
            name="carrier[description]"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SEND APPOINTMENT
          </Button>
        </form>
            </Container>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Distributed Systems Class
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Harokopio University
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }