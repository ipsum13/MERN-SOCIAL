import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../../../actions/profile";
import ProfileItem from "../ProfileItem";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemText from "@material-ui/core/ListItemText";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import { Link } from "react-router-dom";
// import {findPeople, follow} from './api-user.js'
// import auth from './../auth/auth-helper'
// import Snackbar from "@material-ui/core/Snackbar";
// import ViewIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: 0,
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  snack: {
    color: theme.palette.protectedTitle,
  },
  viewButton: {
    verticalAlign: "middle",
  },
}));

const FindPeople = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Who to follow
        </Typography>
        <List>
          {profiles.length > 0 ? (
            profiles.map((profile, i) => {
              return (
                <span key={i}>
                  <ProfileItem key={profile._id} profile={profile} />
                </span>
              );
            })
          ): <h4>Loading...</h4>}
        </List>
      </Paper>
      {/* <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={values.open}
          onClose={handleRequestClose}
          autoHideDuration={6000}
          message={<span className={classes.snack}>{values.followMessage}</span>}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(FindPeople);
