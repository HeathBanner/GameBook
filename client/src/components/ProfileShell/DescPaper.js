import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '20px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        [theme.breakpoints.down('lg')]: {
            width: '60%',
            margin: '10px auto',
            padding: '20px',
        },
        [theme.breakpoints.down('md')]: {
            width: '70%',
            margin: '10px auto',
            padding: '20px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            margin: '10px auto',
            padding: '20px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
            margin: '10px auto',
            padding: '20px',
        },
        width: '70%',
        margin: '10px auto',
        padding: '20px',
    },
    title: {
        marginBottom: 10
    },
    warning: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    body: {
        marginTop: 20,
    },
}));

const DescPaper = () => {
    
    const classes = useStyles();

    return (
        <Paper className={classes.description}>

            <Typography className={classes.title} variant="h3" align="center" color="textSecondary">
                Social Media Concept
            </Typography>

                <Divider />

            <Typography color="secondary" align="center" className={classes.warning}>
                ***Still under development***
            </Typography>

            <Typography className={classes.body}>
                The Database uses a similar method that Facebook has. Foreign Keys/References linking every type of information
                as if it were a spider's web. When one "strand" of the web is touched, it can be heard from another end of the web.
            </Typography>

            <Typography className={classes.body}>
                This concept uses MongoDB to store and use the information.
                Users, Stories and the rest of their information are stored within seperate collections containing references to one another.
                A private messaging feature will be implemented in the near future. It is very close to being finished.
            </Typography>

        </Paper>
    )
};

export default DescPaper;