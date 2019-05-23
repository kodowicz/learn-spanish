import authReducer from './authReducer';
import { unsavedSetReducer, setsReducer, shuffleReducer } from './setsReducer';
import { locationReducer, lastLocationReducer } from './locationReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
  auth: authReducer,
  isTermAdded: unsavedSetReducer,
  shuffled: shuffleReducer,
  location: locationReducer,
  lastLocation: lastLocationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
