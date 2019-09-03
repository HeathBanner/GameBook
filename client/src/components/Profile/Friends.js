import React, { Fragment, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar, ListSubheader, IconButton, Icon, Typography, Avatar } from '@material-ui/core';

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
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
        margin: '0 auto',
    },
    subheader: {
        textAlign: 'center',
        margin: '20px 0px',
    },
    tile: {
        marginRight: '10px',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    avatar: {
        width: 60,
        height: 60,
        margin: '0px 20px 0px 10px',
    }
}));

function Friends(props) {

    const classes = useStyles();

    const [loaded, setLoaded] = useState(false);
    const [friendList, setFriendList] = useState([])

    useEffect(() => {
        if((!loaded) && (props.user)) {
            console.log(props.user)
            fetch('/api/social/getFriends', {
                method: 'POST',
                body: JSON.stringify({id: props.user._id}),
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then((result) => {
                console.log(result)
                setFriendList([...result])
                setLoaded(true);
            });
        };
    })

    function renderFriends() {
        
        if(friendList.length > 1) {
            return (
                friendList.map((friend, index) => {
                    return (
                        <GridListTile cols={0.5} className={classes.tile} key={friend._id} >
                            <img src={friend.info.skyline} />
                            <GridListTileBar 
                                title={friend.username}
                                actionIcon={
                                    <Avatar src={friend.info.avatar} className={classes.avatar} />  
                                }
                                actionPosition="left"
                            />
                        </GridListTile>
                    )
                })  
            );
        } else {
            return (
                <GridListTile cols={1} className={classes.tile} >
                    <Typography variant="h4" align="center" color="textSecondary" >
                        Sorry, no friends to show {`¯|_(ツ)_/¯`}
                    </Typography>
                </GridListTile>
            );
        }
    }

    return (
        <div className="col-12">
                <GridList cellHeight={180} col={2.5} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                        <ListSubheader component="div">
                            <Typography variant="h3" color="textSecondary" className={classes.subheader}>Friends</Typography>
                        </ListSubheader>
                    </GridListTile>
                    {renderFriends()}
                </GridList>
        </div>
    );
}

export default Friends;