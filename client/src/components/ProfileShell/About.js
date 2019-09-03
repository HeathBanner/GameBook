import React, { useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Fab, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Icon, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
        width: '70%',
        margin: '30px 0px',
        background: 'linear-gradient(45deg, #e3e3e3 30%, #c7c7c7 90%)',
        textOverflow: 'ellipsis',
    },
    editContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    editBtn: {
        margin: '10px 10px 0px 0px',
    },
    list: {
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            margin: '20px auto',
            borderRadius: '5px',
        },
        marginTop: '20px',
    },  
    cardHeaders: {
        [theme.breakpoints.down('xs')]: {
            left: 10, 
            transform: 'translate(0%, 0%)',
            width: 'inherit'
        },
        width: '100%',
        position: 'absolute', 
        bottom: '0%', 
        left: '50%', 
        transform: 'translate(-50%, 0%)',
    },
    listItem: {
        display: 'block'
    },
    secondary: {
        display: 'block',
        margin: '8px 0px',
        fontSize: '1rem',
    },
    textField: {
        margin: '10px 0px'
    },
    inputPadding: {
        padding: '0px 0px !important'
    },
    listItemLeft: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'center !important',
            alignItems: 'center',
        },
    },
    edit: {
        [theme.breakpoints.down('xs')]: {

        },
        background: 'rgb(255, 111, 15)',
        '&:hover': {
            background: 'rgb(255, 145, 71)',
        }
    },
    save: {
            background: 'rgb(46, 204, 14)',
        '&:hover': {
            background: 'rgb(100, 255, 69)',
        }
    }
}));

