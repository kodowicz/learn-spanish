const initState = {
  isChosen: false,
  isCancelled: false,
  isDeleted: false,
  isPassword: false,
  isGameOver: false
};

export const overlayReducer = (state = initState, action) => {
  switch (action.type) {
    case "OPEN_PASSWORD":
      return {
        ...state,
        isPassword: action.payload
      };

    case "CLOSE_PASSWORD":
      return {
        ...state,
        isPassword: action.payload
      };

    case "CHANGE_PASSWORD":
      return {
        ...state,
        isPassword: false
      };

    case "SWITCH_CHOICE_METHOD":
      return {
        ...state,
        isChosen: action.payload
      };

    case "CANCEL_SESION":
      return {
        ...state,
        isCancelled: action.payload
      };

    case "ASKING_TO_DELETE_SET":
      return {
        ...state,
        isDeleted: action.payload
      };

    case "GAME_OVER":
      return {
        ...state,
        isGameOver: action.payload
      };

    default:
      return state;
  }
};
