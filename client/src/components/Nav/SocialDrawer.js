import React, { useContext, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  Avatar,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { AuthContext } from '../../contexts/AuthContext';

// import Moment from 'react-moment';
import FormatDate from 'moment';

const drawerWidth = 240;

const links = ['/inbox', '/settings', '/findFriends'];

const SocialDrawer = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolBar: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      // justifyContent: 'center',
      // display: 'block',
      // textAlign: 'center',
      background: 'rgb(255, 145, 71)',
    },
    menuButton: {
        position: 'absolute',
        left: '3%',
        marginRight: theme.spacing(2),
        color: props.mood ? `${props.mood.menuButton}` : 'white',
    },
    barTitle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      color: props.mood ? `${props.mood.barTitle}` : 'white',
      width: 'auto',
    },
    typo: {
      width: 'auto',
      display: 'inline',
      marginLeft: '10px',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: '0px',
      // width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    moment: {
      position: 'absolute',
      right: '3%',
      marginRight: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
    },
    clock: {
      marginRight: '5px'
    },
    link: {
      color: 'black',
      textDecoration: 'none',
      '&:hover': {
        color: 'black',
      }
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const value = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => { setOpen(true); };

  const handleDrawerClose = () => { setOpen(false); };

  const handleMenuItem = () => { value.onLogout(); };

  const getTime = () => { date = FormatDate(); };

  var date = '';
  setInterval(getTime, 30000);

  return (
      <Fragment>

        <div className={classes.root}>
          <AppBar
            position="relative"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >

            <Toolbar className={classes.toolBar}>

              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <Icon>menu</Icon>
              </IconButton>

              <Link className={classes.barTitle} to='/social'>
                {/* <Avatar alt={value.user ? value.user.username : console.log('NOPE')} src='/imgs/avatar.jpg' /> */}
                {/* <Typography className={classes.typo} variant="h6">
                  {value.user ? value.user.username : 'Anon'}
                </Typography> */}
              </Link>

            </Toolbar>

          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>

              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <Icon>chevron_left</Icon> : <Icon>cheveron_right</Icon>}
              </IconButton>

            </div>

            <Divider />

            <List>
              {
                ['Inbox', 'Settings', 'Find Friends'].map((text, index) => (
                  <Link key={index} style={{color: 'black', textDecoration: 'none'}} to={links[index]}>
                    <ListItem button key={text}>
                      <ListItemIcon >{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                ))
              }
                <ListItem onClick={handleMenuItem} button key='Logout'>

                  <ListItemIcon>
                    <Icon>mail</Icon>
                  </ListItemIcon>

                  <ListItemText primary='Logout' />

                </ListItem>

            </List>

            <Divider />

            </Drawer>

        </div>

      </Fragment>
  );
};

export default SocialDrawer;