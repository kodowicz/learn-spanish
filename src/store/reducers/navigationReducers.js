import * as types from "../../constants/actionTypes";

const initState = {
  location: "home",
  lastLocation: "",
  setid: "",
  newSetKey: null,
  isOpen: false,
  isLogged: false,
  isScrollTop: true,
  isScrolledToTop: false,
  contentHeight: 0
};

export const navigationReducer = (state = initState, action) => {
  switch (action.type) {
    case types.OPEN_MENU:
      return {
        ...state,
        isOpen: action.payload
      };

    case types.CHANGE_LOCATION:
      return {
        ...state,
        location: action.payload
      };

    case types.LAST_LOCATION:
      return {
        ...state,
        lastLocation: action.payload
      };

    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true
      };

    case types.CURRENT_SET_ID:
      return {
        ...state,
        setid: action.payload
      };

    case types.SET_CONTENT_HEIGHT:
      return {
        ...state,
        contentHeight: action.payload
      };

    case types.SET_PAGE_SCROLL:
      return {
        ...state,
        isScrollTop: action.payload
      };

    case types.SCROLL_TO_TOP:
      return {
        ...state,
        isScrolledToTop: action.payload
      };

    case types.CREATE_SET:
      return {
        ...state,
        newSetKey: action.newSetKey
      };

    case types.REMOVE_KEY:
      return {
        ...state,
        newSetKey: null
      };

    default:
      return state;
  }
};
