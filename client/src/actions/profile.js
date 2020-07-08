import axios from "axios";
import cogoToast from "cogo-toast";
// import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  NO_REPOS,
  UPDATE_FOLLOWING,
  UPDATE_PROFILE_PIC,
  UPLOAD_ERROR,
  TOGGLE_PROFILE_PICTURE_MODAL,
  GET_PROFILE_PICTURE,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Follow Profile
export const follow = (
  id,
  name,
  avatar,
  followerName,
  followerAvatar
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, avatar, followerName, followerAvatar });
    const res = await axios.put(`/api/profile/follow/${id}`, body, config);
    cogoToast.success(`You followed ${name}`, {
      position: "top-right",
    });
    dispatch({
      type: UPDATE_FOLLOWING,
      payload: {
        id,
        following: res.data.following,
        followers: res.data.follower,
      },
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Unfollow Profile
export const unfollow = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/unfollow/${id}`);
    
    dispatch({
      type: UPDATE_FOLLOWING,
      payload: { id, following: res.data },
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    cogoToast.success('Profile updated.', {
      position: "bottom-right",
    });
  
    // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    //const errors = err.response;

    /* if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } */

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatch(setAlert('Experience Added', 'success'));

    history.push("/dashboard");
  } catch (err) {
    //const errors = err.response;

    /*   if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } */

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatch(setAlert('Education Added', 'success'));

    history.push("/dashboard");
  } catch (err) {
    //const errors = err.response.data.errors;

    /*   if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } */

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    //dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      //dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const updateProfilePic = formData => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = axios.post(
      "/api/profile/upload/profilePic",
      formData,
      config
    );
    cogoToast.success('Profile picture updated.', {
      position: "top-right",
    });
   return dispatch => dispatch({
      type: UPDATE_PROFILE_PIC,
      payload: res.data,
    });
  } catch (err) {
    return dispatch => dispatch ({
      type: UPLOAD_ERROR,
      payload: err.response,
    });
  }
  //history.push("/");
};

export const getProfilePicture = (id) => async dispatch => {
  try {
    const res = await axios.get('/api/profile/getProfilePicture')

    dispatch({
      type: GET_PROFILE_PICTURE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
}

export const toggleProfilePictureModal = () => {
	return dispatch => dispatch({
		type: TOGGLE_PROFILE_PICTURE_MODAL
	});
}

