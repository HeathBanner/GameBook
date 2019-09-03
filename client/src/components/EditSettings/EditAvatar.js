import React, { Fragment, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '70%',
        padding: '20px',
        margin: '50px auto',
        textAlign: 'center',
    },
    textField: {
        margin: '20px 0px',
    },
    button: {
        display: 'block',
        margin: '0 auto',
    },
    notchedOutline: {
        // '&:before': {
        //     borderColor: 'rgb(129, 0, 206) !important',
        //     },
        // '&:after': {
        //     borderColor: 'rgb(255, 145, 71) !important',
        // },
        '&:hover': {
            borderColor: 'rgb(129, 0, 206) !important',
        }
    },
}))

function EditAvatar() {
    
    const classes = useStyles();

    const [newAvatar, setNewAvatar] = useState('');

    function handleChange(e) {
        const { value } = e.target;
        setNewAvatar(value);
    }

    return (
        <Fragment>
            <Paper className={classes.root}>
                <Typography variant="h4" position="center">
                    Avatar Editor
                </Typography>
                <TextField 
                    className={classes.textField}
                    InputProps={{classes:{notchedOutline: classes.notchedOutline, PrivateNotchedOutline: classes.notchedOutline}}}
                    value={newAvatar}
                    onChange={handleChange}
                    label="Enter new URL"
                    variant="outlined"
                />
                <Button className={classes.button}>Save</Button>
            </Paper>
        </Fragment>
    );
}

export default EditAvatar;