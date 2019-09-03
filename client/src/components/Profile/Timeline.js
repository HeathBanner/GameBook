import React, { useContext, Fragment, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Collapse, List, ListItem, ListItemText, ListItemAvatar, Divider, Typography, Avatar, Icon, IconButton} from '@material-ui/core';

import GetMoment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: '10px',
        paddingBottom: '10px',
        width: '80%',
        margin: '0 auto'
    },
    listItem: {
        marginTop: '20px',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    Collapse: {
        marginBottom: '20px',
    },
}));

function Timeline(props) {

    const classes = useStyles();
    const auth = useContext(AuthContext);

    const [openComment, setOpenComment] = useState(true);
    const [commentInput, setCommentInput] = useState('');

    const [storyIDs, setStoryIDs] = useState({});
    const [onLoad, setOnLoad] = useState(false);

    if((!onLoad) && (auth.user)){
        console.log('RESET')
        var storyIDList = {};
        auth.user.info.authored_stories.map((story, index) => {
            storyIDList[story._id] = false
        })
        setStoryIDs(storyIDList)
        setOnLoad(true);
    }   

    function handleDelete(id) {
        console.log(id);
        fetch('/api/social/deleteStory', {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((user) => {
            console.log(user);
            // auth.updateAuth(user);
        })
    }

    function handleCommentInput(e) {
        const { name, value } = e.target;
        setCommentInput(value);
    }

    function handleCommentSubmit(e, id) {
        e.preventDefault();
        const time = GetMoment();
        const data = {
            time: time,
            id: id,
            userId: auth.user._id,
            comment: commentInput,
        };
        console.log(data);
        fetch('/api/social/newComment', {
            method: 'POST',
            body: JSON.stringify({data}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((user) => {
            setCommentInput('');
            auth.updateDidMount()
        });
    };

    function renderTimeline() {
        console.log(auth.user)
        if((auth.user)&&(auth.user.username === props.page.handle)){
            return (
                auth.user.info.authored_stories.map((story, index) => (
                    <Fragment key={story._id}>
                    <Paper>
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar><Avatar alt={story._id} src="/imgs/avatar.jpg" /></ListItemAvatar>
                            <ListItemText 
                                primary={`${story.authored_by.username}: ${story.text}`} 
                                secondary={
                                    <Moment date={story.time} format={'dddd h:mm a'} />
                                }
                            >
                            </ListItemText>
                            <IconButton onClick={() => expandComment(story._id)}>
                                <Icon>{storyIDs ? storyIDs[story._id] ? 'expand_less' : 'expand_more' : false}</Icon>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(story._id)}>
                                <Icon>delete_outline</Icon>
                            </IconButton>
                        </ListItem>
                        <Collapse className={classes.collapse} in={storyIDs ? storyIDs[story._id] : false} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                {renderComments(story.comments)}
                            </List>
                            <form className={classes.form} onSubmit={(e) => handleCommentSubmit(e, story._id)}>
                                <TextField
                                    name='123'
                                    value={commentInput}
                                    variant="outlined"
                                    label="Add a comment"
                                    onChange={handleCommentInput}
                                >
                                </TextField>
                                    <IconButton type="submit">
                                        <Icon>add_circle</Icon>
                                    </IconButton>
                            </form>
                        </Collapse>
                        </Paper>
                    </Fragment>
                ))
            );
        }else {return ''}
    }

    function renderComments(comments) {
        var commentList = [];
        if(comments.length < 5){commentList = comments.slice(0, comments.length)}
        else{commentList = comments.slice(0, 5)}
        
        return (
            commentList.map((comment, index) => {
                return (  
                    <Fragment>
                        <Divider />
                        <ListItem key={index}>
                            <ListItemText primary={`${comment.authored_by.username}: ${comment.text}`} secondary={<Moment date={comment.time} format={'dddd h:mm a'} />} />
                        </ListItem>
                    </Fragment>
                );
            })
        );
    };

    function expandComment(id) {
        const newCommentState = !storyIDs[id];
        console.log(newCommentState)
        setStoryIDs({...storyIDs, [id]: newCommentState});
    }

    return (
        <div>
            <List className={classes.root}>
                {renderTimeline()}
            </List>
        </div>
    );
}

export default Timeline;