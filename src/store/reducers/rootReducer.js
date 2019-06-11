import { authReducer } from './authReducer';
import { createdSetReducer, isSubmitedEditReducer } from './setsReducer';
import { locationReducer, lastLocationReducer, setIdReducer } from './locationReducer';
import { shuffleReducer } from './learnSetReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
  auth: authReducer,
  setId: setIdReducer,
  newSetKey: createdSetReducer,
  isEditSubmited: isSubmitedEditReducer,
  shuffled: shuffleReducer,
  location: locationReducer,
  lastLocation: lastLocationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
