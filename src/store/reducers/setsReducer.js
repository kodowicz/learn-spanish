export const unsavedSetReducer = (state = true, action) => {
  switch (action.type) {
    case 'CREATE_UNSAVED_SET':
      return false;

    case 'REFRESHED_SET':
      return true;

    case 'CREATE_UNSAVED_SET_ERROR':
      return action.error;
    default:
      return state;
  }
}

export const shuffleReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHUFFLE_CARD':
      return action.move;
    case 'THROWOUT_CARD':
      return action.move;
    default:
      return state;
  }
};

// export default projectReducer;
