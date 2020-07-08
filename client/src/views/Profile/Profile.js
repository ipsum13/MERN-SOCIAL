import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProfileById, follow, unfollow, toggleProfilePictureModal} from "../../actions/profile";

import { updateProfilePic } from "../../actions/profile";
import Spinner from "../../layouts/Spinner";

import ProfilePicModal from "./ProfilePicModal";

import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LinkedIn,
  LocationOn,
} from "@material-ui/icons";

import Divider from "@material-ui/core/Divider";
import { DeleteProfile } from "./components";

import { Link } from "react-router-dom";
import { FollowProfileButton } from "./components";
import { ProfileTabs } from "./components";


const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    fontSize: "1rem",
  }),
  title: {
    margin: `${theme.spacing(1)}px ${theme.spacing(3)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: "1.5em",
  },
  bigAvatar: {
    width: 100,
    height: 100,
    display: "block",
    marginLeft: "10vw",
  },
}));

const Profile = ({
  getProfileById,
  toggleProfilePictureModal,
  profile: { profile, profilePicModal },
  auth,
  follow,
  unfollow,
  post: { posts, loading },
}) => {

 
  const [values, setValues] = useState({
    following: false,
  });
  let match = profile && 
    ( profile.followers.length > 0 && profile.followers.some((follower) => {
     return follower.user === auth.user._id;
   }));
   
  useEffect(() => {
    
   setValues({...values, following: match })
  }, [values.following = match, match])

  var path = window.location.pathname;
  var id = path.substr(path.lastIndexOf("/") + 1);
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  const clickFollowButton = () => {
    follow(
      profile.user,
      profile.name,
      profile.profilePic,
      auth.user.name,
      auth.user.avatar
    ); 
    setTimeout(() => {
      getProfileById(id);
    }, 1000)
  };

  const clickUnfollowButton = () => {
    unfollow(profile.user);  
    setTimeout(() => {
      getProfileById(id);
    }, 1500)
  };

  const classes = useStyles();
  const openProfilePictureModal = () => {
			toggleProfilePictureModal();	
	}
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      {profile === null ? (
        <Spinner />
      ) : (
        <div>
        
        <List dense style={{ marginBottom: "20px" }}>
        {(profilePicModal.isVisible && (profile && auth.user._id === profile.user)) && <ProfilePicModal />}
          <ListItem onClick={openProfilePictureModal}>
            <ListItemAvatar>
              {profile && <Avatar src={profile.profilePic} className={classes.bigAvatar} />}
            </ListItemAvatar>
         
          </ListItem>
          <ListItem>
            <ListItemText primary={profile && (profile.name === null ? auth.user.name : profile.name)} />
            {profile && (auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user) ? (
              <ListItemSecondaryAction>
                <Link to={`/profile/edit/${profile.user}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteProfile userId={profile.user._id} />
              </ListItemSecondaryAction>
            ) : (
              <FollowProfileButton
                following={values.following}
                onFollowClick={clickFollowButton}
                onUnfollowClick={clickUnfollowButton}
              />
            )}
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Facebook fontSize="large" style={{ color: "#3b5998" }} />
              <Instagram fontSize="large" style={{ color: "#3f729b" }} />
              <YouTube fontSize="large" style={{ color: "#c4302b" }} />
              <Twitter fontSize="large" style={{ color: "#00acee" }} />
              <LinkedIn fontSize="large" style={{ color: "#0e76a8" }} />
            </ListItemAvatar>
          </ListItem>
          <Divider />
          <ListItem style={{ marginTop: "20px" }}>
            <ListItemText primary={profile && profile.bio} />
          </ListItem>

          <ListItem style={{ marginTop: "10px" }}>
            <ListItemText primary={profile && profile.interests} />
          </ListItem>
          <ListItem style={{ marginTop: "10px" }}>
            <ListItemText
              primary={profile && (
                "Birth Day: " + new Date(profile.birthDate).toDateString())
              }
            />
            <span>
              <ListItemText primary={profile && profile.pronouns} />
            </span>
          </ListItem>
          <ListItem style={{ marginTop: "15px" }}>
            <LocationOn />

            <ListItemText primary={profile && profile.location} />
            <span>
              <ListItemText
                primary={profile && ("Joined: " + new Date(profile.date).toDateString())}
              />
            </span>
          </ListItem>
        </List>
        </div>
      )}
      <ProfileTabs />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
  auth: state.auth,
});


export default connect(mapStateToProps, { getProfileById, updateProfilePic, follow, unfollow, toggleProfilePictureModal })(
  Profile
);
