import React, { useState, useEffect }from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


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
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    stepper: {
      minWidth: 900,
      backgroundColor: "#fafafa",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  }));

  function getSteps() {
    return ['Fill out the carrier registration form', 'Submit the application', 'Add your employees'];
  }

export default function CreateCarrier() {
    const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

    return (
      <div>
      <Nav/>
      <div className={classes.content}>
        <Container component="main" maxWidth="xs" className={classes.toolbar}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Carrier Registration Application Form
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
            SEND APPLICATION
          </Button>
        </form>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
    </div>
    )
}