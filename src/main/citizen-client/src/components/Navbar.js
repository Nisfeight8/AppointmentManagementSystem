import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));


export default function Navbar() {
  const classes = useStyles();

    return (
        <AppBar position="relative">
        <Toolbar>
          <LockIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
          <Button variant="contained" color="primary">
                LOGOUT
           </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    )

}