import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";

import ViewIcon from "@material-ui/icons/Visibility";

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

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
  },
  profile
}) => {
  const classes = useStyles();

  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar className={classes.avatar}>
            <Avatar src={profile.profilePic ? profile.profilePic : avatar} />
          </ListItemAvatar>
          <ListItemText primary={name} />
          <ListItemSecondaryAction className={classes.follow}>
            <Link to={"/profile/" + _id}>
              <IconButton
                variant="contained"
                color="secondary"
                className={classes.viewButton}
              >
                <ViewIcon />
              </IconButton>
            </Link>
          
          </ListItemSecondaryAction>
        </ListItem>
        
      </List>
    </div>
  );
};

export default ProfileItem;
