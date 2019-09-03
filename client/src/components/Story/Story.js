import React, { Fragment, useContext, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

import Moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        color: 'black !important',
    },
    postStory: {
        marginLeft: '10px',
        backgroundColor: 'rgb(255, 145, 71)',
        '&:hover': {
            backgroundColor: 'rgb(129, 0, 206)',
        },
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
            color: 'rgb(255, 145, 71)',
        },
    },
}))

const Story = () => {
    
    const [story, setStory] = useState('');

    const classes = useStyles();
    const auth = useContext(AuthContext);

    const handleStoryPost = () => {
        const userId = auth.user._id;
        const infoId = auth.user.info._id;
        // const time = Moment();
        fetch('/api/social/newStory', {
            method: 'POST',
            body: JSON.stringify({ userId, infoId, story }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((user) => {
                console.log('New Story', user);
                auth.updateNewStory(auth.user, true);
            })
            .catch(() => { console.log('Oops...'); });
    }

    return (
        <Fragment>

            <TextField
                InputProps={{
                    classes: { underline: classes.underline },
                }}
                InputLabelProps={{ className: classes.label }}
                multiline
                rowsMax="5"
                label="Story"
                helperText="Story here..."
                name="setStory"
                value={story}
                onChange={(e) => setStory(e.target.value)}
            />

            <Fab
                className={classes.postStory}
                onClick={handleStoryPost}
                size="small"
            >
                <Icon>create</Icon>
            </Fab>
        
        </Fragment>
    );
};

export default Story;
