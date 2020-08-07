const initState = ""

export const gameAnswerReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHOOSE_OPTION':
      return {
        ...state,
        answer: action.answer,
        item: action.item
      };

    case 'CLEAR_ANSWER':
      return {
        ...state,
        answer: '',
        item: {}
      }

    default:
      return state;
  }
};