const About = (props) => {

    const classes = useStyles();
    const theme = useTheme();

    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    const [loaded, setLoaded] = React.useState(false);
    const [contactInfo, setContactInfo] = React.useState(true);
    const [educationInfo, setEducationInfo] = React.useState(false);
    const [editInfo, setEditInfo] = React.useState(false);
    const [education, setEducation] = React.useState('');
    const [selfTaught, setSelfTaught] = React.useState('');
    const [skills, setSkills] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [linkedIn, setLinkedIn] = React.useState('');
    
    useEffect(() => {
        if((!loaded) && (props.auth)){
            setLoaded(true); 
            setEducation(props.auth.info.education.education)
            setSelfTaught(props.auth.info.education.selfTaught)
            setSkills(props.auth.info.education.skills)
            setEmail(props.auth.info.contact.email)
            setPhone(props.auth.info.contact.phone)
            setLinkedIn(props.auth.info.contact.linkedIn)
        }
    })

    const cardVariant = () => {
        if(xs) { return 'h5' }
        else { return 'h4' }
    };

    const renderEducation = () => {

        return (

            <Paper className={classes.paper}>
                
                <List style={{padding: '0px 0px'}}>

                    <div className={classes.editContainer}>

                        <Typography className={classes.cardHeaders} variant="h4" color="primary" align="center">
                            Experience Card
                        </Typography>

                        <Fab className={classes.editBtn} onClick={() => setEditInfo(!editInfo)}>
                            <Icon>edit</Icon>
                        </Fab>

                    </div>

                    <ListItem className={classes.listItem}>

                        <ListItemText primary="Education" />

                        <Divider />

                            {
                                editInfo 
                                    ? 
                                renderAbout(education, 'education') 
                                    : 
                                <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                                    {education}
                                </Typography>
                            }
                    </ListItem>
                    <ListItem className={classes.listItem}>

                        <ListItemText primary="Self Taught" />

                        <Divider />

                        {
                            editInfo 
                                ? 
                            renderAbout(selfTaught, 'selfTaught') 
                                : 
                            <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                                {selfTaught}
                            </Typography>
                        }
                    </ListItem>
                    <ListItem className={classes.listItem}>

                        <ListItemText primary="Skills" />

                        <Divider />

                        {
                            editInfo 
                                ? 
                            renderAbout(skills, 'skills') 
                                : 
                            <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                                {skills}
                            </Typography>
                        }

                    </ListItem>

                </List>

            </Paper>
        );
    };

    const renderContact = () => {

        return (
            <Paper className={classes.paper}>

                <div className={classes.editContainer}>

                    <Typography className={classes.cardHeaders} variant={cardVariant()} color="primary" align="center">
                        Contact Card
                    </Typography>

                    <Fab className={classes.editBtn} onClick={() => setEditInfo(!editInfo)}>
                        {
                            editInfo
                                ?
                            <Icon>done_outline</Icon>
                                :
                            <Icon>edit</Icon>
                        }
                    </Fab>

                </div>

                <List>

                    <ListItem className={classes.listItem}>

                        <ListItemText primary="Email" />

                        <Divider />

                            {
                                editInfo 
                                    ? 
                                renderAbout(email, 'email') 
                                    :
                                <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                                    {email}
                                </Typography>
                            }
                    </ListItem>
                    <ListItem className={classes.listItem}>

                        <ListItemText primary="Phone" />

                        <Divider />

                        {
                            editInfo 
                                ? 
                            renderAbout(phone, 'phone') 
                                :
                            <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                                {phone}
                            </Typography>
                        }

                    </ListItem>
                    <ListItem className={classes.listItem}>

                        <ListItemText primary="LinkedIn" />

                        <Divider />

                        {
                            editInfo 
                                ? 
                            renderAbout(linkedIn, 'linkedIn') 
                                :
                            <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                                {linkedIn}
                            </Typography>
                        }

                    </ListItem>

                </List>

            </Paper>
        ); 
    };

    const renderList = () => {
        if(contactInfo) { return renderContact() }
        if(educationInfo) { return renderEducation() }
    };

    const renderEdit = (bool) => {

        if(!bool) {

            return (

                <ListItem classes={{button: classes.edit}} button onClick={() => setEditInfo(!editInfo)}>
                    
                    <ListItemIcon>
                        <Icon>edit</Icon>
                    </ListItemIcon>

                    <ListItemText primary="Edit Info" />

                </ListItem> 
            );
        }
        else {

            return (

                <ListItem className={classes.save} button onClick={saveInfo}>
                    
                    <ListItemIcon>
                        <Icon>check</Icon>
                    </ListItemIcon>

                    <ListItemText primary="Save Info" />

                </ListItem> 
            );
        }
    };

    const renderEditor = () => {

        if((props.auth)&&(props.handle.handle === props.auth.username)) {

            if(!editInfo) { return renderEdit(false) }
            else {  return renderEdit(true) }
        }
    };

    const renderAbout = (state, section) => {

        return (

            <TextField 
                value={state}
                onChange={handleChange}
                fullWidth
                multiline={true}
                name={section}
                inputProps={{className: classes.textField}}
                InputProps={{className: classes.inputPadding}}
            />
        );
    };

    const handleChange = (e) => {

        const { value, name } = e.target;

        switch (name) {
            case 'education':
                setEducation(value);
                break;
            case 'selfTaught':
                setSelfTaught(value);
                break;
            case 'skills':
                setSkills(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'linkedIn':
                setLinkedIn(value);
                break;
            default:
                break;
        }
    };

    const saveInfo = () => {

        setEditInfo(false);

        const data = {
            id: props.auth.info._id,
            education: education,
            selfTaught: selfTaught,
            skills: skills,
            email: email,
            phone: phone,
            linkedIn: linkedIn
        }

        fetch('/api/social/saveInfo', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        .then();
    };

    const handleClick = (item) => {

        switch (item) {
            case 'contact':
                setContactInfo(true);
                setEducationInfo(false);
                break;
            case 'education':
                setEducationInfo(true);
                setContactInfo(false);
                break;
            default:
                break;
        }
    };

    return (

        <Grid container>

            <Grid item md={4} xs={12}>

                <List  className={classes.list} component="nav">
                    
                    
                    <ListItem className={classes.listItemLeft} button onClick={() => handleClick('contact')}>
                        
                        <ListItemIcon>
                            <Icon>contacts</Icon>
                        </ListItemIcon>
                        
                        <ListItemText primary="Contact Info" />

                    </ListItem>

                    <Divider />

                    <ListItem className={classes.listItemLeft} button onClick={() => handleClick('education')}>
                        
                        <ListItemIcon>
                            <Icon>school</Icon>
                        </ListItemIcon>
                        
                        <ListItemText primary="Work and Education" />
                    
                    </ListItem> 
                
                </List>

            </Grid>
            <Grid className={classes.listContainer} item md={8} xs={12}>

                {renderList()}

            </Grid>
        </Grid>
    );
};

export default About;