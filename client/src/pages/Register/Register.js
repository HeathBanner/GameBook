import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import RegisterForm from '../../components/Register/RegisterForm';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        padding: '0px 30px',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        background: 'linear-gradient(0, rgba(12, 12, 12, 0.51) 0%, rgba(12, 12, 12, 0.51) 12.5%,rgba(25, 25, 25, 0.51) 12.5%, rgba(25, 25, 25, 0.51) 25%,rgba(39, 39, 39, 0.51) 25%, rgba(39, 39, 39, 0.51) 37.5%,rgba(52, 52, 52, 0.51) 37.5%, rgba(52, 52, 52, 0.51) 50%,rgba(66, 66, 66, 0.51) 50%, rgba(66, 66, 66, 0.51) 62.5%,rgba(79, 79, 79, 0.51) 62.5%, rgba(79, 79, 79, 0.51) 75%,rgba(93, 93, 93, 0.51) 75%, rgba(93, 93, 93, 0.51) 87.5%,rgba(106, 106, 106, 0.51) 87.5%, rgba(106, 106, 106, 0.51) 100%),linear-gradient(90deg, rgb(85, 101, 210) 0%, rgb(85, 101, 210) 12.5%,rgb(73, 116, 214) 12.5%, rgb(73, 116, 214) 25%,rgb(62, 131, 217) 25%, rgb(62, 131, 217) 37.5%,rgb(50, 146, 221) 37.5%, rgb(50, 146, 221) 50%,rgb(38, 162, 225) 50%, rgb(38, 162, 225) 62.5%,rgb(26, 177, 229) 62.5%, rgb(26, 177, 229) 75%,rgb(15, 192, 232) 75%, rgb(15, 192, 232) 87.5%,rgb(3, 207, 236) 87.5%, rgb(3, 207, 236) 100%)',
    },
}));

const Register = () => {

    const classes = useStyles();

    return (
        <Grid container>
            
            <Grid
                className={classes.container}
                xs={12}
                item
            >

                <RegisterForm />

            </Grid>

        </Grid>
    );
};

export default Register;
