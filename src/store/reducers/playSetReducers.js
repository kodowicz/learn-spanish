import * as types from "../../constants/actionTypes";

const initState = {
  answer: "",
  item: {},
  isAnimated: false,
  isSkipped: false,
  isSpeaking: true
};

export const gameAnswerReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SHOW_ANSWER:
      return {
        ...state,
        item: action.item,
        answer: action.answer,
        isSkipped: action.isSkipped
      };

    case types.CLEAR_ANSWER:
      return {
        ...state,
        answer: "",
        item: {}
      };

    case types.SKIP_ANSWER:
    return {
      ...state,
      answer: "",
      isSkipped: false,
      item: {}
    };

    case types.ANIMATION_END:
      return {
        ...state,
        isAnimated: action.payload
      };

    case types.SPEECH_STATUS:
      return {
        ...state,
        isSpeaking: action.payload
      };

    default:
      return state;
  }
};
