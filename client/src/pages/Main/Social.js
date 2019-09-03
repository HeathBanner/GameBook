import React, { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { MediaContext } from '../../contexts/MediaContext';

import Drawer from '../../components/Nav/SocialDrawer';
import Friends from '../../components/Home/FriendSideBar';
import Story from '../../components/Story/Story';
import Timeline from '../../components/Story/Timeline';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Social = () => {

  const classes = useStyles();
  const auth = useContext(AuthContext);
  const media = useContext(MediaContext);

  return (
    <Grid container>

          <Grid item xs={12}>

              <Drawer />

          </Grid>

          {
            !media.xs
              ?
            <Grid item xs={4}>

                <Friends user={auth.user}/>
                
            </Grid>
              :
            ''
          }

          <Grid className={classes.contentContainer} item sm={8} xs={12}>

              <Story />
              
              <Timeline />

          </Grid>
    </Grid>
  );
};

export default Social;
