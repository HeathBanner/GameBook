import React, { useState, useContext } from 'react';

import AuthContext from '../../context/AuthContext';

import Store from '../../context/Story';
import ChatContainer from '../../components/Social/Chat/ChatContainer';

function Chat() {

    const auth = useContext(AuthContext);

    return (
        <Store username={auth.user}>
            <ChatContainer />
        </Store>
    );
}

export default Chat;