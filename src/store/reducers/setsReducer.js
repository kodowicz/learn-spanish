export const createdSetReducer = (state = null, action) => {
  switch (action.type) {
    case "CREATE_SET":
      return action.newSetKey;

    case "REMOVE_KEY":
      return null;

    case "CREATE_SET_ERROR":
      return action.error;
    default:
      return state;
  }
};

export const setDeletedReducer = (state = false, action) => {
  switch (action.type) {
    case "DELETE_CREATE_SET":
      return action.payload;

    case "DELETE_EDIT_SET":
      return action.payload;

    case "ENABLE_CREATE_SET":
      return action.payload;

    default:
      return state;
  }
};

export const sortedTermsReducer = (state = false, action) => {
  switch (action.type) {
    case "SORT_TERMS":
      return !state;

    default:
      return state;
  }
};
