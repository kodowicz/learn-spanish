const initState = ""

export const gameAnswer = (state = initState, action) => {
  switch (action.type) {
    case 'CHOOSE_OPTION':
      return action.payload;

    case 'CLEAR_ANSWER':
      return action.payload

    default:
      return state;
  }
};
