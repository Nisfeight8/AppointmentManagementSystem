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

    // useEffect(() => {
    //   const user = AuthService.getCurrentUser();
    //   if (user) {
    //     setCurrentUser(user);
    //     setAccessToken(user.accessToken);
    //     console.log(accessToken);
    //   } else {
    //     console.log("user not logged");
    //   }
    // }, [currentUser]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    fetch(`http://localhost:8080/admin/users/`, {
        headers: new Headers({
            'Authorization': 'Bearer ' + user.accessToken, 
          }), 
    })
    .then(response => response.json())
    .then(json => setUsers(json))
}, [])

    // --------------------------

    const [employees, setEmployees] = useState([

    ]) 

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
        onClick={handleClick}
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
          <Tab label="CARRIERS" {...a11yProps(1)} />
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
          <TableCell><strong>Email</strong></TableCell>
          <TableCell><strong>Civil Registration Number</strong></TableCell>
          <TableCell><strong>System Role</strong></TableCell>
          <TableCell><strong>Address</strong></TableCell>
          <TableCell><strong>Date of birth</strong></TableCell>
          <TableCell align="center"><strong>Action</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (   
      <Slide direction="up" in={users} mountOnEnter unmountOnExit>
      <TableRow key={user.id}>
            <TableCell>{user.fullname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.crn}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.birthday}</TableCell>
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
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
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
        </TabPanel>
      </SwipeableViews>
        </Container>
        </div>
        </div>
    )
}