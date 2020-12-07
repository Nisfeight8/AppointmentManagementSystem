import React, { useState, useEffect }from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nav from './Nav'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
    addEmployeeButton: {
      backgroundColor: "black",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        [theme.breakpoints.up("sm")]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`
        }
      },
}))

export default function SystemAdministration() {
    const classes = useStyles();

    return (
        <div>
        <Nav/>
        <div className={classes.content}>
        <Container maxwidth="sm" className={classes.toolbar}>
            <h2>Hello from SystemAdministration</h2>
        </Container>
        </div>
        </div>
    )
}