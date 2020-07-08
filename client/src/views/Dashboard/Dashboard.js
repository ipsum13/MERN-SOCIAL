import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  NewPost,
  FindPeople,
  PostList
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={7}
          sm={9}
          xl={7}
          xs={12}
        >
          <NewPost />
          <PostList />
        </Grid>

        <Grid
          item
          lg={5}
          sm={3}
          xl={5}
          xs={12}
        >
          <FindPeople />
        </Grid>
      {/*   <Grid
          item
          lg={7}
          sm={9}
          xl={7}
          xs={12}
        >
          <PostList />
        </Grid> */}
     
      </Grid>
    </div>
  );
};

export default Dashboard;
