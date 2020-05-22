const initState = {
  choice: false,
  cancel: false,
  delete: false
};

export const choiceMethodReducer = (state = initState.choice, action) => {
  switch (action.type) {
    case 'SWITCH_CHOICE_METHOD':
      return action.isOpen;

    default:
      return state;
  }
};


export const cancelSesionReducer = (state = initState.cancel, action) => {
  switch (action.type) {
    case 'CANCEL_SESION':
      return action.isCancelled;
    default:
      return state;
  }
};

export const deletingSetReducer = (state = initState.delete, action) => {
  switch (action.type) {
    case 'ASKING_TO_DELETE_SET':
      return action.payload;
    default:
      return state;
  }
};
