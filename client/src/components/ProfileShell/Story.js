import React, { Fragment, useContext, useState } from 'react';
import AuthContext from '../../../context/AuthContext';


import { TextField, Icon, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        color: 'black !important',
    },
    postStory: {
        marginLeft: '10px',
        backgroundColor: 'rgb(255, 145, 71)'
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        margin: '20px auto',
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid rgb(129, 0, 206) !important',
        },
        '&:after': {
            borderBottom: '2px solid rgb(255, 145, 71) !important',
        },
        '&:hover:before': {
            borderBottom: '2px solid rgb(129, 0, 206) !important',
        },
    },
    label: {
        '&.Mui-focused': {
            color: 'rgb(255, 145, 71)'
        },
    },
}));

const Story = () => {
    
    
    const classes = useStyles();
    const auth = useContext(AuthContext);
    
    const [story, setStory] = useState('');

    const handleInputChange = (e) => {
        const { value } = e.target
        setStory(value)
    };

    const handleStoryPost = (e) => {
        e.preventDefault();

        const userId = auth.user._id;
        const infoId = auth.user.info._id;
        const time = Moment();

        fetch('/api/social/newStory', {
            method: 'POST',
            body: JSON.stringify({userId: userId, infoId: infoId,story: story, time: time}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then((user) => {
            setStory('');
            auth.updateNewStory(auth.user, true);
        });
    };

    return (

        <Fragment>

            <form className={classes.form} onSubmit={handleStoryPost}>

                <TextField
                    InputProps={{classes:{underline: classes.underline}}}
                    InputLabelProps={{className: classes.label}}
                    multiline
                    fullWidth={false}
                    rowsMax="8"
                    label="Story"
                    helperText="Story here..."
                    name="setStory"
                    value={story}
                    onChange={handleInputChange}
                />

                <Fab type="submit" size="small" className={classes.postStory} color="primary"><Icon>create</Icon></Fab>
            
            </form>

        </Fragment>
    );
};

export default Story;