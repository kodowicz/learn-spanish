import { authReducer } from './authReducer';
import { createdSetReducer, setDeletedReducer } from './setsReducer';
import { locationReducer, lastLocationReducer, setIdReducer } from './locationReducer';
import { choiceMethodReducer, cancelSesionReducer, deleteSetReducer } from './overlayReducers';
import { setChangesReducer } from './editSetReducers';
import { shuffleCardReducer } from './learnSetReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const correctAnswer = (state = {}, action) => {
  switch (action.type) {
    case 'CHOOSE_BETWEEN_TWO_CORRECT':
    console.log(action);
      return { ...action };

    case 'CHOOSE_BETWEEN_TWO_WROMG':
      return { ...action };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  setid: setIdReducer,
  newSetKey: createdSetReducer,
  isEditSubmited: setChangesReducer,
  isSetDeleted: setDeletedReducer,
  terms: shuffleCardReducer,
  isChoiceOverlayOpen: choiceMethodReducer,
  isCancelOverlayOpen: cancelSesionReducer,
  isSetDeletedOverlayOpen: deleteSetReducer,
  location: locationReducer,
  lastLocation: lastLocationReducer,
  correctAnswer: correctAnswer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
