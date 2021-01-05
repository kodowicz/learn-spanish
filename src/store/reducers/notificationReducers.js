const initState = "";

export const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
    case "SIGNUP_ERROR":
    case "LOGOUT_ERROR":
    case "CREATE_LEARN_SET_ERROR":
    case "CREATE_PLAY_SET_ERROR":

      return action.error.message;

    case "INVALID_DATA":
      return action.message;

    case "CLEAN_NOTIFICATION":
      return "";

    case "LOGOUT_SUCCESS":
      return "logout";

    case "CHANGE_PASSWORD":
      return "The password has been changed";

    case "CHANGE_PASSWORD_ERROR":
      return "The password is invalid";

    case "CREATE_EDIT_SET_ERROR":
      return "Failed loading the set. Please try again";

    case "DELETE_EDIT_CHANGES":
      return "Deleted changes";

    case "DELETE_EDIT_SET":
      return "The set has been deleted";

    case "CREATE_SET_ERROR":
    case "SUBMIT_EDITED_SET_ERROR":
      return "Failed saving the set";

    case "DELETE_CREATE_SET":
      return "changes have been deleted";

    case "DELETE_CREATE_SET_ERROR":
    case "DELETE_EDIT_SET_ERROR":
      return "Couldn't delete the set. Please try again";

    case "CREATE_BASIC_SET_ERROR":
      return "Couldn't create a set. Please try again";

    case "DELETE_TERM_ERROR":
    case "UPDATE_TERM_ERROR":
    case "ADD_TERM_ERROR":
      return "Something went wrong. Please try again";

    case "GAME_COMPLETED":
      return "Congrats! You know every term!";

    default:
      return state;
  }
};
