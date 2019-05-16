export const locationReducer = (state = "", action) => {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return action.location;
    default:
      return state;
  }
};

export const lastLocationReducer = (state = "/", action) => {
  switch (action.type) {
    case 'LAST_LOCATION':
      return action.location;
    default:
      return state;
  }
};
