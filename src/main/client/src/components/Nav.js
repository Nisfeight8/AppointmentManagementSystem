
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutline';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: 'black',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  ListItemIcon: {
    minWidth: "28px",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    color: '#037ffc',
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Divider />
      <List>
          <ListItem button key="Pending" component={Link} to="/carrier/:id/employee/:id/appointments/pending">
            <ListItemIcon><AssignmentOutlinedIcon/></ListItemIcon>
            <ListItemText primary="Pending Appointments" />            
          </ListItem>
          <ListItem button key="Handled" component={Link} to="/carrier/:id/employee/:id/appointments/handled">
          <ListItemIcon><AssignmentTurnedInOutlinedIcon/></ListItemIcon>
            <ListItemText primary="Handled Appointments" />
          </ListItem>
          <Divider />
          <ListItem button key="NewCarrier" component={Link} to="/create/carrier">
          <ListItemIcon><EditOutlinedIcon/></ListItemIcon>
            <ListItemText primary="Create Carrier" />
          </ListItem>
          <ListItem button key="Supervisor" component={Link} to="/carrier/:id/administration">
          <ListItemIcon><BuildOutlinedIcon/></ListItemIcon>
            <ListItemText primary="Carrier Administration" />
          </ListItem>
          <Divider />
          <ListItem button key="Administrator" component={Link} to="/administration">
          <ListItemIcon><SettingsApplicationsOutlinedIcon/></ListItemIcon>
            <ListItemText primary="System Administration" />
          </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            APPOINTMENT MANAGEMENT
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;