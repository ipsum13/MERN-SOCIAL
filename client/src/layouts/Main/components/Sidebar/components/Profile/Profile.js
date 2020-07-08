import React, { useEffect } from 'react';
import { connect } from 'react-redux';
 import { getCurrentProfile } from '../../../../../../actions/profile';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = ({ auth: {user}, profile: {profile}, getCurrentProfile, className, ...rest}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile])

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        
        className={classes.avatar}
        component={RouterLink}
        src={profile && profile.profilePic}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
       {user && user.name}
      </Typography>
      {/* <Typography variant="body2">Software Engineer</Typography> */}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
