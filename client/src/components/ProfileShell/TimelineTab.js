import React, { Fragment } from 'react';

import { Grid } from '@material-ui/core';

import Timeline from './Timeline';
import Story from './Story';

const TimelineTab = (props) => {

    return (

        <Fragment>

            <Grid item xs={12}>

                <Story />
                <Timeline page={props.page} />

            </Grid>

        </Fragment>
    );  
};

export default TimelineTab;