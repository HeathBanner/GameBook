import React, { Fragment, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';


import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

import Moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        // marginTop: '40px',
        color: 'black !important',
        // width: '60% !important',
        // flexWrap: 'wrap',
        // flexDirection: 'column',
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
}))


function Story() {
    
    const [story, setStory] = React.useState('')

    const classes = useStyles();
    const auth = useContext(AuthContext)

    function handleInputChange(e) {
        const { value } = e.target
        setStory(value)
    }

    function handleStoryPost(e) {
        e.preventDefault();
        const userId = auth.user._id;
        const infoId = auth.user.info._id;
        const time = Moment();
        fetch('/api/social/newStory', {
            method: 'POST',
            body: JSON.stringify({userId: userId, infoId: infoId,story: story, time: time}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((user) => {
            setStory('');
            auth.updateDidMount()
        })
    }

    return (
        <Fragment>
            <form className={classes.form} onSubmit={handleStoryPost}>
                    <TextField
                        // className={classes.root}
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
                        // InputLabelProps={{className: classes.label}}
                        // inputProps={{className: classes.label}}
                    />
                    <Fab type="submit" size="small" className={classes.postStory} color="primary"><Icon>create</Icon></Fab>
            </form>
        </Fragment>
    );
}

export default Story;