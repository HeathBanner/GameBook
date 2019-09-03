import React, { Fragment } from 'react';

import Timeline from './Timeline';
import Story from './Story';

function TimelineTab(props) {

    return (
        <Fragment>
            <div className="col-3 colp">

            </div>
            <div className="col-9 colp">
                <Story />
                <Timeline page={props.page} />
            </div>
        </Fragment>
    );  
}

export default TimelineTab;