import React, {useState, useContext} from 'react';

import { CTX } from '../../../context/Story';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, Icon, TextField, Button, Paper, Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chatMenu: {
        position: 'fixed',
        bottom: '0',
        right: '0',
    },
    chatPaper: {        
        minHeight: 300,
        minWidth: 200,
        padding: '10px 10px',

    },
    chatInput: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        margin: '0px 10px',
    },
    chatContainer: {
        overflow: 'scroll'
    },
    chatList: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingInlineStart: '0px'
    },   
    listItem: {
        padding: '0px 0px 0px 0px'
    },
}))


function Chat() {
    const { chats, sendChatAction, user, channels } = useContext(CTX);
    const topics = Object.keys(chats);

    const [textValue, setTextValue] = useState('');
    const [activeTopic, setActiveTopic] = useState(topics[0]);

    const classes = useStyles();


    function handleChange(e) {
        const { value } = e.target;
        setTextValue(value);
    }

    function  renderChatLogs() {

            if(channels.length > 0) {
                if(channels.length == 2) {
                    console.log(chats.chats)
                    const chatLogger = chats.chats[channels[0]];
                    chatLogger.concat(chats.chats[channels[1]]);
                    console.log(chatLogger)
                    return (
                        chatLogger.map((chat, index) => {
                            return (
                                <ListItem key={index} className={classes.listItem}>
                                    <Chip 
                                        icon={<Icon>message</Icon>}
                                        label={`${chat.from}: ${chat.msg}`}
                                    />
                                </ListItem>
                            )
                        })
                    )
                }else {
                    return (
                        chats.chats[channels[0]].map((chat, index) => {
                            console.log('PASSSSS', chats.chats)
                            console.log(channels)
                            return (
                                <ListItem key={index} className={classes.listItem}>
                                    <Chip 
                                        icon={<Icon>message</Icon>}
                                        label={`${chat.from}: ${chat.msg}`}
                                    />
                                </ListItem>
                            )
                        })
                    )
                }
            } 
    }


    return (

        <Paper className={classes.chatPaper}>
        <Typography align="center">
            Chat
        </Typography>
        <List className={classes.chatContainer}>
            {console.log(channels)}
            {renderChatLogs()}
        </List>
        <div className={classes.chatInput}>
            <TextField 
                variant="outlined"
                value={textValue}
                onChange={handleChange}
            />
            <Button onClick={() => {sendChatAction({from: user, msg: textValue, to: user === 'HeathBanner' ? 'HeathLinen' : 'HeathBanner'}); setTextValue('');}}>Send</Button>
        </div>
    </Paper>
    ); 
}

export default Chat;