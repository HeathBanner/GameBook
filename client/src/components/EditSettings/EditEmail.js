import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Stepper, Step, StepLabel, Button, Typography, InputLabel, Input, FormControl, TextField } from '@material-ui/core';
import AuthContext from '../../../context/AuthContext';

const useStyles = makeStyles(theme => ({
    root: {
        width: '70%',
        padding: '20px',
        margin: '50px auto',
    },
    button: {
        display: 'block',
        margin: '0 auto',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        textAlign: 'center',
    },
    inputDiv: {
        display: 'flex',
        justifyContent: 'center',
    },
    fields: {
        margin: '10px 0px',
    },
    email: {
        width: '100%',
        margin: '10px 0px',
    },
    formDiv: {
        width: '100%',
    },
    form: {
        width: '100%',
        margin: '0 auto',
    },
    err: {
        color: 'red',
        textAlign: 'center',
    },
}));

function getSteps() {
    return ['Confirm Password', 'Change Email'];
}

    function getStepContent(step) {
        console.log(step)
        switch (step) {
            case 0:
                return 'Authentication';
            case 1: 
                return 'Enter your new email';
            default:
                return 'Unknown step...';
        }
    }

function EditEmail() {
    
    const [activeStep, setActiveStep] = React.useState(0);
    
    const [passwordAuth, setPasswordAuth] = React.useState(false);
    const [passwordInput, setPasswordInput] = React.useState('');
    const [confirmInput, setConfirmInput] = React.useState('');  
    const [passwordErr, setPasswordErr] = React.useState(null);  
    
    const [emailInput, setEmailInput] = React.useState('');

    const steps = getSteps();
    const classes = useStyles();
    const auth = useContext(AuthContext);

    function handlePassword(e) {
        e.preventDefault();
        const email = auth.user.email
        console.log(passwordInput, confirmInput);
        console.log(email)
        if(passwordInput === confirmInput) {
            fetch('/api/users/passwordCheck', {
                method: 'POST',
                body: JSON.stringify({email: email, password: passwordInput}),
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then((response) => {
                console.log(response);
                if(response === 'Match'){setPasswordAuth(true); setActiveStep(prevActiveStep => prevActiveStep + 1); setPasswordErr(null)}
                if(response === 'Not Authorized'){setPasswordErr(response)}
            })
        } 
        else {
            console.log('The passwords do not match!')
            setPasswordErr('The passwords do not match!')
        }
    }

    function handleEmail(e) {
        e.preventDefault();
        const username = auth.user.username;
        console.log(username)
        fetch('/api/users/emailChange', {
            method: 'POST',
            body: JSON.stringify({username: username, email: emailInput}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((response) => {
            console.log(response);
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        })
    }

    function handleInputChange(e) {
        const { name, value } = e.target
        console.log(name, value);
        if(name === 'password'){return setPasswordInput(value)}
        if(name === 'confirm'){return setConfirmInput(value)}
        if(name === 'email'){return setEmailInput(value)}
    }

    function renderForm() {
        if(!passwordAuth){
            return (
                <form className={classes.form} onSubmit={handlePassword}>
                    <TextField className={classes.fields} required label="Enter Password" onChange={handleInputChange} value={passwordInput} name="password" type="password" variant="outlined" /> 
                    <TextField className={classes.fields} required label="Confirm Password" onChange={handleInputChange} value={confirmInput} name="confirm" type="password" variant="outlined"  />
                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </form>
            );
        }
        if(passwordAuth){
            return (
                <form className={classes.form} onSubmit={handleEmail}>
                    <TextField className={classes.email} type="email" required label="Enter New Email" onChange={handleInputChange} value={emailInput} name="email" variant="outlined"  />
                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </form>
            );
        }
    }

    return (
        <Paper className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div className={classes.inputDiv}>
            {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Email has been successfully changed!
                        </Typography>
                    </div>
                ): (
                    <div className={classes.formDiv}>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>
                        <Typography className={classes.err}>
                            {passwordErr ? passwordErr : ''}
                        </Typography>

                        {renderForm()}
                    <div>
                    </div>
                    </div>
                )}
            </div>
        </Paper>
    );
}

export default EditEmail;