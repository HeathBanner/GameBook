import React, { useEffect, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, GridList, GridListTile, GridListTileBar, ListSubheader, Typography, Avatar, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
    },
    listContainer: {},
    gridList: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        margin: '0px auto 40px auto !important',
    },
    subheader: {
        textAlign: 'center',
        margin: '20px 0px',
    },
    tile: {
        [theme.breakpoints.down('xs')]: {
            width: 400,
        },
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

const Friends = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    const gridHeight = () => {
        if(xs) {return 120}
        if(sm) {return 160}
        if(md) {return 300}
        if(mdUp) {return 300}
    }

    const gridCols = () => {
        if(xs) {return 1}
        if(sm) {return 1}
        if(md) {return 0.7}
        if(mdUp) {return 0.7}
    }

    const [loaded, setLoaded] = useState(false);
    const [friendList, setFriendList] = useState([])

    useEffect(() => {

        if( (!loaded) && (props.user) ) {
            
            fetch('/api/social/getFriends', {
                method: 'POST',
                body: JSON.stringify({id: props.user._id}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then((result) => {
                setFriendList([...result])
                setLoaded(true);
            });
        };
    });

    const renderFriends = () => {
        
        if(friendList.length > 1) {

            return (

                friendList.map((friend) => {

                    return (

                        <GridListTile cols={gridCols()}  className={classes.tile} key={friend._id} >
                            
                            <img src={friend.info.skyline} alt="skyline" />
                            
                            <GridListTileBar 
                                title={friend.username}
                                actionIcon={
                                    <Avatar src={friend.info.avatar} className={classes.avatar} />  
                                }
                                actionPosition="left"
                            />

                        </GridListTile>
                    );
                })  
            );
        } 
        else if(!loaded) {

            return (

                <GridListTile cols={1} className={classes.tile} >
                    <LinearProgress />
                </GridListTile>
            );
        }    
        else {

            return (

                <GridListTile cols={1} className={classes.tile}>

                    <Typography variant="h4" align="center" color="textSecondary" >
                        Sorry, no friends to show {`¯|_(ツ)_/¯`}
                    </Typography>

                </GridListTile>
            );
        }
    };

    return (
        <Grid item className={classes.listContainer} xs={12}>

            <GridList cellHeight={gridHeight()} spacing={18} col={2.5} className={classes.gridList}>
                
                <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                    
                    <ListSubheader component="div">

                        <Typography variant="h3" color="textSecondary" className={classes.subheader}>Friends</Typography>
                    
                    </ListSubheader>

                </GridListTile>

                {renderFriends()}

            </GridList>

        </Grid>
    );
};

export default (Friends);