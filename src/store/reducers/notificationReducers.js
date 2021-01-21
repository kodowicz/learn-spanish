import * as types from "../../constants/actionTypes";

const initState = "";

export const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_ERROR:
    case types.SIGNUP_ERROR:
    case types.LOGOUT_ERROR:
    case types.CREATE_LEARN_SET_ERROR:
    case types.CREATE_PLAY_SET_ERROR:

      return action.error.message;

    case types.INVALID_DATA:
      return action.message;

    case types.CLEAN_NOTIFICATION:
      return "";

    case types.LOGOUT_SUCCESS:
      return "logout";

    case types.CHANGE_PASSWORD:
      return "The password has been changed";

    case types.CHANGE_PASSWORD_ERROR:
      return "The password is invalid";

    case types.CREATE_EDIT_SET_ERROR:
      return "Failed loading the set. Please try again";

    case types.DELETE_EDIT_CHANGES:
      return "Deleted changes";

    case types.DELETE_EDIT_SET:
      return "The set has been deleted";

    case types.REMOVE_SET:
      return "The set has been removed";

    case types.CREATE_SET_ERROR:
    case types.SUBMIT_EDITED_SET_ERROR:
      return "Failed saving the set";

    case types.DELETE_CREATE_SET:
      return "changes have been deleted";

    case types.DELETE_CREATE_SET_ERROR:
    case types.DELETE_EDIT_SET_ERROR:
      return "Couldn't delete the set. Please try again";

    case types.REMOVE_SET_ERROR:
      return "Couldn't remove the set. Please try again";

    case types.CREATE_BASIC_SET_ERROR:
      return "Couldn't create a set. Please try again";

    case types.DELETE_TERM_ERROR:
    case types.UPDATE_TERM_ERROR:
    case types.ADD_TERM_ERROR:
      return "Something went wrong. Please try again";

    case types.GAME_COMPLETED:
      return "Congrats! You know every term!";

    default:
      return state;
  }
};
