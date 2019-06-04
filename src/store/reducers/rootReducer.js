import authReducer from './authReducer';
import { createdSetReducer, shuffleReducer, isSubmitedEditReducer } from './setsReducer';
import { locationReducer, lastLocationReducer } from './locationReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
  auth: authReducer,
  newSetKey: createdSetReducer,
  isEditSubmited: isSubmitedEditReducer,
  shuffled: shuffleReducer,
  location: locationReducer,
  lastLocation: lastLocationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
