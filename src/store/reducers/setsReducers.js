import * as types from "../../constants/actionTypes";

const initialState = {
  isEditSubmited: false,
  isSetDeleted: false,
  isUnsavedDeleted: false,
  sortedBy: false,
  deletedSetKey: ""
}

export const setStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_CREATE_SET:
    case types.DELETE_EDIT_SET:
      return {
        ...state,
        isSetDeleted: true
      };

    case types.ENABLE_CREATE_SET:
      return {
        ...state,
        isUnsavedDeleted: false
      };

    case types.ENABLE_EDIT_SET:
    return {
      ...state,
      isSetDeleted: false
    };

    case types.SORT_TERMS:
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
    case types.SEARCH_SETS:
      return action.payload;

    default:
      return state;
  }
};
