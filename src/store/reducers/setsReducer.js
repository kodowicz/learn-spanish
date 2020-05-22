// export const unsavedSetReducer = (state = true, action) => {
//   switch (action.type) {
//     case 'CREATE_UNSAVED_SET':
//       return false;
//
//     case 'REFRESHED_SET':
//       return true;
//
//     case 'CREATE_UNSAVED_SET_ERROR':
//       return action.error;
//     default:
//       return state;
//   }
// };
//
// export const newUnsavedTermReducer = (state = false, action) => {
//   switch (action.type) {
//     case 'ADD_UNSAVED_NEW_TERM':
//       return true;
//     case 'ADD_UNSAVED_NEW_TERM_ERROR':
//       return false;
//     default:
//       return state;
//   }
// };

export const createdSetReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_SET':
      return action.newSetKey;

    case 'REMOVE_KEY':
      return null;

    case 'CREATE_SET_ERROR':
      return action.error;
    default:
      return state;
  }
};

export const isSubmitedEditReducer = (state = null, action) => {
  switch (action.type) {
    case 'SUBMIT_EDIT_SET':
      return action.isSubmited;

    default:
      return state;
  }
};

export const updatedTermReducer = (state = '', action) => {
  switch (action.type) {
    case 'EDIT_SET':
      return action.message;
    case 'EDIT_SET_ERROR':
      return action.error;
    default:
      return state;
  }
};

// const initState = {
//   addedTerm: '',
//   updatedTerm: '',
//   removeTerm: ''
// }

export const addedTermReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADDED_NEW_TERM':
      return action.message;
    case 'ADDED_NEW_TERM_ERROR':
      return action.error;
    default:
      return state;
  }
};

export const removedTermReducer = (state = '', action) => {
  switch (action.type) {
    case 'DELETE_TERM':
    return action.message;
    case 'DELETE_TERM_ERROR':
      return action.error;
    default:
      return state;
  }
};

export const setDeletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'DELETE_CREATE_SET':
      return action.payload;

    case 'DELETE_EDIT_SET':
      return action.payload;

    case 'ENABLE_CREATE_SET':
      return action.payload;

    default:
      return state;
  }
};
