import React, { useContext, Fragment, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
// import Moment from 'react-moment';

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
        // backgroundColor: theme.palette.background.paper,
    },
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    collapse: {
        marginBottom: '20px',
        // backgroundColor: theme.palette.background.paper,
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid rgb(129, 0, 206) !important',
            },
        '&:after': {
            borderBottom: '2px solid rgb(255, 145, 71) !important',
        },
        '&:hover:before': {
            borderBottom: '2px solid rgb(129, 0, 206) !important',
        }
    },
    label: {
        '&.Mui-focused': {
            color: 'rgb(255, 145, 71)'
        }
    },
}));

function Timeline() {

    const classes = useStyles();
    const auth = useContext(AuthContext);

    const [openComment, setOpenComment] = useState(true);
    const [commentInput, setCommentInput] = useState('');

    const [storyIDs, setStoryIDs] = useState({});
    const [friendStories, setFriendStories] = useState(false);
    const [onLoad, setOnLoad] = useState(false);
    const [newStory, setNewStory] = useState(false);
    const [incomingComment, setIncomingComment] = useState(false);


    function getStories() {
        fetch('/api/social/friendStories', {
            method: 'POST',
            body: JSON.stringify({id: auth.user.info}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((result) => {
            var storyStorage = result;
            var storyIDList = {};
            auth.user.info.authored_stories.map((story, index) => {
                storyIDList[story._id] = false
                storyStorage.push(story);
            });
            storyStorage.sort((a, b) => {
                return new Date(a.time) - new Date(b.time);
            })
            setFriendStories(storyStorage);
            setStoryIDs(storyIDList)
        })
    }

    useEffect(() => {
        if((auth.isLoaded)&&(auth.newStory)) {
            getStories();
            auth.updateLoaded(auth.user, false);
            auth.updateNewStory(auth.user, false);
        }
        if((!onLoad) && (auth.user)){
            getStories();
            setOnLoad(true);
        }
        if(incomingComment) {
            
        }
    })

    function handleDelete(id) {
        console.log(id);
        fetch('/api/social/deleteStory', {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((user) => {
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
        console.log(id, commentInput);
        fetch('api/social/newComment', {
            method: 'POST',
            body: JSON.stringify({data}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((user) => {
            setCommentInput('');
            setIncomingComment(true);
            auth.updateDidMount()
        });
    };

    function renderStories() {
        if(friendStories) {
            return (
                friendStories.map((story, index) => {
                    return (
                        <Fragment key={story._id}>
                            <Paper>
                            <ListItem className={classes.listItem}>
                                <ListItemAvatar><Avatar alt={story._id} src="/imgs/avatar.jpg" /></ListItemAvatar>
                                <ListItemText 
                                    primary={story.text} 
                                    // secondary={
                                    //     // <Moment format={'dddd h:mm a'}>{story.time}</Moment>
                                    // }
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
                                        InputProps={{underline: classes.underline}}
                                        InputLabelProps={{className: classes.label}}
                                    />
                                    
                                    <IconButton type="submit">
                                        <Icon>add_circle</Icon>
                                    </IconButton>
                                </form>
                            </Collapse>
                            </Paper>
                        </Fragment>
                    );
                })
            );
        }
    };

    function renderComments(comments) {
        var commentList = [];
        if(comments){
            if(comments.length < 5){commentList = comments.slice(0, comments.length)}
            else{commentList = comments.slice(0, 5)}
            commentList.sort((a, b) => {
                return new Date(a.time) - new Date(b.time);
            })
            return (
                commentList.map((comment, index) => {
                    return (  
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${comment.authored_by.username}: ${comment.text}`}
                                // secondary={<Moment date={comment.time} format={'dddd h:mm a'} />} 
                            />
                        </ListItem>
                    );
                })
            );
        }
        
    };

    function expandComment(id) {
        const newCommentState = !storyIDs[id];
        setStoryIDs({...storyIDs, [id]: newCommentState});
    }

    return (
        <div>
            <List className={classes.root}>
                {auth.user ? renderStories() : ''}
            </List>
        </div>
    );
}

export default Timeline;