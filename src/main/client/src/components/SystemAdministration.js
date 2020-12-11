import React, { useState, useEffect }from 'react'
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AuthService from ".././services/auth.service";
// Dialog component from Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EditIcon from '@material-ui/icons/Edit';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    table: {
      minWidth: 750,
      maxWdith: 750,
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
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // --------------------------

    /// GETTING ALL USERS

    const [currentUser, setCurrentUser] = useState({

    });

    const [users, setUsers] = useState([

    ])  

    const [accessToken, setAccessToken] = useState(undefined);


  useEffect(() => {
    const userReceived = AuthService.getCurrentUser();
    fetch(`http://localhost:8080/admin/users/`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + userReceived.accessToken, 
          }), 
    })
    .then(response => response.json())
    .then(json => setUsers(json))
}, [users])

    // --------------------------

    const [employees, setEmployees] = useState([

    ]) 

    // dialog for adding users

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleDialogClose = () => {
  setOpen(false);
};

// user object to sent for the POST request

const [user, setUser] = React.useState()

 // Post request to add a user

 const onUserSubmit = (e) => {
  e.preventDefault()
  const userReceived = AuthService.getCurrentUser();
  fetch(`http://localhost:8080/admin/users/create`, {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'Bearer ' + userReceived.accessToken,
      "Content-Type": "application/json", 
    }), 
    body: JSON.stringify(user),
  })
  .then(res => res.json())
  .then(json => setUsers(json.user))
}

// delete request

const deleteUser = (userID) => {
  const userReceived = AuthService.getCurrentUser();
  fetch(`http://localhost:8080/admin/users/${userID}/`, {
    method: 'DELETE',
    headers: new Headers({
      'Authorization': 'Bearer ' + userReceived.accessToken,
      "Content-Type": "application/json", 
    }), 
  })
  .then(response => response.json())
  console.log(userID + ":user deleted!!!")
};

// edit request


// declaring temporary state for the edit user
const [editUser, setEditUser] = useState({})


// Edit Dialog 
const [openEditUser, setOpenEditUser] = React.useState(false);

// id passes the selected user through the icon button modify into the editUser state

const handleClickOpenEditUser = (id) => {
  console.log("User to edit object below:")
  console.log(id)
  setEditUser(id);
  setOpenEditUser(true);
};

const handleCloseEditUser = () => {
  setOpenEditUser(false);
};

// Put request to edit the specific user of the patient

const onEditedUserSubmit = (e) => {
  e.preventDefault()
  const userReceived = AuthService.getCurrentUser();
  console.log("attempting to send")
  console.log(editUser);
  setUser(editUser)
  console.log(user);
  fetch(`http://localhost:8080/admin/users/${editUser.id}/edit`, {
    method: 'PUT',
    headers: new Headers({
      'Authorization': 'Bearer ' + userReceived.accessToken,
      "Content-Type": "application/json", 
    }), 
    body: JSON.stringify(editUser),
  })
  .then(res => res.json())
  .then(json => setUsers(json.editUser))
}


// date picker
    
const [selectedDate, setSelectedDate] = React.useState(new Date('1999-01-01T00:00:00'));
    
const handleDateChange = (date) => {
    setSelectedDate(date);
    setUser({...user, birthday: date})
    setEditUser({...editUser, birthday: date})
  };

  // condition dropdown options

const [condition, setCondition] = React.useState();

  const handleRoleChange = (event) => {
    setCondition(event.target.value);
    setUser({...user, role: event.target.value});
    setEditUser({...editUser, role: event.target.value});
  };

const conditions = [
  {
    value: 'ROLE_ADMIN',
  },
  {
    value: 'ROLE_SUPERVISOR',
  },
  {
    value: 'ROLE_USER',
  },
];


// receiving all carriers

const [carriers, setCarriers] = useState([

])  

useEffect(() => {
  const userReceived = AuthService.getCurrentUser();
  fetch(`http://localhost:8080/admin/carriers/`, {
      headers: new Headers({
          'Authorization': 'Bearer ' + userReceived.accessToken, 
        }), 
  })
  .then(response => response.json())
  .then(json => setCarriers(json))
}, [carriers])

// Put request to edit the specific user of the patient

const [carrier, setCarrier] = useState({

})  

