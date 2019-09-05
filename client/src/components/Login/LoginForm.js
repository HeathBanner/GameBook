import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    Typography,
    Paper,
} from '@material-ui/core';

import { AuthContext } from '../../contexts/AuthContext';

import SuccessNotification from '../Notifications/SuccessNotification';
import ErrorNotification from '../Notifications/ErrorNotification';
import WarningNotification from '../Notifications/WarningNotification';

const initInfo = {
    email: '',
    password: '',
};

const initNotifications = {
    open: false,
    message: '',
};

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    inputs: {
        width: '100%',
        marginTop: 20,
    },
    button: {
        width: '100%',
        marginTop: 20,
        padding: 15,
        background: 'rgb(0, 0, 0, 0.1)',
        transition: 'all 0.4s ease',
        '&:hover': {
            background: 'rgb(0, 0, 0, 0.3)',
            transform: 'scale(1.03)',
        },
    },
    signup: {
        width: '100%',
        marginTop: 20,
        padding: 15,
        background: 'rgb(3, 145, 126, 0.1)',
        transition: 'all 0.4s ease',
        '&:hover': {
            background: 'rgb(0, 0, 0, 0.3)',
            transform: 'scale(1.03)',
        },
    },
}));

const LoginForm = () => {

    const auth = useContext(AuthContext);
    const classes = useStyles();

    const [info, setInfo] = useState({ ...initInfo });
    const [success, setSuccess] = useState({ ...initNotifications });
    const [error, setError] = useState({ ...initNotifications });
    const [warning, setWarning] = useState({ ...initNotifications });
    const [toLogin, setToLogin] = useState(false);

    const closeError = () => { setError({ ...initNotifications }); };
    const closeSuccess = () => { setSuccess({ ...initNotifications }); };
    const closeWarning = () => { setWarning({ ...initNotifications }); };

    const preSubmit = () => {
        switch (true) {
            case info.email.length < 2:
                return setWarning({
                    open: true,
                    message: 'Incorrect email!',
                });
            case info.password.length < 6:
                return setWarning({
                    open: true,
                    message: 'Incorrect password!',
                });
            default:
                return handleSubmit();
        }
    };

    const handleSubmit = () => {
        const { email, password } = info;
        fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then((result) => {
                if (result.error) {
                    return setError({ open: true, message: result.message });
                }
                auth.handleLogin(result.user, result.token);
                setInfo({ ...initInfo });
                setSuccess({
                    open: true,
                    message: 'Login Successful!',
                });
            })
            .catch(() => { setError({ open: true, message: 'Something went wrong!' }); });
        };

    const handleRedirect = () => { setToLogin(true); };

    if (toLogin) { return <Redirect to="/" />; }
    return (
        <Paper className={classes.paper}>

            <Typography variant="h4">
                Login
            </Typography>

            <TextField
                className={classes.inputs}
                type="email"
                variant="outlined"
                label="Email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value})}
            />

            <TextField
                className={classes.inputs}
                type="password"
                variant="outlined"
                label="Password"
                value={info.password}
                onChange={(e) => setInfo({ ...info, password: e.target.value})}
            />

            <Button
                className={classes.button}
                onClick={preSubmit}
            >
                <Typography>
                    Submit
                </Typography>
            </Button>

            <Button
                className={classes.signup}
            >
                <Link
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                    to="/register"
                >
                    <Typography>
                        Sign Up
                    </Typography>
                </Link>
            </Button>

            <SuccessNotification
                success={success}
                closeSuccess={closeSuccess}
                toLogin={handleRedirect}
            />
            <ErrorNotification
                error={error}
                closeError={closeError}
            />
            <WarningNotification
                warning={warning}
                closeWarning={closeWarning}
            />

        </Paper>
    );
};

export default LoginForm;
