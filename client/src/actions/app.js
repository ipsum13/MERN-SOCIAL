import axios from "axios";
// import { setAlert } from './alert';
import {
 SET_SETTINGS_LOADING,
 TOGGLE_POST_MODAL,
 TOGGLE_PROFILE_PICTURE_MODAL,
 TOGGLE_SETTINGS_MODAL,
 SET_PROFILE_PICTURE
} from "./types";

export const setSettingsLoad = (value) => {
	return dispatch => dispatch({
		type: SET_SETTINGS_LOADING,
		payload: {
			value
		}
	})
};

export const togglePostModal = () => {
	return dispatch => dispatch({
		type: TOGGLE_POST_MODAL
	});
}

export const toggleSettingsModal = () => {
	return dispatch => dispatch({
		type: TOGGLE_SETTINGS_MODAL
	});
}

export const toggleProfilePictureModal = () => {
	return dispatch => dispatch({
		type: TOGGLE_PROFILE_PICTURE_MODAL
	});
}

export const setProfilePic = url => {
	return dispatch => {
		cogoToast.success(`Profile picture updated!`, {
		    position: 'bottom-right'
		});
		dispatch({
			type: SET_PROFILE_PICTURE,
			payload: {
				url
			}
		});

		//dispatch(resetLastConnection());
	}
}