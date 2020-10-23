import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../../actions/profile";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const initialState = {
  name: "",
  email: "",
  location: "",
  bio: "",
  pronouns: "",
  education: "",
  birthDate: "",
  interests: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
 
  const [formData, setFormData] = useState(initialState);


  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.interests = profileData.interests.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

 const {
    name,
    email, 
    bio, 
    location,
    pronouns,
    education,
    interests,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData; 

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('Hello')
    createProfile(formData, history, profile ? true : false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <form className="form" onSubmit={onSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="bio"
              label="Bio"
              type="text"
              name="bio"
              value={bio}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="pronoun"
              label="Pronoun (s)"
              type="text"
              name="pronouns"
              value={pronouns}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              type="text"
              name="location"
              value={location}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="education"
              label="Education"
              type="text"
              name="education"
              value={education}
              onChange={onChange}
              fullWidth
            />
          <TextField
              autoFocus
              margin="dense"
              id="interests"
              label="Interests"
              type="text"
              name="interests"
              value={interests}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="twitter"
              label="Twitter"
              type="text"
              name="twitter"
              value={twitter}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="facebook"
              label="Facebook"
              type="text"
              name="facebook"
              value={facebook}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="linkedin"
              label="Linkedin"
              type="text"
              name="linkedin"
              value={linkedin}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="instagram"
              label="Instagram"
              type="text"
              name="instagram"
              value={instagram}
              onChange={onChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="youtube"
              label="Youtube"
              type="text"
              name="youtube"
              value={youtube}
              onChange={onChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
