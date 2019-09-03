import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Popover, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '20px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        [theme.breakpoints.down('lg')]: {
            width: '60%',
            margin: '10px auto',
            padding: '20px',
        },
        [theme.breakpoints.down('md')]: {
            width: '70%',
            margin: '10px auto',
            padding: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            margin: '10px auto',
            padding: '20px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            margin: '10px auto',
            padding: '20px',
        },
        width: '70%',
        margin: '10px auto',
        padding: '20px',
        zIndex: 1800,
    },
    popover: {
        zIndex: '1600 !important',
    },
    title: {
        marginBottom: 10
    },
    warning: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    body: {
        marginTop: 20,
    },
}));

const DescPopover = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <div className={classes.root}>

            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Information
            </Button>

            <Popover
                classes={{paper: classes.description}}
                className={classes.popover}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >

                <Typography className={classes.title} variant="h3" align="center" color="primary">
                    Social Media Concept
                </Typography>
                    <Divider />
                <Typography color="secondary" align="center" className={classes.warning}>
                    ***Still under development***
                </Typography>
                <Typography className={classes.body}>
                    The Database uses a similar method that Facebook has. Foreign Keys/References linking every type of information
                    as if it were a spider's web. When one "strand" of the web is touched, it can be heard from another end of the web.
                </Typography>
                <Typography className={classes.body}>
                    This concept uses MongoDB to store and use the information.
                    Users, Stories and the rest of their information are stored within seperate collections containing references to one another.
                    A private messaging feature will be implemented in the near future. It is very close to being finished.
                </Typography>

            </Popover>

        </div>
    );
}

export default DescPopover;