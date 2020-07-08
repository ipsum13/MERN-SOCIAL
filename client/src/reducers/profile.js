import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
  UPDATE_FOLLOWING,
  UPDATE_PROFILE_PIC,
  UPLOAD_ERROR,
  TOGGLE_PROFILE_PICTURE_MODAL,
  GET_PROFILE_PICTURE,
  
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  following: [],
  follower: [],
  repos: [],
  loading: true,
  error: {},
  profilePicModal: {
    isVisible: false,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
      case TOGGLE_PROFILE_PICTURE_MODAL:
        return {
          ...state,
          profilePicModal: {
            isVisible: !state.profilePicModal.isVisible,
          },
        };
      case UPDATE_PROFILE_PIC:
			return {
				...state,
        profile: payload,
        loading: false,
      }
      case GET_PROFILE_PICTURE:
			return {
				...state,
        profilePictureURL: payload,
        loading: false,
			}
    case UPDATE_FOLLOWING:
      return {
        ...state,
        profile: {...state.profile },
        loading: false,
      };
  
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case UPLOAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case NO_REPOS:
      return {
        ...state,
        repos: [],
      };
    default:
      return state;
  }
}
