import React, { useState, useEffect }from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        [theme.breakpoints.up("sm")]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`
        }
      },
}))



export default function CarrierHandled() {

  const [employees, setEmployees] = React.useState([

  ])


    const classes = useStyles();

    return (
      <div>
      <Nav/>
      <div className={classes.content}>
      <Container maxwidth="sm" className={classes.toolbar}>
       {/* <div style={{display: 'inline-flex'}}>
        <Button startIcon={<LocalHospitalIcon />} color="primary" variant="outlined" className={classes.button}>Add</Button>
        <span style={{marginLeft: "550px", marginTop: "8px"}}>
    </span>
    </div> */}
    <Toolbar/>
    {/* <Button variant="outlined" color="black" onClick={handleClickOpen}>
    Add Employee
    </Button> */}
    {/* overflow hides the scrollbar at the table on patient GET/POST/UPDATE/DELETE */}
    <TableContainer component={Paper} style={{overflow: "hidden"}}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Email</strong></TableCell>
          <TableCell><strong>Phone</strong></TableCell>
          <TableCell><strong>Address</strong></TableCell>
          <TableCell><strong>Date of birth</strong></TableCell>
          <TableCell align="center"><strong>Action</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees.map((employee) => (   
      <Slide direction="up" in={employees} mountOnEnter unmountOnExit>
      <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell align="right">{employee.phone}</TableCell>
            <TableCell align="right">{employee.address}</TableCell>
            <TableCell align="right">{employee.birth}</TableCell>
            <TableCell align="center">
                      <Tooltip title="Delete">
                        {/* <IconButton aria-label="delete" onClick={()=>deleteEmployee(employee.id)}> */}
                          <DeleteIcon />
                        {/* </IconButton> */}
                       </Tooltip> 
            </TableCell>
          </TableRow>
          </Slide>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Container>
        </div>
        </div>
    )
}