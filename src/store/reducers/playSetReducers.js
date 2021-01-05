import * as types from "../../constants/actionTypes";

const initState = {
  answer: "",
  item: {},
  isAnimated: false
};

export const gameAnswerReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SHOW_ANSWER:
      return {
        ...state,
        item: action.item,
        answer: action.answer
      };

    case types.CLEAR_ANSWER:
    case types.CLEAN_WRITE:
      return {
        ...state,
        answer: "",
        item: {}
      };

    case types.ANIMATION_END:
      return {
        ...state,
        isAnimated: action.payload
      };

    default:
      return state;
  }
};
