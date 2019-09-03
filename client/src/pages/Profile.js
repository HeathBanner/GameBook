import React, { useEffect, useState, useContext } from 'react';

import {  Popover, Paper, Typography, TextField, Button, List, ListItem, Icon, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthContext from '../../context/AuthContext';

import SocialDrawer from '../../components/Navigation/SocialDrawer';
import Skyliner from '../../components/Social/Profile/Skyliner';
import ProfileNav from '../../components/Social/Profile/ProfileNav';
import TimelineTab from '../../components/Social/Profile/TimelineTab';
import AboutTab from '../../components/Social/Profile/About';
import FriendsTab from '../../components/Social/Profile/Friends';
import PhotosTab from '../../components/Social/Profile/Photos';
import Chat from '../Chat/Chat';


const useStyles = makeStyles(theme => ({
    chatMenu: {
        position: 'fixed',
        bottom: '0',
        right: '0',
    },
    chatPaper: {        
        minHeight: 300,
        minWidth: 200,
        padding: '10px 10px',

    },
    chatInput: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        margin: '0px 10px',
    },
    chatList: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingInlineStart: '0px'
    },   
    listItem: {
        padding: '0px 0px 0px 0px'
    },
}))

function Profile(props) {

    const [user, setUser] = useState([]);
    const [onLoad, setOnLoad] = useState(false);
    const [tabFunc, setTabFunc] = useState({onChange: handleTabChange});
    const [profileTimeline, setProfileTimeline] = useState(true);
    const [About, setAbout] = useState(false);
    const [Friends, setFriends] = useState(false);
    const [Photos, setPhotos] = useState(false);
    const [open, setOpen] = useState(true);

    const classes = useStyles();
    const auth = useContext(AuthContext);

    function handleClick(event) {
        setOpen(!open);
    }

    function handleClose() {
        setOpen(false)
    }



    function renderMenu() {
        return (
            <Popover
                anchorPosition="anchorPosition"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                className={classes.chatMenu}
                anchorPosition={{bottom: 0, right: 0}}
                id="simple-menu"
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <Chat />
            </Popover>

        );
    }

    function handleTabChange(tab) {
        console.log(tab)
        switch (tab) {
            case 'Timeline':
                setProfileTimeline(true);
                setAbout(false);
                setFriends(false);
                setPhotos(false);
                break;
            case 'About':
                setAbout(true);
                setProfileTimeline(false);
                setFriends(false);
                setPhotos(false);
                break;
            case 'Friends':
                setFriends(true);
                setProfileTimeline(false);
                setAbout(false);
                setPhotos(false);
                break;
            case 'Photos': 
                setPhotos(true);
                setProfileTimeline(false);
                setAbout(false);
                setFriends(false);
                break;
            default:
                break; 
        }
    };

    function renderTabs() {
        if(profileTimeline){return <TimelineTab page={props.match.params} />}
        if(About){return <AboutTab handle={props.match.params} auth={auth.user} info={user.info} />}
        if(Friends){return <FriendsTab user={user} />}
        if(Photos){return <PhotosTab info={user.info} />}
    }

    useEffect(() => {
        const { handle } = props.match.params
        setOnLoad(true);
        if(!onLoad){
            fetch('/api/social/getProfile', {
                method: 'POST',
                body: JSON.stringify({username: handle}),
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then((result) => {
                console.log(result);
                setUser({...user, ...result})
            });
        }
    })

    return (
        <div style={{height: '100vh', width: '100vw'}} className="container-fluid colp">
            {renderMenu()}
            <div className="row marg">
                <div className="col-12 colp">
                    <SocialDrawer />
                </div>
            </div>
            <div className="row marg">
                <div className="col-12 colp">
                    <Skyliner user={user} handleClick={handleClick} auth={auth.user} username={props.match.params.handle} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ProfileNav  tabChange={tabFunc} />
                </div>
            </div>
            <div className="row marg">
                {renderTabs()}
            </div>
        </div>
    );
}

export default Profile;