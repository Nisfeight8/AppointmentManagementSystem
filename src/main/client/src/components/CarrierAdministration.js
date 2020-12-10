import React, { useState, useEffect }from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { TransitionGroup } from 'react-transition-group';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import {Link} from 'react-router-dom';
import Nav from './Nav'
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthService from ".././services/auth.service";
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

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

  export default function DataTable() {
    const classes = useStyles();

  // GET/Fetch all patients, listener for patients

const [employees, setEmployees] = React.useState([

])

const [employee, setEmployee] = React.useState({

})

// useEffect(() => {
//     fetch(`http://192.168.0.7:8000/carrier/${user.carrierID}/employees`)
//     .then(response => response.json())
//     .then(json => setEmployees(json))

// }, [])

// DELETE patient on click event on line 177

  const deleteEmployee = (employeeID) => {
    console.log(employeeID)
      fetch('http://192.168.0.7:8000/employee/delete/' + employeeID, {
        method: 'DELETE',
        headers: {"Access-Control-Allow-Origin": "*"},
      })
      .then(response => response.json())
      console.log(employeeID + "HELLO!!!")
  };

// add employee dialog

const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory()


  const onSubmit = (e) => {
    e.preventDefault()
    fetch(`http://192.168.0.7:8000/employee/create`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(employee),
    })
    .then(res => res.json())
    .then(json => setEmployees(json.employee))
    window.location.reload()   
  }

  // date picker

const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T00:00:00'));

const handleDateChange = (date) => {
    setSelectedDate(date);
    setEmployee({...employee, birth: date})
  };

  // const [carrier, setCarrier] = useState({

  // })

//   useEffect(() => {
//     const userReceived = AuthService.getCurrentUser();
//     console.log("User received");
//     console.log(userReceived);
//     fetch(`http://localhost:8080/supervisor/${userReceived.id}/carriers`, {
//         headers: new Headers({
//             'Authorization': 'Bearer ' + userReceived.accessToken, 
//           }), 
//     })
//     .then(response => response.json())
//     .then(json => setCarrier(json))
//     .then(console.log("useEffect to get carrier"))
//     .then(console.log(carrier))
// }, [])

//   const [users, setUsers] = useState([

//   ])  

//   useEffect(() => {
//     const userReceived = AuthService.getCurrentUser();
//     console.log("useEffect to get employees")
//     console.log(carrier)
//     fetch(`http://localhost:8080/supervisor/carriers/${carrier.id}/employees`, {
//         headers: new Headers({
//             'Authorization': 'Bearer ' + userReceived.accessToken, 
//           }), 
//     })
//     .then(response => response.json())
//     .then(json => setUsers(json))
// }, [])


// delete request

// const deleteUser = (userID) => {
//   const userReceived = AuthService.getCurrentUser();
//   fetch(`http://localhost:8080/admin/users/${userID}/`, {
//     method: 'DELETE',
//     headers: new Headers({
//       'Authorization': 'Bearer ' + userReceived.accessToken,
//       "Content-Type": "application/json", 
//     }), 
//   })
//   .then(response => response.json())
//   console.log(userID + ":user deleted!!!")
// };


// Fetches current user information and then stores it into currentUser state

const [currentUser, setCurrentUser] = useState({

});

useEffect(() => {
  const user = AuthService.getCurrentUser();
  console.log(user);

  if (user) {
    setCurrentUser(user);
    console.log(currentUser);
  } else {
    console.log("user not logged");
  }
}, []);

// Fetches the carrier that the user is supervisor in 


const [carrier, setCarrier] = useState({

});

useEffect(() => {
    console.log(currentUser);
    console.log("ELAAAA");
    fetch(`http://localhost:8080/supervisor/${currentUser.id}/carriers`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + currentUser.accessToken, 
          }), 
    })
    .then(response => response.json())
    .then(json => setCarrier(json))
}, [carrier])

const [users, setUsers] = useState([

])

// fetches the users from the specific carrier

useEffect(() => {
  fetch(`http://localhost:8080/supervisor/${carrier.id}/users/`, {
      headers: new Headers({
          'Authorization': 'Bearer ' + currentUser.accessToken, 
        }), 
  })
  .then(response => response.json())
  .then(json => setUsers(json))
}, [users])

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
      <Button variant="outlined" color="black" onClick={handleClickOpen}>
      Add Employee
      </Button>
      {/* overflow hides the scrollbar at the table on patient GET/POST/UPDATE/DELETE */}
      <TableContainer component={Paper} style={{overflow: "hidden"}}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Email</strong></TableCell>
          <TableCell><strong>Civil Registration Number</strong></TableCell>
          <TableCell><strong>System Role</strong></TableCell>
          <TableCell><strong>Address</strong></TableCell>
          <TableCell><strong>Date of birth</strong></TableCell>
          <TableCell align="center"><strong>Action</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users && users.map((user) => (   
      <Slide direction="up" in={users} mountOnEnter unmountOnExit>
      <TableRow key={user.id}>
            <TableCell>{user.fullname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.crn}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.birthday}</TableCell>
            <TableCell align="center">
            <Tooltip title="Modify">
                        {/* <IconButton aria-label="modify" size="small" onClick={() => handleClickOpenEditUser(user)}> */}
                            <EditIcon />
                         {/* </IconButton> */}
                        </Tooltip> 
                      <Tooltip title="Delete">
                        {/* <IconButton aria-label="delete" onClick={()=>deleteUser(user.id)}> */}
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
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
        <DialogTitle id="form-dialog-title">Add employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add an employee, please fill out the form below.
          </DialogContentText>
          <TextField 
        id="standard-basic" 
        margin="dense"
        fullWidth
        label="Name"
        name="employee[name]"
        onChange={e => setEmployee({...employee, name: e.target.value})}
        />
        <TextField 
        id="standard-basic" 
        margin="dense"
        type="number"
        fullWidth
        label="Phone number"
        name="employee[phone]"
        onChange={e => setEmployee({...employee, phone: e.target.value})}
        />
        <TextField 
        id="standard-basic" 
        margin="dense"
        fullWidth
        label="Address"
        name="employee[address]"
        onChange={e => setEmployee({...employee, address: e.target.value})}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date of Birth"
          value={selectedDate}
          name="patient[birth]"
          fullWidth
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        <TextField 
        id="standard-basic" 
        margin="dense"
        fullWidth
        label="Username"
        name="employee[username]"
        onChange={e => setEmployee({...employee, username: e.target.value})}
        />
        <TextField 
        id="standard-basic" 
        margin="dense"
        fullWidth
        label="Password"
        type="password"
        name="employee[password]"
        onChange={e => setEmployee({...employee, password: e.target.value})}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="black" type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>
        </Container>
        </div>
        </div>
    )
}