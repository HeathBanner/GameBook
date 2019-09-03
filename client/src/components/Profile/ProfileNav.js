import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const tabIndex = ['Timeline', 'About', 'Friends', 'Photos'];

function ProfileNav(props) {

    const [value, setValue] = React.useState(0);

    const classes = useStyles();

    function handleChange(event, newValue) {
        setValue(newValue);
        const newTab = tabIndex[newValue];
        console.log(newTab);
        props.tabChange.onChange(newTab);
    }

    return (
        <Fragment>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Timeline" />
                    <Tab label="About" />
                    <Tab label="Friends" />
                    <Tab label="Photos" />
                </Tabs>
            </Paper>
        </Fragment>
    );
}

export default ProfileNav;