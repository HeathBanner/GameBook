import React, { Fragment, useContext, useEffect, useState } from 'react';

import AuthContext from '../../../context/AuthContext';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Fab, Icon } from '@material-ui/core';


import { Parallax } from 'react-parallax';

const useStyles = makeStyles({
    skyliner: {
        width: '100%',
        height: '40vh',
        overflow: 'visible'
    },
    skylinerRow: {
        height: '40vh',
        display: 'flex',
        alignItems: 'flex-end',
    },
    skylinerContent: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'row',
        flexWrap: 'none',
    },
    profileAvatar: {
        width: 120,
        height: 120,
        margin: '0px 20px 0px 10px',
        zIndex: 50,
    },
    username: {
        color: 'white',
    },
    skylinerDivLeft: {
        display: 'flex',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom:  -10,
        left: 20,
        overflow: 'visible',
    },
    skylinerDivRight: {
        padding: '0px 20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    Fab: {
        margin: '10px 20px',
    },
})

function Skyliner(props) {

    const classes = useStyles();
    const auth = useContext(AuthContext);
    
    const [loaded, setLoaded] = useState(false);
    const [friend, setFriend] = useState(false);


    function renderPopper() {
        return (
            <Fragment>
                <Fab aria-controls="simple-menu" aria-haspopup="true" onClick={props.handleClick} className={classes.Fab}>
                    <Icon>message</Icon>
                </Fab>
            </Fragment>
        );
    }


    useEffect(() => {
        if((!loaded)&&(auth.user)&&(props.user)){
            setLoaded(true)
            var result = auth.user.info.friendList.filter(friend => props.user.username === friend.username)
            console.log(result);
            console.log(props.user.username);
            console.log(auth.user.friendList)
            if(result.length === 1){console.log('HA');setFriend(true)};
        }
    });

    function addFriend() {

        const data = {
            friendId: props.user._id,
            personalId: auth.user._id,
        };

        fetch('/api/social/addFriend', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((result) => {
            console.log(result);
            setFriend(true);
        });
    };

    function renderSkyliner() {
        if(props.user) {
            return (
                <Fragment>
                    <Parallax
                    bgImage={props.user.info.skyline}
                    bgImageAlt="Skyliner"
                    strength={200}
                    className={classes.skyliner}
                    >
                        <div className={`row ${classes.skylinerRow}`}>
                            <div className={`col-6 ${classes.skylinerContent}`}>
                                <div className={classes.skylinerDivLeft}>
                                <Avatar src={props.user.info.avatar} className={classes.profileAvatar}/>
                                    <Typography
                                        display="inline"
                                        variant="h2"
                                        color="textPrimary"
                                        className={classes.username}
                                    >
                                        {props.username}
                                    </Typography>
                                </div>
                            </div>
                            <div className={`col-6 ${classes.skylinerContent}`}>
                                <div className={classes.skylinerDivRight}>
                                    {renderButtons()}                            
                                </div>
                            </div>
                        </div>
                    </Parallax>
                
                </Fragment>
            );
        } else{return ''}
    }

    function renderButtons() {
        if(props.auth) {
            if(props.auth.username !== props.username) {
                return (
                    <Fragment>
                        {friend ? 
                            <Fab className={classes.Fab}>
                                <Icon>person_outline</Icon> 
                            </Fab>
                        : 
                            <Fab onClick={addFriend} className={classes.Fab}>
                                <Icon>person_add</Icon>
                            </Fab>
                        }
                    </Fragment>
                );
            }
        }
    }

    return (
        <Fragment>
                {renderSkyliner()}
        </Fragment>
    );
}


export default Skyliner;