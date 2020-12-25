const initState = "";

export const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH_SETS":
      return action.payload;

    default:
      return state;
  }
};
