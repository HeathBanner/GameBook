import React from 'react';
import RegisterForm from '../../components/Register/RegisterForm';

import IMG from './imgs/luke-chesser.png';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        padding: '0px 0px !important',
        backgroundImage: `url(${IMG})`,
        // background: 'green',
        zIndex: 5,
    },
}))


function Register() {

    const classes = useStyles();

    return (
        <div className="container-fluid colp">
            <div className="row colp marg">
                <div className="col-12 colp marg">
                    <div  className={classes.root} >
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;