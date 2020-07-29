const initState = {
  location: 'home',
  lastLocation: '',
  isOpen: false,
  setid: ''
};

export const navigationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return {
        ...state,
        isOpen: action.payload
      }

    case 'CHANGE_LOCATION':
      return {
        ...state,
        location: action.payload
      }

    case 'LAST_LOCATION':
      return {
        ...state,
        lastLocation: action.payload
      }

    case 'CURRENT_SET_ID':
      return {
        ...state,
        lastLocation: action.payload
      };

    default:
      return state;
  }
};
