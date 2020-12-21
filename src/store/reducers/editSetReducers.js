const initialState = false;

export const setChangesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT_EDITED_SET':
      return action.payload;

    case 'SUBMIT_EDITED_SET_FINISHED':
      return action.setDeleted;

    case 'DELETE_SET_CHANGES':
      return action.payload;

    case 'ENABLE_CREATE_SET':
      return action.payload;

    case 'DELETE_UNSAVED_TERM':
      return action.payload;

    case 'DELETE_CREATED_SET':
      return action.payload;

    default:
      return state;
  }
};
