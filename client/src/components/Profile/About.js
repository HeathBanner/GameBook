import React, { Fragment, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Icon, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        marginTop: '20px',
    },  
    listItem: {
        display: 'block'
    },
    secondary: {
        display: 'block',
        margin: '10px 0px',
        fontSize: '1rem',
    },
    textField: {
        margin: '10px 0px'
    },
    inputPadding: {
        padding: '0px 0px !important'
    },
    edit: {
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

function About(props) {

    const classes = useStyles();

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
        if((!loaded) && (props.auth.info)){
            setLoaded(true); 
            setEducation(props.auth.info.education.education)
            setSelfTaught(props.auth.info.education.selfTaught)
            setSkills(props.auth.info.education.skills)
            setEmail(props.auth.info.contact.email)
            setPhone(props.auth.info.contact.phone)
            setLinkedIn(props.auth.info.contact.linkedIn)
        }
    })

    function renderEducation() {
        return (
            <List>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Education" />
                    <Divider />
                        {editInfo ? renderAbout(education, 'education') : 
                            
                            <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                                {education}
                            </Typography>
                            }
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Self Taught" />
                    <Divider />
                    {editInfo ? renderAbout(selfTaught, 'selfTaught') : 
                        
                        <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                            {selfTaught}
                        </Typography>
                        }
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Skills" />
                    <Divider />
                    {editInfo ? renderAbout(skills, 'skills') : 
                        
                    <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                        {skills}
                    </Typography>
                        }
                </ListItem>
            </List>
        )
    }

    function renderContact() {
        return (
            <List>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Email" />
                    <Divider />
                        {editInfo ? renderAbout(email, 'email') :
                            <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                                {email}
                            </Typography>
                        }
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Phone" />
                    <Divider />
                    {editInfo ? renderAbout(phone, 'phone') :
                        <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                            {phone}
                        </Typography>
                    }
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="LinkedIn" />
                    <Divider />
                    {editInfo ? renderAbout(linkedIn, 'linkedIn') :
                        <Typography className={classes.secondary} component="p" variant="body2" color="textPrimary">
                            {linkedIn}
                        </Typography>
                    }
                </ListItem>
            </List>
        ); 
    }

    function renderList() {
        if(contactInfo){return renderContact()};
        if(educationInfo){return renderEducation()};
    }

    function renderEdit(bool) {
        if(!bool){
            return (
                <ListItem classes={{button: classes.edit}} button onClick={() => setEditInfo(!editInfo)}>
                    <ListItemIcon>
                        <Icon>edit</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Edit Info" />
                </ListItem> 
            );
        }else {
            return (
                <ListItem className={classes.save} button onClick={saveInfo}>
                    <ListItemIcon>
                        <Icon>check</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Save Info" />
                </ListItem> 
            );
        }
    }

    function renderEditor() {
        if((props.auth)&&(props.handle.handle === props.auth.username)){
            if(!editInfo){return renderEdit(false);}
            else{return renderEdit(true);}
        }
    }

    function renderAbout(state, section) {
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
        )
    }

    function handleChange(e) {
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
    }

    function saveInfo() {
        setEditInfo(false);
        const data = {
            id: props.auth._id,
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
        }).then(res => res.json())
        .then((result) => {});
    }

    function handleClick(item) {
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
    }

    return (
        <Fragment>
            <div className="col-4">
                <List  className={classes.list} component="nav">
                    
                    {renderEditor()}
                    
                    <ListItem button onClick={() => handleClick('contact')}>
                        <ListItemIcon>
                            <Icon>contacts</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Contact Info" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => handleClick('education')}>
                        <ListItemIcon>
                            <Icon>school</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Work and Education" />
                    </ListItem> 
                </List>
            </div>
            <div className="col-8">
                {renderList()}
            </div>
        </Fragment>
    );
}

export default About;