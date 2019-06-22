export const shuffleCardReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TERMS':
      return action.terms.map(term => {
        return Object.assign({}, term, {
          time: term.time.toDate().getTime()
        })
      });

    case 'SHUFFLE_CARD':
      return state.map(term => {
        if (term.time === action.time) {
          return Object.assign({}, term, {
            time: action.newTime
          })
        }
        return term
      })

    case 'THROWOUT_CARD':
      return state.filter(term => term.id !== action.id)

    default:
      return state;
  }
}
