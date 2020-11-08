const initState = {
  location: "home",
  lastLocation: "",
  setid: "",
  isOpen: false,
  isLogged: false,
  isScrollTop: true,
  isScrolledToTop: false,
  contentHeight: 0
};

export const navigationReducer = (state = initState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return {
        ...state,
        isOpen: action.payload
      };

    case "CHANGE_LOCATION":
      return {
        ...state,
        location: action.payload
      };

    case "LAST_LOCATION":
      return {
        ...state,
        lastLocation: action.payload
      };

    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLogged: true
      };

    case "CURRENT_SET_ID":
      return {
        ...state,
        setid: action.payload
      };

    case "SET_CONTENT_HEIGHT":
      return {
        ...state,
        contentHeight: action.payload
      };

    case "SET_PAGE_SCROLL":
      return {
        ...state,
        isScrollTop: action.payload
      };

    case "SCROLL_TO_TOP":
      return {
        ...state,
        isScrolledToTop: action.payload
      };

    default:
      return state;
  }
};
