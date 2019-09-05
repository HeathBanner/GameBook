import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import {
    Snackbar,
    SnackbarContent,
    Typography,
    Icon,
    Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: green[600],
        paddingTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        paddingTop: 15,
        width: '100%',
    },
    icon: {
        position: 'absolute',
        top: 5,
        left: '50%',
    },
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}));

const SuccessNotification = (props) => {

    const classes = useStyles();

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={props.success.open}
            autoHideDuration={6000}
            onExit={props.toLogin}
        >
            <SnackbarContent
                className={classes.success}
                classes={{
                    message: classes.message,
                }}
                message={
                    <Typography
                        variant="body2"
                        align="center"
                    >
                        <Icon className={classes.icon}>
                            check
                        </Icon>
                        {props.success.message}
                    </Typography>
                }
                action={
                    <Button
                        className={classes.button}
                        onClick={props.closeSuccess}
                    >
                        <Icon>close</Icon>
                    </Button>
                }
            />
        </Snackbar>
    );
};

export default SuccessNotification;
