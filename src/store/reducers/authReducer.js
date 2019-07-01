const initState = {
  authError: null
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.error.message
      }

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.error.message
      }

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        authError: null
      }

    case 'LOGOUT_ERROR':
      return {
        ...state,
        authError: 'Logout failed'
      }

    case 'CLEAN_UP':
      return {
        ...state,
        authError: null
      }

    case 'INVALID_DATA':
      return {
        ...state,
        authError: action.message
      }

    default:
      return state;
  }
};
