import React, { Fragment, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar, ListSubheader, IconButton, Icon, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        // height: 450,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
        margin: '0 auto',
    },
    subheader: {
        textAlign: 'center',
        margin: '20px 0px',
    },
    tile: {
        marginRight: '10px',
        marginBottom: '10px',
        padding: '0px 0px !important',
        width: '200px',
        height: '200px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    },
    img: {
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function Friends(props) {

    const classes = useStyles();

    const [friendList, setFriendList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if((!loaded) && (props.user)) {
            fetch('/api/social/getFriends', {
                method: 'POST',
                body: JSON.stringify({id: props.user._id}),
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then((result) => {
                setFriendList([...result])
                setLoaded(true);
            });
        };
    });

    function renderFriends() {
        
        if(loaded){
            return (
                friendList.map((friend, index) => {
                    return (
                        <GridListTile cols={1.5}  className={classes.tile} style={{backgroundImage: `url(${friend.info.skyline})`}} key={friend._id} >
                            <Link to={`/social/${friend.username}`} params={friend}>
                                <GridListTileBar 
                                    title={friend.username}
                                    actionIcon={
                                        <IconButton className={classes.icon}>
                                            <Icon>exit_to_app</Icon>
                                        </IconButton>
                                    }
                                />
                            </Link>
                        </GridListTile>
                    )
                })  
            );
        } else {
            return (
                <Typography variant="h3" align="center" color="textSecondary" >
                    Sorry, no photos {`¯|_(ツ)_/¯`}
                </Typography>
            );
        }
    }

    return (
        <div className="col-12">
                <GridList cellHeight={180} col={2.5} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                        <ListSubheader component="div">
                            <Typography variant="h4" className={classes.subheader}>Friends</Typography>
                        </ListSubheader>
                    </GridListTile>
                    {renderFriends()}
                </GridList>
        </div>
    );
}

export default Friends;