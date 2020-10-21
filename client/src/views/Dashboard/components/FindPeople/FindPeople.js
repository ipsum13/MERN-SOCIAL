import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../../../actions/profile";
import ProfileItem from "../ProfileItem";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";

import Typography from "@material-ui/core/Typography";


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

const FindPeople = ({ getProfiles, profile: { profiles, loading, user }, auth }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  const classes = useStyles();

 /*  const showProfiles = () => {
    return profiles.splice(profiles.findIndex(auth.user._id === user), 1)
  } */

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
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfiles })(FindPeople);
