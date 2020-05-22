const initState = {
  authError: null,
  isChanged: false
};

export const passwordReducer = (state = initState, action) => {
  switch (action.type) {
    case 'OPEN_PASSWORD':
      return {
        ...state,
        isChanged: action.payload
      }

    case 'CLOSE_PASSWORD':
      return {
        ...state,
        isChanged: action.payload
      }

    case 'CHANGE_PASSWORD':
      return {
        ...state,
        isChanged: action.payload
      }

    default:
      return state
  }
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
        authError: 'logout'
      }

    case 'LOGOUT_ERROR':
      return {
        ...state,
        authError: 'Logout failed'
      }

    case 'CHANGE_PASSWORD_ERROR':
      return {
        ...state,
        authError: 'The password is invalid'
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
