import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Navbar from './Navbar';
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
import {Link} from 'react-router-dom';

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  table: {
    minWidth: 450,
  },
}));

export default function AllAppointments() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [employees, setEmployees] = React.useState([

])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div>
     <Navbar/>
     <br></br>
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Scheduled Appointments" {...a11yProps(0)} />
        <Tab label="Pending Appointments" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
      <TableContainer component={Paper} style={{overflow: "hidden"}}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Date</strong></TableCell>
          <TableCell><strong>Status</strong></TableCell>
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
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper} style={{overflow: "hidden"}}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell><strong>Date</strong></TableCell>
          <TableCell><strong>Status</strong></TableCell>
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
    </div>
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
    </div>
  );
}