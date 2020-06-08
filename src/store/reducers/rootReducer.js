import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { setChangesReducer } from './editSetReducers';
import { shuffleCardReducer } from './learnSetReducer';
import { authReducer } from './authReducer';
import { overlayReducer } from './overlayReducers';
import {
  createdSetReducer,
  setDeletedReducer,
  sortedTermsReducer
} from './setsReducer';
import {
  locationReducer,
  lastLocationReducer,
  setIdReducer
} from './locationReducer';

import { gameAnswer } from './playSetReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  setid: setIdReducer,
  newSetKey: createdSetReducer,
  isEditSubmited: setChangesReducer,
  isSetDeleted: setDeletedReducer,
  sortedBy: sortedTermsReducer,
  terms: shuffleCardReducer,
  isOverlayOpen: overlayReducer,
  location: locationReducer,
  lastLocation: lastLocationReducer,
  gameAnswer: gameAnswer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
