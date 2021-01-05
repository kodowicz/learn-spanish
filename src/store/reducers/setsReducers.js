const initialState = {
  isEditSubmited: false,
  isSetDeleted: false,
  isUnsavedDeleted: false,
  sortedBy: false,
  deletedSetKey: ""
}

export const setStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_CREATE_SET":
    case "DELETE_EDIT_SET":
      return {
        ...state,
        isSetDeleted: true
      };

    case "ENABLE_CREATE_SET":
      return {
        ...state,
        isUnsavedDeleted: false
      };

    case "ENABLE_EDIT_SET":
    return {
      ...state,
      isSetDeleted: false
    };

    case "SORT_TERMS":
      return {
        ...state,
        sortedBy: !state.sortedBy
      };

    default:
      return state;
  }
};

export const searchReducer = (state = "", action) => {
  switch (action.type) {
    case "SEARCH_SETS":
      return action.payload;

    default:
      return state;
  }
};
