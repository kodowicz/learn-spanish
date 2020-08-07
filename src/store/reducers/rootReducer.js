import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { setChangesReducer } from './editSetReducers';
import { shuffleCardReducer } from './learnSetReducer';
import { gameAnswerReducer } from './playSetReducers';
import { authReducer } from './authReducer';
import { overlayReducer } from './overlayReducers';
import { navigationReducer } from './navigationReducer';
import { searchReducer } from './searchReducer';
import {
  createdSetReducer,
  setDeletedReducer,
  sortedTermsReducer
} from './setsReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  newSetKey: createdSetReducer,
  isEditSubmited: setChangesReducer,
  isSetDeleted: setDeletedReducer,
  sortedBy: sortedTermsReducer,
  terms: shuffleCardReducer,
  isOverlayOpen: overlayReducer,
  navigation: navigationReducer,
  search: searchReducer,
  gameAnswer: gameAnswerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
