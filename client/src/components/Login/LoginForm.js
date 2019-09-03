import React, { Fragment, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { InputLabel, Input } from '@material-ui/core';

import AuthContext from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '40px',
        color: 'black !important',
        width: '60% !important',
    },
    label: {
        color: 'white !important',
    },
    hidden: {
        transform: 'translate(0, 1.5px) scale(0.75) !important',
        transformOrigin: 'top left !important',
        color: 'white !important',
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid rgb(0, 0, 0) !important',
            },
        '&:after': {
            borderBottom: '2px solid rgb(129, 0, 206) !important',
        },
        '&:hover:before': {
            borderBottom: '2px solid rgb(0, 0, 0) !important',
        }
    },
    input: {
        backgroundColor: 'transparent !important',
    },
    postStory: {
        display: 'block',
        margin: '20px auto',
        padding: '5px 10px',
        background: 'rgb(129, 0, 206)'
    },
    form: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        width: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgb(0, 0, 0, 0.08)',
        padding: '20px',
    },
}))


function LoginForm() {

    const [email, setEmail] = React.useState('');
    const [emailFocus, setEmailFocus] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [success, setSuccess] = React.useState(false);


    const context = useContext(AuthContext);

    const classes = useStyles();

    function handleInputChange(e) {
        const { name, value } = e.target;
        if(name === 'email'){return setEmail(value)}
        if(name === 'password'){return setPassword(value)}
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(context)
        fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(({ user, token }) => {
            console.log(user, token);
            console.log(context)
            context.onLogin(user, token);
            console.log('past login')
            setSuccess(true);
        });
    }

    if(success){return <Redirect to={'/social'} />}

    return (
        <Fragment>
            <form className={classes.form} onSubmit={handleOnSubmit}>
                <FormControl className={classes.root}>
                    <InputLabel className={email ? classes.hidden : classes.label}>Email</InputLabel>
                    <Input 
                        classes={{underline: classes.underline}}
                        name='email'
                        value={email}
                        type="email"
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl className={classes.root}>
                    <InputLabel className={password ? classes.hidden : classes.label}>Password</InputLabel>
                    <Input 
                        classes={{underline: classes.underline}}
                        variant="outlined"
                        name='password'
                        value={password}
                        type="password"
                        onChange={handleInputChange}
                    />
                </FormControl>
                <Fab 
                    size="small" 
                    variant="extended"
                    color="primary"
                    className={classes.postStory} 
                    type="submit"
                >Login</Fab>
            </form>
        </Fragment>
    );
}

export default LoginForm;