import * as types from "../../constants/actionTypes";

const initState = {
  isChosen: false,
  isCancelled: false,
  isDeleted: false,
  isPassword: false,
  isGameOver: false
};

export const overlayReducer = (state = initState, action) => {
  switch (action.type) {
    case types.OPEN_PASSWORD:
      return {
        ...state,
        isPassword: action.payload
      };

    case types.CLOSE_PASSWORD:
      return {
        ...state,
        isPassword: action.payload
      };

    case types.CHANGE_PASSWORD:
      return {
        ...state,
        isPassword: false
      };

    case types.SWITCH_CHOICE_METHOD:
      return {
        ...state,
        isChosen: action.payload
      };

    case types.CANCEL_SESION:
      return {
        ...state,
        isCancelled: action.payload
      };

    case types.ASKING_TO_DELETE_SET:
      return {
        ...state,
        isDeleted: action.payload
      };

    case types.GAME_OVER:
      return {
        ...state,
        isGameOver: action.payload
      };

    default:
      return state;
  }
};
