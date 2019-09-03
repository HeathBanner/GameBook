import React, { Fragment } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper, 
    },
    header: {
        margin: '20px 0px',
        textAlign: 'center',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '80%',
        margin: '0 auto !important',
    },
    tile: {
        width: 800
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
}));

const Photos = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    const gridHeight = () => {
        if(xs) {return 120}
        if(sm) {return 240}
        if(md) {return 300}
        if(mdUp) {return 300}
    }

    const gridCols = () => {
        if(xs) {return 2}
        if(sm) {return 2}
        if(md) {return 2}
        if(mdUp) {return 2}
    }

    const renderPhotos = () => {

        if(props.info.gallery.length >= 1) {

            return (

                props.info.gallery.map((photo, index) => {

                    return (
                        <GridListTile cols={1} key={index} className={classes.tile}>
                            
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
                    );
                })
            );
        } 
        else {
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
    };

    return (
        <Fragment>

            <Grid item xs={12}>

                <Typography variant="h3" color="textSecondary" className={classes.header}>
                    Gallery
                </Typography>

            </Grid>

            <Grid item xs={12}>

                <GridList cols={gridCols()} cellHeight={gridHeight()} spacing={12} className={classes.gridList}>
                    
                    {renderPhotos()}
                
                </GridList>

            </Grid>

        </Fragment>
    );
};

export default Photos;