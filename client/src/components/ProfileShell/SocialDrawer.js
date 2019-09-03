import React, { useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CircularProgress, Tooltip, Zoom, useMediaQuery, Drawer, Avatar, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import Moment from 'react-moment';
import FormatDate from 'moment';

import AuthContext from '../../../context/AuthContext';

export default function PersistentDrawerLeft(props) {
  
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      position: 'relative',
      zIndex: 1500,
      
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      [theme.breakpoints.down('md')]: {
        width: `calc(100% - 240px)`,
        marginLeft: '240px',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      [theme.breakpoints.down('sm')]: {
        width: `calc(100% - 180px)`,
        marginLeft: '180px',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      [theme.breakpoints.down('xs')]: {
        width: `calc(100% - 140px)`,
        marginLeft: '140px',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    },
    toolBar: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      background: 'linear-gradient(45deg, #ff9147 30%, #ff7d26 90%)',
    },
    menuButton: {
        position: 'absolute',
        left: '3%',
        marginRight: theme.spacing(2),
        color: props.mood ? `${props.mood.menuButton}` : 'white',
    },
    barTitle: {
      [theme.breakpoints.down('xs')]: {
        top: '50%',
        right: '0%',
        transform: 'translate(-50%, -50%)',
        zIndex: '10',
        padding: '0px 5px',
      },
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
      flexShrink: 0,
    },
    drawerPaper: {
      [theme.breakpoints.down('md')]:{
        width: 240,
      },
      [theme.breakpoints.down('sm')]:{
        width: 180,
      },
      [theme.breakpoints.down('xs')]:{
        width: 140,
      },
      position: 'absolute',
      zIndex: 1600,
      overflowY: 'visible',
      height: '100vh',
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
      [theme.breakpoints.down('md')]:{
        marginLeft: -240,
      },
      [theme.breakpoints.down('sm')]:{
        marginLeft: -180,
      },
      [theme.breakpoints.down('xs')]:{
        marginLeft: -140
      },
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    moment: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
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
    listItemIcon: {
      minWidth: '0px !important',
      marginRight: '10px',
    },
  }));

  const drawerList = [
    {
      text: 'Inbox',
      icon: 'inbox',
      link: '/',
      tip: 'This will lead the user to their inbox'
    },
    {
      text: 'Settings',
      icon: 'settings',
      link: '/',
      tip: 'The user will be able to change their email, password, avatar and other settings'
    },
    {
      text: 'Find Friends',
      icon: 'people',
      link: '/',
      tip: `This will lead the user to the friend finder page where they may search for new friends`
    }
  ];
  
  var drawerWidth;

  const classes = useStyles();
  const theme = useTheme();
  
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  
  const drawerWidthDynam = () => {
      if(xs) {return drawerWidth = 120}
      if(sm) {return drawerWidth = 180}
      if(md) {return drawerWidth = 240}
  }

  drawerWidthDynam()

  const value = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleMenuItem() {
    // value.onLogout();
  }

  function getTime() {
    date = FormatDate()
  }
  var date = ''
  setInterval(getTime, 30000);

  return (
      <Fragment>
        <div className={classes.root}>
          <CssBaseline />
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

                <Link className={classes.barTitle} to='/'>
                  <Avatar alt={value.user ? value.user.username : ''} src={`./imgs/me.png`} />
                  <Typography className={classes.typo} variant="h6">
                    {value.user ? value.user.username : <CircularProgress />}
                  </Typography>
                </Link>

              <div className={classes.moment}>
                <Icon className={classes.clock}>access_time</Icon>
                <Moment interval={30000} date={date} format={'dddd h:mm a'} />
              </div>

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
              {drawerList.map((item, index) => (
                <Tooltip TransitionComponent={Zoom} title={item.tip} key={item.text}>
                  <Link key={item.text} style={{color: 'black', textDecoration: 'none'}} to={item.link}>
                    <ListItem button>
                      <ListItemIcon className={classes.listItemIcon} ><Icon>{item.icon}</Icon></ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </Link>
                </Tooltip>

              ))}
              <Tooltip TransitionComponent={Zoom} title="This button should do what you'd think it would do...if only it were the real website">
                <ListItem onClick={handleMenuItem} button key='Logout'>
                  <ListItemIcon className={classes.listItemIcon}><Icon>power_settings_new</Icon></ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>
              </Tooltip>
            </List>
            <Divider />
            </Drawer>
        </div>
      </Fragment>
  );
}