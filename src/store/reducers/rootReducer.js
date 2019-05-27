import authReducer from './authReducer';
import { unsavedSetReducer, createdSetReducer, setsReducer, shuffleReducer } from './setsReducer';
import { locationReducer, lastLocationReducer } from './locationReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
  auth: authReducer,
  isTermAdded: unsavedSetReducer,
  createdSet: createdSetReducer,
  shuffled: shuffleReducer,
  location: locationReducer,
  lastLocation: lastLocationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
