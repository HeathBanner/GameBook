import React, { useContext, Fragment, useState, useEffect } from 'react';

import AuthContext from '../../../context/AuthContext';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Collapse, List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, Icon, IconButton, CircularProgress} from '@material-ui/core';

import Moment from 'react-moment';
import GetMoment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
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

const Timeline = () => {

    const auth = useContext(AuthContext);
    const classes = useStyles();

    const [commentInput, setCommentInput] = useState('');
    const [newComment, setNewComment] = useState({open: false, storyId: ''});

    const [storyIDs, setStoryIDs] = useState({});
    const [stories, setStories] = useState('');
    const [onLoad, setOnLoad] = useState(false);
    const [sorted, setSorted] = useState(false);


    useEffect(() => {
        
        if( (auth.isLoaded) && (auth.newStory) ) {

            auth.updateLoaded(auth.user, false, false);
            getStories();
            setSorted(false)
        }

        if( (!onLoad) && (auth.user) ) {

            setOnLoad(true)

            let storyStorage = [];
            let storyIDList = {};
            
            auth.user.info.authored_stories.map((story) => {
                storyIDList[story._id] = false
                storyStorage.push(story);
            });

            storyStorage.sort((a, b) => {
                return new Date(b.time) - new Date(a.time);
            });

            setStoryIDs(storyIDList);
            setSorted(true);
            setStories(storyStorage);
        }   

        if(newComment.open) {

            setNewComment({open: false, storyId: ''});
            
            let storyStorage = [];
            let storyIDList = {};
            
            stories.map((story) => {
                
                if(story._id === newComment.storyId){
                    storyStorage.push(story); 
                    storyIDList[story._id] = true
                } 
                else {
                    storyIDList[story._id] = false
                    storyStorage.push(story); 
                }
                
            });

            storyStorage.sort((a, b) => {
                return new Date(b.time) - new Date(a.time);
            });

            setStoryIDs(storyIDList);
            setSorted(true)
            setStories(storyStorage);
        }
    });

    const getStories = () => {

        fetch('/api/social/friendStories', {
            method: 'POST',
            body: JSON.stringify({id: auth.user.info}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then((result) => {
            
            let storyStorage = result;
            let storyIDList = {};
            
            auth.user.info.authored_stories.map((story, index) => {
                storyIDList[story._id] = false
                storyStorage.push(story);
            });
            
            storyStorage.sort((a, b) => {
                return new Date(b.time) - new Date(a.time);
            })

            setStories(storyStorage);
            setSorted(true);
            setStoryIDs(storyIDList);
        });
    };
    
    const handleDelete = (id) => {

        fetch('/api/social/deleteStory', {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(() => {});
    };

    const handleCommentInput = (e) => {
        const { value } = e.target;
        setCommentInput(value);
    };

    const handleCommentSubmit = (id, username) => {

        const time = GetMoment(); 
        const data = {
            time: time,
            id: id,
            userId: auth.user._id,
            comment: commentInput,
        };

        let newStories = stories;

        newStories.map((item, index) => {
            
            if(item._id === id) {
                newStories[index].comments.push({
                    authored_by: {info: '5d126d136f6f1085c8df8b81', username: username},
                    text: commentInput,
                    type: 'comment',
                    time: time
                });
            }
        });

        setStories(newStories);
        setNewComment({open: true, storyId: id});

        fetch('/api/social/newComment', {
            method: 'POST',
            body: JSON.stringify({data}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(() => {
            setCommentInput('');
        });
    };

    const renderTimeline = () => {

        if( (sorted) && (!auth.newStory) ){

            return (

                stories.map((story, index) => (

                    <Paper key={story._id}>

                        <ListItem className={classes.listItem}>

                            <ListItemAvatar>
                                <Avatar alt={story._id} src={`./imgs/me.png`} />
                            </ListItemAvatar>

                            <ListItemText 
                                primary={`${story.authored_by.username}: ${story.text}`} 
                                secondary={<Moment date={story.time} format={'dddd h:mm a'} />}
                            />
                            
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

                            <div className={classes.form}>

                                <TextField
                                    name='123'
                                    value={commentInput}
                                    variant="outlined"
                                    label="Add a comment"
                                    onChange={handleCommentInput}
                                />

                                <IconButton onClick={() => handleCommentSubmit(story._id, story.authored_by.username)}>
                                    <Icon>add_circle</Icon>
                                </IconButton>

                            </div>

                        </Collapse>

                    </Paper>
                ))
            );          
        } 
        else { return <CircularProgress size={100} color="secondary" thickness={2.6} style={{display: 'block', margin: '40px auto 0px auto'}}  /> }
    };

    const renderComments = (comments) => {

        let commentList = [];

        if(comments.length < 5) { commentList = comments.slice(0, comments.length) }
        else { commentList = comments.slice(0, 5) }
        
        return (

            commentList.map((comment, index) => {

                return (  

                    <Fragment key={comment.time}>

                        <Divider />

                        <ListItem key={index}>
                            <ListItemText primary={`${comment.authored_by.username}: ${comment.text}`} secondary={<Moment date={comment.time} format={'dddd h:mm a'} />} />
                        </ListItem>

                    </Fragment>
                );
            })
        );
    };

    const expandComment = (id) => {

        const newCommentState = !storyIDs[id];
        setStoryIDs({...storyIDs, [id]: newCommentState});
    };

    return (

        <List className={classes.root}>
            {renderTimeline()}
        </List>
    );
};

export default Timeline;