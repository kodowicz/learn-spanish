import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { setChangesReducer } from './editSetReducers';
import { shuffleCardReducer } from './learnSetReducer';
import { authReducer } from './authReducer';
import { overlayReducer } from './overlayReducers';
import {
  createdSetReducer,
  setDeletedReducer
} from './setsReducer';
import {
  locationReducer,
  lastLocationReducer,
  setIdReducer
} from './locationReducer';


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
  isOverlayOpen: overlayReducer,
  location: locationReducer,
  lastLocation: lastLocationReducer,
  correctAnswer: correctAnswer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
