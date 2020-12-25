const initState = {
  answer: "",
  item: {},
  isAnimated: false
};

export const gameAnswerReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_ANSWER":
      return {
        ...state,
        item: action.item,
        answer: action.answer
      };
      
    case "CLEAR_ANSWER":
    case "CLEAN_WRITE":
      return {
        ...state,
        answer: "",
        item: {}
      };

    case "ANIMATION_END":
      return {
        ...state,
        isAnimated: action.payload
      };

    default:
      return state;
  }
};