const approveCarrier = (carrier) => {
  const userReceived = AuthService.getCurrentUser();
  console.log(carrier);
  console.log("attempting to send")
  setCarrier(carrier)
  let updatedCarrier = {
    ...carrier,
    approved: true,
  }
  console.log(updatedCarrier);

  fetch(`http://localhost:8080/admin/carriers/${carrier.id}/approve`, {
    method: 'PUT',
    headers: new Headers({
      'Authorization': 'Bearer ' + userReceived.accessToken,
      "Content-Type": "application/json", 
    }), 
    body: JSON.stringify(updatedCarrier)
  })
  .then(res => res.json())
  .then(json => setCarrier(json.updatedCarrier))
}



    return (
        <div>
        <Nav/>
        <Toolbar/>
        <div className={classes.content}>
        <Container maxwidth="sm" className={classes.toolbar}>
        <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        >
        CREATE USER
      </Button>
      <p></p>
        <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="USERS" {...a11yProps(0)} />
          <Tab label="APPROVED CARRIERS" {...a11yProps(1)} />
          <Tab label="CARRIER APPLICATIONS" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <TableContainer component={Paper} style={{overflow: "hidden"}}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Username</strong></TableCell>
          <TableCell><strong>Email</strong></TableCell>
          <TableCell><strong>CRN</strong></TableCell>
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
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.crn}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.birthday}</TableCell>
            <TableCell align="center">
            <Tooltip title="Modify">
                        <IconButton aria-label="modify" size="small" onClick={() => handleClickOpenEditUser(user)}>
                            <EditIcon />
                         </IconButton>
                        </Tooltip> 
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={()=>deleteUser(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                       </Tooltip> 
            </TableCell>
          </TableRow>
          </Slide>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <TableContainer component={Paper} style={{overflow: "hidden"}}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Description</strong></TableCell>
          <TableCell><strong>Phone</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {carriers.map((carrier) => (   
                  <>
              { carrier.approved === true &&
      <Slide direction="up" in={carriers} mountOnEnter unmountOnExit>
      <TableRow key={carrier.id}>
            <TableCell>{carrier.name}</TableCell>
            <TableCell>{carrier.description}</TableCell>
            <TableCell>{carrier.phone}</TableCell>
            {/* <TableCell>{carrier.approved === false ? "Not Approved" : "Approved"}</TableCell> */}
          </TableRow>
          </Slide>
          }
          </>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <TableContainer component={Paper} style={{overflow: "hidden"}}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Description</strong></TableCell>
          <TableCell><strong>Phone</strong></TableCell>
          <TableCell><strong>Approved</strong></TableCell>
          <TableCell align="center"><strong>Action</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {carriers.map((carrier) => (   
                  <>
              { carrier.approved === false &&
      <Slide direction="up" in={carriers} mountOnEnter unmountOnExit>
      <TableRow key={carrier.id}>
            <TableCell>{carrier.name}</TableCell>
            <TableCell>{carrier.description}</TableCell>
            <TableCell>{carrier.phone}</TableCell>
            <TableCell>{carrier.approved === false ? "Not Approved" : "Approved"}</TableCell>
            <TableCell align="center">
                      <Tooltip title="Approve">
                        <IconButton aria-label="approve" onClick={()=>approveCarrier(carrier)}>
                          <ThumbUpIcon />
                        </IconButton>
                       </Tooltip> 
            </TableCell>
          </TableRow>
          </Slide>
          }
          </>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
        </TabPanel>
      </SwipeableViews>
      <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
<form className={classes.root} noValidate autoComplete="off" onSubmit={onUserSubmit}>
        <DialogTitle id="form-dialog-title">USER CREATION</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new user to the system, please use the form below
          </DialogContentText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Full name"
            name="user[fullname]"
            onChange={e => setUser({...user, fullname: e.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Address"
            name="user[address]"
            onChange={e => setUser({...user, address: e.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="user[email]"
            autoComplete="email"
            autoFocus
            onChange={e => setUser({...user, email: e.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            label="Civil Registration Number"
            name="user[crn]"
            onChange={e => setUser({...user, crn: e.target.value})}
            autoFocus
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
          name="user[birthday]"
          fullWidth
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Username"
            name="user[username]"
            onChange={e => setUser({...user, username: e.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="user[password]"
            onChange={e => setUser({...user, password: e.target.value})}
            autoFocus
          />
          <p></p>
          <TextField
          variant="outlined"
          id="standard-select-condition"
          select
          fullWidth
          label="User System Role"
          value={condition}
          name="user[role]"
          onChange={handleRoleChange}
        >
          {conditions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleDialogClose} color="primary">
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>
      {/* EDIT USER DIALOG */}
      <Dialog open={openEditUser} onClose={handleCloseEditUser} aria-labelledby="form-dialog-title">
<form className={classes.root} noValidate autoComplete="off" onSubmit={onEditedUserSubmit}>
          <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Currently editing the details of {editUser.username}
          </DialogContentText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            value={editUser.fullname}
            label="Full name"
            name="user[fullname]"
            onChange={e => setEditUser({...editUser, fullname: e.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            value={editUser.address}
            label="Address"
            name="user[address]"
            onChange={e => setEditUser({...editUser, address: e.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="user[email]"
            autoComplete="email"
            value={editUser.email}
            autoFocus
            onChange={e => setEditUser({...editUser, email: e.target.value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={editUser.crn}
            type="number"
            label="Civil Registration Number"
            name="user[crn]"
            onChange={e => setEditUser({...editUser, crn: e.target.value})}
            autoFocus
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
          name="user[birthday]"
          fullWidth
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Username"
            value={editUser.username}
            name="user[username]"
            onChange={e => setEditUser({...editUser, username: e.target.value})}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="user[password]"
            value={editUser.password}
            onChange={e => setEditUser({...editUser, password: e.target.value})}
            autoFocus
          />
          <p></p>
          <TextField
          disabled
          variant="outlined"
          id="standard-select-condition"
          select
          fullWidth
          label="User System Role"
          value={editUser.role}
          name="user[role]"
          onChange={handleRoleChange}
        >
          {conditions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditUser} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleCloseEditUser} color="primary">
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>
        </Container>
        </div>
        </div>
    )
}