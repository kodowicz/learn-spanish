export const shuffleCardReducer = (state = [], action) => {
  switch (action.type) {
    case 'SHUFFLE_CARD':
      return state

    case 'THROWOUT_CARD':
      return state

    default:
      return state;
  }
}
