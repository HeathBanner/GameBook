import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Icon, IconButton, TextField, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

const useStyles = makeStyles({
    form: {
        margin: '20px auto',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
    },
    card: {
        maxWidth: 500,
        margin: '50px auto',
    },
    media: {
        height: 250,
        display: 'flex',
        alignItems: 'flex-end',
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
    cardContent: {
        position: 'relative',
        color: 'white',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '10px 0px !important',
        background: 'rgb(0, 0, 0, 0.5)',
        width: '100%'
    },
    avatar: {
        margin: 10,
        width: 120,
        height: 120,
        position: 'absolute',
        top: 0,
        left: 0
    },
    description: {
        textAlign: 'center'
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
    }
});


function NewFriends() {

    const classes = useStyles();

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        if(!loaded) {
            setLoaded(true);
            fetch('api/social/newFriends', {
                method: 'POST',
                body: JSON.stringify({username: 'Heath'}),
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then((user) => {
                console.log(user);
                setSearchResults(user);
            });    
        }
    })

    function handleInputChange(e) {
        const { value } = e.target;
        setSearchInput(value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(searchInput);
        fetch('api/social/newFriends', {
            method: 'POST',
            body: JSON.stringify({username: 'Heath'}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then((user) => {
            console.log(user);
            setSearchResults(user);
        });
    }

    function renderFriends() {

        return (
            searchResults.map((user, index) => {
                console.log(user.skyline)
                return (
                    <Card key={index} className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={user.info.skyline}
                                title={user.username}
                            >
                                <CardContent className={classes.cardContent}>
                                    <Avatar src={user.info.avatar} alt="Avatar" className={classes.avatar} />
                                    <div  className={classes.description}>
                                        <Typography variant="h4" component="h2">
                                            {user.username}
                                        </Typography>
                                        <Typography variant="h6" component="p">
                                            Front-End Developer
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardMedia>
                        </CardActionArea>
                        <CardActions className={classes.actions}>
                            <Button>
                                Add Friend
                                
                            </Button>
                            <Link to={`/social/${user.username}`} params={{user: user}}>
                                <Button>
                                    View Profile
                                </Button>
                            </Link>
                            
                        </CardActions>
                    </Card>
                );
            })
        )
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField 
                    variant="outlined" 
                    name="friendSearch" 
                    value={searchInput} 
                    label="Find Friends!" 
                    onChange={handleInputChange} 
                    InputProps={{className: classes.underline}}
                    InputLabelProps={{className: classes.label}}
                />
                <IconButton type="submit" size="medium">
                    <Icon fontSize="large">search</Icon>
                </IconButton>
            </form>
                {searchResults ? renderFriends() : ''}
        </Fragment>
    );
}

export default NewFriends;