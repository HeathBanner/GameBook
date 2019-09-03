import React, { Fragment, useContext, useEffect, useState } from 'react';

import AuthContext from '../../../context/AuthContext';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Avatar, Typography, Fab, Icon } from '@material-ui/core';


import { Parallax } from 'react-parallax';

const useStyles = makeStyles(theme => ({
    skyliner: {
        [theme.breakpoints.up('sm')]: {
            height: '60vh',  
        },
        [theme.breakpoints.down('sm')]: {
            height: '50vh',
        },
        width: '100%',
        zIndex: 1400,
        position: 'relative',
    },
    skylinerRow: {
        [theme.breakpoints.down('sm')]: {
            height: '50vh',
            display: 'flex',
            alignItems: 'flex-end',    
            justifyContent: 'center',
        },
        height: '60vh',
        display: 'flex',
        alignItems: 'flex-end',
    },
    skylinerContent: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'row',
        flexWrap: 'none',
    },
    profileAvatar: {
        [theme.breakpoints.down('md')]: {
            width: 120,
            height: 120,
            margin: '0px 20px 0px 10px',    
        },
        [theme.breakpoints.down('sm')]: {
            width: 120,
            height: 120,
            margin: '0px 20px 0px 10px',
        },
        [theme.breakpoints.down('xs')]: {
            width: 90,
            height: 90,
            margin: '0px 10px 0px 10px',
        },
        width: 120,
        height: 120,
        margin: '0px 20px 0px 10px',
    },
    username: {
        [theme.breakpoints.down('md')]: {
        },
        [theme.breakpoints.down('sm')]: {
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.7rem',
            bottom: 0,
            left: 110,
        },
        color: 'white',
        position: 'absolute',
        bottom: -10,
        left: 150,
    },
    skylinerDivLeft: {
        [theme.breakpoints.down('xs')]: {
            bottom:  -7,
        },
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative',
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
}));

const Skyliner = (props) => {

    const auth = useContext(AuthContext);
    
    const classes = useStyles();
    const theme = useTheme();

    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    const getTop = () => {
        if(xs) { return { top: '0%' } }
        if(sm) { return { top: '-20%' } }
        if(md) { return { top: '-20%' } }
        else { return { top: '-40%' } }
    };


    const [loaded, setLoaded] = useState(false);
    const [friend, setFriend] = useState(false);

    useEffect(() => {

        if((!loaded)&&(auth.user)&&(props.user)) {

            setLoaded(true)

            var result = auth.user.info.friendList.filter(friend => props.user.username === friend.username)
            
            if(result.length === 1) { setFriend(true) }
        }
    });

    const addFriend = () => {

        const data = {
            friendId: props.user._id,
            personalId: auth.user._id,
        };

        fetch('/api/social/addFriend', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => { setFriend(true) });
    };

    const renderSkyliner = () => {

        if(props.user) {

            return (

                <Fragment>

                    <Parallax
                        bgImage={props.user.info.skyline}
                        bgImageAlt="Skyliner"
                        strength={200}
                        className={classes.skyliner}
                        bgImageStyle={getTop()}
                        bgStyle={{}}
                    >
                        <Grid container className={classes.skylinerRow}>

                            <Grid item xs={6} className={classes.skylinerContent}>

                                <div className={classes.skylinerDivLeft}>

                                    <Avatar src={`./imgs/me.png`} className={classes.profileAvatar}/>
                                    
                                    <Typography
                                        display="inline"
                                        variant="h2"
                                        color="textPrimary"
                                        className={classes.username}
                                    >
                                        {props.username}
                                    </Typography>

                                </div>

                            </Grid>
                            <Grid item xs={6} className={classes.skylinerContent}>

                                <div className={classes.skylinerDivRight}>

                                    {renderButtons()}   

                                </div>

                            </Grid>

                        </Grid>

                    </Parallax>
                
                </Fragment>
            );
        } 
        else { return }
    };

    const renderButtons = () => {

        if(props.auth) {
            if(props.auth.username !== props.username) {

                return (

                    <Fragment>

                        {
                            friend 
                                ? 
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
};

export default Skyliner;