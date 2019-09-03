import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Icon, Typography, Fab} from '@material-ui/core';
import EditEmail from '../../components/Social/EditSettings/EditEmail';
import EditPassword from '../../components/Social/EditSettings/EditPassword';
import EditAvatar from '../../components/Social/EditSettings/EditAvatar';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    pageHeader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    page: {
        width: '100vw',
        height: '100vh',
    },
    back: {
        marginTop: '10px',
    },
    main: {
        display: 'block',
    },
    test: {
        position: 'absolute',
        top: '50%',
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
    },
    settingsHeader: {
        margin: '60px 0px 10px 0px',
        textAlign: 'center',
    },
}));

function Settings() {

    const classes = useStyles();

    const [email, setEmail] = React.useState(false);
    const [password, setPassword] = React.useState(false);
    const [avatar, setAvatar] = React.useState(true);

    function handleClick(item) {
        if(item === 'email'){setEmail(!email); setPassword(false); setAvatar(false);}
        if(item === 'password'){setPassword(!password); setEmail(false); setAvatar(false); }
        if(item === 'avatar'){setAvatar(!avatar); setEmail(false); setPassword(false); }
    }

    function renderComponent() {
        if(email){return <EditEmail />}
        if(password){return <EditPassword />}
        if(avatar){return <EditAvatar />}
    }

    return (
      <div className="container-fluid">
          <div className="row marg colp">
            <div className="col-3 marg colp">
                 <Link to="/social">
                    <Fab className={classes.back} color="primary" size="medium">
                        <Icon>arrow_back</Icon>
                    </Fab>
                </Link>
            </div>
            <div className="col-9">
                <Typography className={classes.pageHeader} variant="h4" color="textSecondary">
                    Account Settings
                </Typography>

            </div>
          </div>
          <div className="row marg colp">
                <div className="col-3 marg colp">
                    <Typography className={classes.settingsHeader}>
                        Account Settings
                    </Typography>
                    <Divider/>
                    <List component="nav">
                        <ListItem button onClick={() => handleClick('email')}>
                            <ListItemIcon>
                                <Icon>alternate_email</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Edit Email" />
                        </ListItem>
                        <Divider/>
                        <ListItem button onClick={() => handleClick('password')}>
                            <ListItemIcon>
                                <Icon>security</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Edit Password" />
                        </ListItem>
                        <Divider/>
                        <ListItem button onClick={() => handleClick('avatar')}>
                            <ListItemIcon>
                                <Icon>supervised_user_circle</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Change Avatar" />
                        </ListItem>
                    </List>
                </div>
                <div className="col-9 marg colp">
                    <div className={classes.main}>
                            {renderComponent()}
                    </div>
                </div>
         
          </div>
      </div>  
    );
}

export default Settings;