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

export const shuffleReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHUFFLE_CARD':
      return action.move;
    case 'THROWOUT_CARD':
      return action.move;
    default:
      return state;
  }
}
