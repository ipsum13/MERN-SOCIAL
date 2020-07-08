import {
  TOGGLE_POST_MODAL,
  TOGGLE_PROFILE_PICTURE_MODAL,
  SET_PROFILE_PICTURE,
  TOGGLE_SETTINGS_MODAL,
  SET_SETTINGS_LOADING,
} from "../actions/app";

const initialState = {
  profilePicModal: {
    isVisible: false,
  },
  postModal: {
    isVisible: false,
  },
  settingsModal: {
    isVisible: false,
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_MODAL:
      return {
        ...state,
        settingsModal: {
          ...state.settingsModal,
          isVisible: !state.settingsModal.isVisible,
        },
      };
    case TOGGLE_POST_MODAL:
      return {
        ...state,
        postModal: {
          isVisible: !state.postModal.isVisible,
        },
      };
    case TOGGLE_PROFILE_PICTURE_MODAL:
      return {
        ...state,
        profilePicModal: {
          isVisible: !state.profilePicModal.isVisible,
        },
      };

    case SET_SETTINGS_LOADING:
      return {
        ...state,
        settingsModal: {
          ...state.settingsModal,
          loading: action.payload.value,
        },
      };
    case SET_PROFILE_PICTURE:
      return {
        ...state,
        logged: {
          ...state.logged,
          profilePic: action.payload.url,
        },
      };

    default:
      return state;
  }
};
