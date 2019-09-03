import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,    
    },
    header: {
        margin: '20px 0px',
        textAlign: 'center',
    },
    gridList: {
        width: 500,
        height: '100%',
        transform: 'translateZ(0)',
    },
    titleBar: {
        background: 
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
    sorry: {
        
    },
}))

function Photos(props) {

    const classes = useStyles();

    function renderPhotos() {

        if(props.info.gallery.length >= 1) {
            return (
                props.info.gallery.map((photo, index) => {
                    return (
                        <div className={classes.root}>
                            <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                                <GridListTile key={index}>
                                    <img src={photo.img} alt={photo.title} />
                                    <GridListTileBar 
                                        title={photo.title}
                                        titlePosition="top"
                                        actionIcon={
                                            <IconButton className={classes.icon}>
                                                <Icon>star_border</Icon>
                                            </IconButton>
                                        }
                                        actionPosition="left"
                                        className={classes.titleBar}
                                    />
                                </GridListTile>
                            </GridList>
                        </div>
                    );
                })
            );
        } else {
            return (
                <div className={classes.sorry}>
                    <Typography variant="h4" align="center" color="textSecondary" >
                        Sorry, no photos to show
                    </Typography>
                    <Typography variant="h4" align="center" color="textSecondary" >
                        {`¯|_(ツ)_/¯`}
                    </Typography>
                </div>
            );
        }
    }

    return (
        <div style={{margin: '0 auto'}}>

            <Typography variant="h3" color="textSecondary" className={classes.header}>
                Gallery
            </Typography>

            {renderPhotos()}

        </div>
    );
}

export default Photos;