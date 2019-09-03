import React from 'react';

import Drawer from '../../components/Navigation/SocialDrawer';
import NewFriends from '../../components/Social/NewFriends/NewFriends';

function FindFriends() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <Drawer />
                </div>
            </div>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <NewFriends />
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
}

export default FindFriends;
