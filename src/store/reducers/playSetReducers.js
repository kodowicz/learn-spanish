const initState = {
  answer: '',
  item: {}
}

export const gameAnswerReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SHOW_ANSWER':
      return {
        ...state,
        item: action.item,
        answer: action.answer
      };

    case 'CLEAR_ANSWER':
      return {
        ...state,
        answer: '',
        item: {}
      };

    default:
      return state;
  }
};
